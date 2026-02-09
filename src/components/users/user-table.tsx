"use client";

import { ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";

interface UserTableProps {
  users: User[];
  className?: string;
  onDelete?: (user: User) => void;
}

export function UserTable({ users, onDelete, className }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter users based on search term (name and email)
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const lowercaseSearch = searchTerm.toLowerCase();
    return users.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(lowercaseSearch) || false;
      const emailMatch = user.email?.toLowerCase().includes(lowercaseSearch) || false;
      return nameMatch || emailMatch;
    });
  }, [users, searchTerm]);

  // Calculate pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent>
        {/* Search and Controls */}
        <div className="flex items-center justify-between space-x-4 py-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="ps-9"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">Show:</span>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-12 px-4">Name</TableHead>
                <TableHead className="h-12 px-4">Email</TableHead>
                <TableHead className="h-12 px-4 text-center">Verified</TableHead>
                <TableHead className="h-12 px-4 text-center">Subscribed At</TableHead>
                <TableHead className="h-12 px-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                    {searchTerm ? "No users found matching your search." : "No users available."}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="p-4 font-medium">
                      {user.name || "No name provided"}
                    </TableCell>

                    <TableCell className="p-4">{user.email || "No email provided"}</TableCell>

                    <TableCell className="p-4 text-center">
                      <Badge variant={user.emailVerified ? "default" : "secondary"}>
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </TableCell>

                    <TableCell className="p-4 text-center">
                      {user.subscribedAt ? (
                        <span>{formatDisplayDate(user.subscribedAt)}</span>
                      ) : (
                        <Badge variant="outline">Not Subscribed</Badge>
                      )}
                    </TableCell>

                    <TableCell className="p-4 text-center">
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="outline"
                          title="Delete User"
                          onClick={() => onDelete(user)}
                        >
                          <Trash2 className="text-destructive size-4" />
                          <span className="sr-only">Delete user</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalUsers > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, totalUsers)} of {totalUsers} results
            </div>

            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="size-4" />
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber: number;

                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage > totalPages - 3) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      size="icon"
                      className="size-8 p-0"
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
