import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadFileToStorage } from "@/actions/file-actions";
import { updateUserProfile } from "@/actions/setting-actions";
import { generalSettingsSchema, GeneralSettingsSchema } from "@/lib/zod-schemas";
import { User } from "@/types/user";

export function useGeneralSettingForm({ user }: { user: User }) {
  const { update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.image || null);

  const form = useForm<GeneralSettingsSchema>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = form;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Show local preview image immediately
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);

      // Replace the old image with the new one
      const result = await uploadFileToStorage(file);

      if (result.status === "success") {
        setValue("image", result.url);
      } else {
        toast.error(result.message || "Error while uploading avatar");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateUserProfile(data);

    if (result.status === "success") {
      update();
      toast.success("Profile updated successfully");
    } else if (result.errors && result.errors.fieldErrors) {
      // Set field errors in the form if they exist
      Object.entries(result.errors.fieldErrors).forEach(([field, errors]) => {
        if (errors && errors.length > 0) {
          form.setError(field as keyof GeneralSettingsSchema, {
            type: "server",
            message: errors[0]
          });
        }
      });
      toast.error("Please correct the errors in the form");
    } else {
      toast.error("Error while updating profile");
    }
  });

  return {
    form,
    isUploading,
    avatarPreview,
    isSubmitting,
    handleFileChange,
    onSubmit
  };
}
