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

        // ✅ Attach role and plan capabilities to session
        session.user.role = token.role as string;
        session.user.plan = token.plan as any;
      }

      return session;
    },

    async jwt({ token, user, trigger }) {
      // On initial login
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: { plan: true }
        });

        if (dbUser) {
          token.sub = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;

          // ✅ Persist role + plan into JWT
          token.role = dbUser.role;
          token.plan = dbUser.plan;
        }

        return token;
      }

      // On manual session update
      if (trigger === "update" && token?.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { plan: true }
        });

        if (dbUser) {
          token.name = dbUser.name;
          token.image = dbUser.image;
          token.role = dbUser.role;
          token.plan = dbUser.plan;
        }
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

// ==============================
// 🔐 NextAuth Type Augmentation
// ==============================

import type { DefaultSession } from "next-auth";
import type { Plan, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      plan: Plan | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    plan?: Plan | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    plan?: Plan | null;
  }
}
