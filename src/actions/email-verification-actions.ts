"use server";

import crypto from "crypto";

import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma";
import { renderEmail } from "@/lib/react-email";
import { sendEmail } from "@/lib/resend";

import { EmailVerification } from "@/components/mails/email-verification";

const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

/**
 * Generates a secure email verification token and stores it in DB
 */
export async function generateVerificationToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");

  const expires = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  );

  // Ensure only one active token per email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email }
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires
    }
  });

  return token;
}

/**
 * Sends verification email if user exists and is not verified
 */
export async function sendVerificationEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        emailVerified: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: "USER_NOT_FOUND"
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        error: "EMAIL_ALREADY_VERIFIED"
      };
    }

    const token = await generateVerificationToken(email);

    const verificationUrl = `${appConfig.domainUrl}/verify-email?token=${token}`;

    const html = await renderEmail(EmailVerification, {
      verificationUrl,
      name: user.name ?? "there"
    });

    const result = await sendEmail({
      to: email,
      html,
      subject: `🔐 Verify your email – ${appConfig.appName}`,
      replyTo: appConfig.contactEmail
    });

    if (!result.success) {
      console.error("[EMAIL_VERIFICATION_SEND_FAILED]", result.error);
      return {
        success: false,
        error: "EMAIL_SEND_FAILED"
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[SEND_VERIFICATION_EMAIL_ERROR]", error);
    return {
      success: false,
      error: "INTERNAL_ERROR"
    };
  }
}