"use client";
import axios from "axios";

import useStore from "@/app/zustand/book-store";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/lib/use-toast";
import { ArrowLeftRight } from "lucide-react";


interface StatusToggleProps {
  book_id: number;
  status: string;
}

export const StatusToggle = ({ status, book_id }: StatusToggleProps) => {
  const bookStore = useStore();

  const handleStatusChange = (
    new_status: "completed" | "to-read" | "in-progress"
  ) => {
    try {
      const url = "http://127.0.0.1:8000/books";
      const response = axios.put(`${url}/${book_id}/${new_status}`);
      bookStore.moveBook(book_id, new_status);

      toast({
        title: "Status updated",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error updating status",
        variant: "destructive",
      });
    }
  };

  const statusOptions = ["completed", "to-read", "in-progress"].filter(
    (bookStatus) => bookStatus !== status
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowLeftRight className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((item: string) => (
          <DropdownMenuItem key={item}>
            <span
              className="cursor-pointer"
              onClick={() =>
                handleStatusChange(
                  item as "completed" | "to-read" | "in-progress"
                )
              }
            >
              {item}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
