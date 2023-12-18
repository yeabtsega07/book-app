import create from "zustand";
import { Book } from "../types/book";

type Store = {
  books: Book[];
  addBook: (book: Book) => void;
  setBooks: (books: Book[]) => void;
  moveBook: (bookId: number, status: Book["status"]) => void;
  deleteBook: (bookId: number) => void;
};

const useStore = create<Store>((set) => ({
  books: [],
  setBooks: (books: Book[]) => set(() => ({ books })),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  moveBook: (bookId, status) =>
    set((state) => {
      const bookIndex = state.books.findIndex((book) => book.id === bookId);
      if (bookIndex > -1) {
        state.books[bookIndex].status = status;
      }
      return { books: [...state.books] };
    }),
  deleteBook: (bookId) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== bookId),
    })),
}));

export default useStore;
