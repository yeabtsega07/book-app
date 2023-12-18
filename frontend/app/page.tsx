"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./zustand/book-store";

import { StatusTab } from "@/components/books-tab";
import { useToast } from "@/lib/use-toast";
import { ModeToggle } from "@/components/theme-toggle";
import { AddBookModal } from "@/components/modal/add-book-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const bookStore = useStore();

  const getBooks = async () => {
    const url = "http://127.0.0.1:8000/books";

    const response = await axios.get(url);
    const data = response.data;
    return JSON.stringify(data);
  };

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then((data) => {
        const books = JSON.parse(data);
        bookStore.setBooks(books);
      })
      .catch((err) => {
        toast({
          title: "Error getting books",
          variant: "destructive",
        });
      });
    setLoading(false);
  }, []);

  return (
    <div>
      <div className=" w-full dark:border-slate-300 border-indigo-100 border-b-slate-800 mb-6 flex items-center justify-center px-10 p-10">
        <div className="w-full flex justify-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 pl-6 ml-40">
            Book Tracking App
          </h1>
        </div>
        <AddBookModal>
          <Button className="mr-6">Add book</Button>
        </AddBookModal>
        <ModeToggle />
      </div>
      <div className=" h-screen">

      <StatusTab books={bookStore.books} />
      </div>
    </div>
  );
}
