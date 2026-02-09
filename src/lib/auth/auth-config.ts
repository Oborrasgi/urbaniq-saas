import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "@/lib//zod-schemas";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const authConfig = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate credentials using zod schema
          const result = loginSchema.safeParse(credentials);

          // If validation fails
          if (!result.success) {
            throw new Error("Invalid email or password");
          }

          // Find user by email in the database
          const user = await prisma.user.findUnique({
            where: { email: result.data.email }
          });

          // If user not found or no password set
          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          // Compare password hashes using bcrypt
          const isValid = await verifyPassword(result.data.password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }

          // Return user object (omit password)
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Invalid email or password";
          throw new InvalidLoginError(message);
        }
      }
    })
  ]
} satisfies NextAuthConfig;
