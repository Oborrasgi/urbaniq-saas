import { appConfig } from "@/config";
import { browserConsoleError, isValidEmail } from "@/lib/utils";
import { MailerOptions, MailerResult } from "@/types/mailer";

import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

/** ============================================
 * Validate Mailgun API key
 * ============================================
 */
if (!appConfig.mailgun.apiKey) {
  browserConsoleError("MAILGUN_API_KEY is required to send emails via Mailgun.");
}

/** ============================================
 * Initialize Mailgun with API key
 * ============================================
 */
const mg = mailgun.client({
  username: "api",
  key: appConfig.mailgun.apiKey
});

export async function sendEmail({
  to,
  html,
  subject,
  replyTo,
  from = appConfig.resend.fromNoReply
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
      ...(replyTo && { "h:reply-to": replyTo })
    };

    const data = await mg.messages.create(appConfig.mailgun.domain, emailPayload);

    console.log(`✅ Email sent successfully to ${Array.isArray(to) ? to.join(", ") : to}`, {
      id: data?.id,
      subject: subject,
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
