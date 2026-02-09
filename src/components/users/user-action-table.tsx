"use client";

import { Fragment, useCallback, useState, useTransition } from "react";
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
import { UserTable } from "@/components/users/user-table";
import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
}

export function UserActionTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = useCallback((user: User) => {
    setUserToDelete(user);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!userToDelete) return;

    startTransition(async () => {
      try {
        // TODO: Implement delete user
        // const result = await deleteUser(userToDelete.id);

        // TODO: Remove this
        const result = { success: true, error: null };

        if (result.success) {
          setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
          toast.success("User deleted successfully");
        } else {
          toast.error(result.error || "Failed to delete user");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the user");
      } finally {
        setUserToDelete(null);
      }
    });
  }, [userToDelete]);

  return (
    <Fragment>
      <UserTable users={users} onDelete={handleDeleteClick} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete {userToDelete?.name || userToDelete?.email}? This
              action cannot be undone and will permanently remove the user and all their data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
