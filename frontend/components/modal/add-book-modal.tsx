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


interface AddBookModalProps {
  children: React.ReactNode;
}

const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title should be at least 3 characters long",
    }),
  });


export const AddBookModal = ({ children }: AddBookModalProps) => {
    const addBookToStore = useStore(state => state.addBook);

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });





  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("trying to submit");
    const url = "http://127.0.0.1:8000/books";
    try {
        const book = { title: data.title };
        const response = await axios.post(url, book);
        
      addBookToStore(response.data);
      console.log(response.data);
      toast({
        title: "Success!",
        description: "Book added successfully"
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
            <h1 className="text-2xl">Add a book</h1>
            <p className=" text-sm text-stone-600">
              what would you like to read today?
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
                          placeholder="e.g. 'Introduction to Data Structures and Algorithms'"
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
