"use client";

import { Teacher } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, Trash2, X } from "lucide-react";

import { invalidPath } from "@/actions/invalidPath";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teacher Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "courseName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.courseName}</div>;
    },
  },
  {
    accessorKey: "verified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isVerified = row.getValue("verified") || false;

      return (
        <Badge className={cn("bg-red-500", isVerified && "bg-green-700")}>
          {isVerified ? "Approved" : "Not Approved"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let { id, verified } = row.original;
      const handleApprove = async () => {
        const res = await axios.post("/api/teacher/approve", { id });
        toast.success(res.data.message);
        invalidPath("/admin");
      };
      const handleReject = async () => {
        const res = await axios.post("/api/teacher/reject", { id });
        toast.success(res.data.message);
        invalidPath("/admin");
      };
      const handleDelete = async () => {
        const res = await axios.post("/api/teacher/delete", { id });
        toast.success(res.data.message);
        invalidPath("/admin");
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!verified && (
              <DropdownMenuItem>
                <Button onClick={handleApprove} variant="ghost">
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </DropdownMenuItem>
            )}
            {verified && (
              <DropdownMenuItem>
                <Button onClick={handleReject} variant="ghost">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Button
                onClick={handleDelete}
                variant="ghost"
                className="hover:text-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
