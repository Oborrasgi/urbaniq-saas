"use server";

import { ContactSubmission } from "@/components/mails/contact-submission";
import { appConfig } from "@/config";
import { renderEmail } from "@/lib/react-email";
import { sendEmail } from "@/lib/resend";
import { ContactSchema, contactSchema } from "@/lib/zod-schemas";

export async function sendContactEmailAction(data: ContactSchema) {
  // 1️⃣ Validación segura
  const validationResult = contactSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid contact data. Please check the form."
    };
  }

  const { firstName, lastName, email, subject, message } = validationResult.data;

  // 2️⃣ Configuración obligatoria
  if (!appConfig.contactEmail) {
    throw new Error("CONTACT_EMAIL_NOT_CONFIGURED");
  }

  try {
    // 3️⃣ Render del email
    const html = await renderEmail(ContactSubmission, {
      firstName,
      lastName,
      email,
      subject,
      message
    });

    // 4️⃣ Envío
    const result = await sendEmail({
      html,
      to: appConfig.contactEmail,
      subject: `📩 UrbanIQ – Nueva solicitud: ${subject}`,
      replyTo: email
    });

    if (!result.success) {
      throw new Error("EMAIL_SEND_FAILED");
    }

    // 🔜 FUTURO (sin romper nada)
    // await prisma.contactLead.create({ ... })

    return {
      success: true,
      message: "Message sent successfully. Our team will contact you shortly."
    };
  } catch (error) {
    console.error("[CONTACT_FORM_ERROR]", error);

    return {
      success: false,
      message: "We could not send your message. Please try again later."
    };
  }
}