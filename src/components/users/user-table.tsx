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
import { Lead } from "@prisma/client";

interface LeadTableProps {
  leads: Lead[];
  className?: string;
  onDelete?: (lead: Lead) => void;
}

export function LeadTable({ leads, onDelete, className }: LeadTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter leads based on search term (name, email, city)
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return leads;

    const lowercaseSearch = searchTerm.toLowerCase();
    return leads.filter((lead) => {
      const nameMatch = lead.name?.toLowerCase().includes(lowercaseSearch) || false;
      const emailMatch = lead.email?.toLowerCase().includes(lowercaseSearch) || false;
      const cityMatch = lead.city?.toLowerCase().includes(lowercaseSearch) || false;
      return nameMatch || emailMatch || cityMatch;
    });
  }, [leads, searchTerm]);

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
                <TableHead className="h-12 px-4">Owner</TableHead>
                <TableHead className="h-12 px-4">Email</TableHead>
                <TableHead className="h-12 px-4">City</TableHead>
                <TableHead className="h-12 px-4 text-center">Score</TableHead>
                <TableHead className="h-12 px-4 text-center">Status</TableHead>
                <TableHead className="h-12 px-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                    {searchTerm ? "No leads found matching your search." : "No leads available."}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="p-4 font-medium">
                      {lead.name}
                    </TableCell>

                    <TableCell className="p-4">
                      {lead.email}
                    </TableCell>

                    <TableCell className="p-4">
                      {lead.city}
                    </TableCell>

                    <TableCell className="p-4 text-center">
                      <Badge variant="outline">{lead.score}</Badge>
                    </TableCell>

                    <TableCell className="p-4 text-center">
                      <Badge variant={lead.status === "QUALIFIED" ? "default" : "secondary"}>
                        {lead.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="p-4 text-center">
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="outline"
                          title="Delete Lead"
                          onClick={() => onDelete(lead)}
                        >
                          <Trash2 className="text-destructive size-4" />
                          <span className="sr-only">Delete lead</span>
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
