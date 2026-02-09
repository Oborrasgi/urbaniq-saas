import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import { changeUserPassword } from "@/actions/setting-actions";
import { ChangePasswordSchema, changePasswordSchema } from "@/lib/zod-schemas";

export function useChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
      newPassword: ""
    }
  });

  const {
    // setError,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (data: ChangePasswordSchema) => {
    /**
     * TODO: Implement the password change logic
     * Uncomment the code below when the password change logic is implemented
     * Import the changeUserPassword function from the setting-actions.ts file
     * and use it to change the password
     */

    // try {
    //   const result = await changeUserPassword(data);

    //   if (result.status === "success") {
    //     toast.success(result.message || "Password updated successfully");
    //     reset();
    //   } else if (result.status === "error") {
    //     if (result.errors) {
    //       // Handle field-specific errors
    //       Object.entries(result.errors.fieldErrors).forEach(([field, messages]) => {
    //         setError(field as keyof ChangePasswordSchema, {
    //           message: messages?.[0]
    //         });
    //       });
    //     } else if (result.message) {
    //       toast.error(result.message);
    //     }
    //   }
    // } catch (error) {
    //   toast.error("An unexpected error occurred");
    // }

    /**
     * TODO: Remove the toast error when the password change logic is implemented
     */
    toast.error("Don't allow to change password", {
      description: "This is a demo website, so you can't change the password"
    });

    reset();
  });

  const handleShowCurrentPassword = useCallback(() => {
    setShowCurrentPassword((prev) => !prev);
  }, []);

  const handleShowNewPassword = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return {
    form,
    isSubmitting,
    onSubmit,
    showNewPassword,
    showConfirmPassword,
    showCurrentPassword,
    handleShowNewPassword,
    handleShowCurrentPassword,
    handleShowConfirmPassword
  };
}
