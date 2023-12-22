"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import useStore from '../../app/zustand/book-store';
import { useToast } from "@/lib/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Book } from "@/app/types/book";
import { title } from "process";


interface EditBookModalProps {
  children: React.ReactNode;
  currentBook: Book;
}

const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title should be at least 3 characters long",
    }),
  });


export const EditBookModal = ({ children, currentBook }: EditBookModalProps) => {
    const updateBookToStore = useStore();

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentBook.title,
    },
  });





  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    const url = `http://127.0.0.1:8000/books/${currentBook.id}?title=${data.title}`;
    try {

        const response = await axios.put(url);
        
      updateBookToStore.updateBook(currentBook.id, data.title);
      toast({
        title: "Success!",
        description: "Book updated successfully"
      });
    } catch (error) {
      toast({
        variant : "destructive",
        title: "Error!",
        description: "Something went wrong"
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="max-w-5xl  flex md:items-center md:justify-center h-full p-6">
          <div className="w-full">
            <h1 className="text-2xl">Edit a book</h1>
            <p className=" text-sm text-stone-600">
              To edit a book, please enter the new title below.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder={title}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                <div className=" flex items-center gap-x-2">
                <AlertDialogCancel >  
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction type="submit" disabled={!isValid || isSubmitting}>
                        Continue
                  </AlertDialogAction>
                </div>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
