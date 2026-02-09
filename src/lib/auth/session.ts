import "server-only";

import { cache } from "react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** ==============================================================================================
 * Get the current user from the database
 * @returns {Promise<User | null>} The current user or null if not found
 *  ==============================================================================================
 */

export const getCurrentUser = cache(async () => {
  try {
    const session = await auth();

    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        omit: { password: true, updatedAt: true }
      });

      if (user) return user;
    }

    return null;
  } catch {
    return null;
  }
});
