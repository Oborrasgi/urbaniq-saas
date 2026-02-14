"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

import { deletePlanAction } from "@/actions/plan-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export function PlanDeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDeleteConfirm = () => {
    startTransition(async () => {
      try {
        if (!slug) {
          throw new Error("An error occurred while deleting the plan");
        }

        await deletePlanAction(slug);
        toast.success("Plan deleted successfully");
        router.refresh();
      } catch (error) {
        console.error("Error deleting plan:", error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred while deleting the plan"
        );
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        title="Delete Plan"
        onClick={handleOpenDialog}
      >
        <Trash2 className="text-destructive size-4" />
        <span className="sr-only">Delete</span>
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete UrbanIQ Plan</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this UrbanIQ plan? This action cannot be undone and will permanently remove the plan and all associated configuration.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} disabled={isPending}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete Plan Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
