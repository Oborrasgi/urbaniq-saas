import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useDeleteAccountForm() {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    // try {
    //   setIsDeleting(true);
    //   // Implement actual account deletion logic here
    //   await new Promise((resolve) => setTimeout(resolve, 1500));
    //   toast.success("Account deleted successfully");

    //   // Once account is deleted, sign out and redirect to home page
    //   router.push("/api/auth/signout");
    // } catch (error) {
    //   console.error("Error deleting account:", error);
    //   toast.error("Failed to delete account. Please try again later.");
    // } finally {
    //   setIsDeleting(false);
    // }

    /**
     * TODO: Remove the toast error when the account deletion logic is implemented
     */
    toast.error("Don't allow to delete account", {
      description: "This is a demo website, so you can't delete the account"
    });
  }, []);

  return {
    isDeleting,
    showDialog,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteAccount
  };
}
