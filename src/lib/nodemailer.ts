import nodemailer from "nodemailer";

import { appConfig } from "@/config";
import { browserConsoleError, isValidEmail } from "@/lib/utils";
import { MailerOptions, MailerResult } from "@/types/mailer";

/** ============================================
 * SMTP configuration
 * ============================================
 */

const smtpConfig = {
  host: appConfig.smtp.host!,
  port: parseInt(appConfig.smtp.port!),
  secure: appConfig.smtp.secure,
  auth: {
    user: appConfig.smtp.auth.user!,
    pass: appConfig.smtp.auth.pass!
  }
};

/** ============================================
 * Validate SMTP configuration
 * ============================================
 */
if (!smtpConfig.host || !smtpConfig.port || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
  browserConsoleError(
    "EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD are required to send emails via SMTP."
  );
}

const transporter = nodemailer.createTransport(smtpConfig);

/** ==============================================================================================
 * Sends an email using SMTP
 *  ==============================================================================================
 */
export async function sendEmail({
  to,
  html,
  subject,
  replyTo,
  from = appConfig.smtp.from!
}: MailerOptions): Promise<MailerResult> {
  try {
    // Validate email format for single recipient
    if (typeof to === "string" && !isValidEmail(to)) {
      return {
        success: false,
        error: `Invalid email format: ${to}`
      };
    }

    // Validate email format for multiple recipients
    if (Array.isArray(to) && to.some((email) => !isValidEmail(email))) {
      return {
        success: false,
        error: `Invalid email format: ${to.join(", ")}`
      };
    }

    // Validate replyTo email if provided
    if (replyTo && !isValidEmail(replyTo)) {
      return {
        success: false,
        error: `Invalid reply-to email format: ${replyTo}`
      };
    }

    const emailPayload = {
      from,
      html,
      subject: subject.trim(),
      to: Array.isArray(to) ? to : [to],
      ...(replyTo && { replyTo })
    };

    const data = await transporter.sendMail(emailPayload);

    if (data.rejected.length > 0) {
      console.error("SMTP error:", data.response);
      return {
        success: false,
        error: data.response || "Failed to send email via SMTP"
      };
    }

    console.log(`✅ Email sent successfully to ${Array.isArray(to) ? to.join(", ") : to}`, {
      subject,
      id: data.messageId,
      timestamp: new Date().toISOString()
    });

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Unexpected error sending email:", error);

    return {
      success: false,
      error: errorMessage
    };
  }
}
