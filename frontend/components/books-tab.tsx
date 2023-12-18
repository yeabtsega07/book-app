"use client";

import { useEffect, useState } from "react";

import { Book } from "@/app/types/book";
import { BooksList } from "./books-list";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { BookText, CheckCircle, ListStart } from "lucide-react";


interface StatusTabProps {
  books: Book[];
}

export const StatusTab = ({ books }: StatusTabProps) => {
  const completedBooks = books.filter((book) => book.status === "completed");
  const toReadBooks = books.filter((book) => book.status === "to-read");
  const inProgressBooks = books.filter((book) => book.status === "in-progress");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center  px-6 pb-6 ">
      <Tabs defaultValue="to-read" className="w-[1000px] h-fit ">
        <TabsList className="grid w-full grid-cols-3 h-13">
          <TabsTrigger className="text-lg" value="to-read">
            To Read
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="in-progress">
            In-Progress
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="completed">
            Completed
          </TabsTrigger>
        </TabsList>
        <div className=" ">
          <TabsContent value="to-read">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className=" w-full flex justify-between items-center">
                    <BookText />
                  </div>
                </CardTitle>
                <CardDescription>
                  Add books you want to read here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading && (
                  <div className=" w-full flex flex-col justify-center items-start">
                    {Array.from({ length: 6 }, (_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-14 my-1 bg-slate-200 dark:bg-slate-600"
                      />
                    ))}
                  </div>
                )}
                {toReadBooks.length === 0 && !loading && (
                  <div className=" h-[200px] my-8 flex justify-center items-start">
                    You don&apos;t have any books to read yet
                  </div>
                )}
                {<BooksList items={toReadBooks} />}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="in-progress">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className=" w-full flex justify-between items-center">
                    <ListStart />
                  </div>
                </CardTitle>
                <CardDescription>
                  Currently reading books go here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading && (
                  <div className=" w-full flex flex-col justify-center items-start">
                    {Array.from({ length: 6 }, (_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-14 my-1 bg-slate-200 dark:bg-slate-600"
                      />
                    ))}
                  </div>
                )}
                {inProgressBooks.length === 0 && !loading && (
                  <div className=" h-[200px] my-8 flex justify-center items-start">
                    Your not currently reading books yet
                  </div>
                )}
                {<BooksList items={inProgressBooks} />}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className=" w-full flex justify-between items-center">
                    <CheckCircle />
                  </div>
                </CardTitle>
                <CardDescription>
                  Books you have finished reading go here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading && (
                  <div className=" w-full flex flex-col justify-center items-start">
                    {Array.from({ length: 6 }, (_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-14 my-1 bg-slate-200 dark:bg-slate-600"
                      />
                    ))}
                  </div>
                )}
                {completedBooks.length === 0 && !loading && (
                  <div className=" h-[200px] my-8 flex justify-center items-start">
                    You have&apos;nt completed any books yet
                  </div>
                )}
                {<BooksList items={completedBooks} />}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
