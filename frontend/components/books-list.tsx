"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { toast } from "@/lib/use-toast";

import { Book } from "@/app/types/book";
import useStore from "@/app/zustand/book-store";
import { StatusToggle } from "./status-toggle";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface BooksListProps {
  items: Book[];
}

export const BooksList = ({ items }: BooksListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [books, setBooks] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  const bookStore = useStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setBooks(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(books);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBooks(items);
  };

  const onDelete = async (book_id: number) => {
    try {
      setIsLoading(true);
      const url = "http://127.0.0.1:8000/books";
      const response = await axios.delete(`${url}/${book_id}`);
      bookStore.deleteBook(book_id);

      toast({
        title: "Book deleted",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error deleting book",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="bookId">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {books.map((book, index) => (
              <Draggable
                key={book.id}
                draggableId={book.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm dark:bg-slate-600 dark:text-slate-200 h-14",
                      book.status === "in-progress" &&
                        "bg-sky-100 border-sky-200 text-sky-700 dark:text-sky-100 dark:bg-sky-700",
                      book.status === "completed" &&
                        " bg-lime-200 border-lime-200 text-slate-700 dark:text-sky-100 dark:bg-lime-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition dark:hover:bg-slate-900 h-full flex items-center",
                        book.status === "in-progress" &&
                          "border-r-sky-200 hover:bg-sky-200 dark:hover:bg-sky-900",
                        book.status === "completed" &&
                          "border-r-lime-200 hover:bg-lime-200 dark:hover:bg-lime-900"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="w-full flex p-30 text-lg ">
                      {book.title}
                    </div>
                    <div className="ml-auto pr-8 flex items-center gap-x-2">
                      <StatusToggle status={book.status} book_id={book.id} />
                      <Button
                        size="sm"
                        disabled={isLoading}
                        onClick={() => onDelete(book.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
