import { create } from "zustand";

const initState = {
  books: [],
  ApiStatus: null,
  error: null,
};

const useRandomBooksStore = create((set) => ({
  ...initState,
  updateBooksList: (book) =>
    set((state) => ({ books: [...state.books, book] })),
  setApiStatus: (status) => set({ ApiStatus: status }),
  setError: (error) => set({ error: error }),
  resetBookList: () => set({ ...initState }),
  clearBooksList: () => set({ books: [] }),
  deleteBookFromList: (bookId) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== bookId),
    })),
}));

export default useRandomBooksStore;
