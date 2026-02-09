import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ContactSchema, contactSchema } from "@/lib/zod-schemas";

// import { sendContactEmailAction } from "@/actions/contact-actions";

export function useContactForm() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      // TODO: Uncomment this if you want to send the email to the admin and set the CONTACT_EMAIL in the .env file
      // await sendContactEmailAction(values);

      toast.success("Message sent successfully!", {
        description: "Thank you for your message. We'll get back to you soon."
      });

      reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    }
  });

  return { onSubmit, isSubmitting, form };
}
