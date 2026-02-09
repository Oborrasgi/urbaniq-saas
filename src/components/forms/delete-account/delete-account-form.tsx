"use client";

import { AlertTriangle, Loader, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteAccountForm } from "./use-delete-account-form";

export function DeleteAccountForm() {
  const { isDeleting, showDialog, handleDeleteAccount, handleOpenDialog, handleCloseDialog } =
    useDeleteAccountForm();

  return (
    <>
      <Card className="max-w-3xl shadow-none">
        <CardHeader>
          <CardTitle>Remove Account</CardTitle>
          <CardDescription>
            Careful, these actions are permanent. All of your data will be permanently removed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-start gap-2 text-sm">
            <AlertTriangle className="text-destructive mt-0.5 size-4 flex-shrink-0" />
            <p className="text-muted-foreground">
              <strong>Important:</strong> Deleting your account will{" "}
              <span className="text-destructive font-semibold">
                permanently remove all your data
              </span>
              , but{" "}
              <span className="font-medium">
                will not automatically cancel your active subscription
              </span>
              . Please ensure you cancel your subscription in the{" "}
              <Button variant="link" className="text-primary h-auto p-0 text-sm">
                Billing section
              </Button>{" "}
              before deleting your account to avoid future charges.
            </p>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="text-base">
          <Button variant="destructive" onClick={handleOpenDialog} disabled={showDialog}>
            {showDialog ? (
              <>
                <Loader className="me-2 size-4 animate-spin" />
                Deleting Account...
              </>
            ) : (
              <>
                <Trash2 className="me-1 size-4" />
                Delete my account
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDialog} onOpenChange={handleOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive size-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? All of your data will be permanently
              removed. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={handleCloseDialog} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader className="me-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
