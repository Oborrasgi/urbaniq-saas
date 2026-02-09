import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth-config";

const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: appConfig.auth.secret,
  session: { strategy: "jwt" },
  jwt: { maxAge: appConfig.auth.maxAge },

  events: {
    async linkAccount({ account, profile }) {
      if (account?.provider === "google" && profile) {
        // check if user already exists with same email
        const user = await prisma.user.findUnique({
          where: { email: profile.email! },
          select: { id: true }
        });

        // if user exists, update the emailVerified field
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
          });
        }
      }
    }
  },

  callbacks: {
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.image as string;
      }

      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === "update" && token && token.sub) {
        const user = await prisma.user.findUnique({ where: { id: token.sub } });
        if (!user) return token;

        token.name = user.name;
        token.image = user.image;
      }

      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      return token;
    }
  },

  pages: {
    signIn: appConfig.auth.login,
    signOut: appConfig.auth.afterSignout,
    newUser: appConfig.auth.newUser
  },

  theme: {
    colorScheme: "auto",
    brandColor: appConfig.colors.primary,
    logo: `${appConfig.domainUrl}/logo.png`
  },

  ...authConfig
});

export const { handlers, signIn, signOut, auth } = nextAuth;
