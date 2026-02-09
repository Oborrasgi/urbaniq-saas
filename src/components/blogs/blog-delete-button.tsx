import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
// import { deleteBlogAction } from "@/actions/blog-actions";

export function BlogDeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpenDialog = useCallback((slug: string) => {
    setIsOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDeleteConfirm = () => {
    startTransition(async () => {
      try {
        if (!slug) {
          throw new Error("An error occurred while deleting the blog");
        }

        // TODO: Remove this
        throw new Error("Demo website, so you can't delete the blog");

        // TODO: Uncomment this if you want to delete the blog
        // await deleteBlogAction(slug);
        // toast.success("Blog deleted successfully");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred while deleting the blog"
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
        title="Delete Blog"
        onClick={() => handleOpenDialog(slug)}
      >
        <Trash2 className="text-destructive size-4" />
        <span className="sr-only">Delete</span>
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone and will
              permanently remove the blog and all its data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} disabled={isPending}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
