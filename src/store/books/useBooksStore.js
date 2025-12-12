import { create } from "zustand";

const initState = {
  books: [],
  ApiStatus: null,
  error: null,
  searchTerm: "",
  selectedBook: {},
};

const useBooksStore = create((set) => ({
  ...initState,
  setSearchTerm: (newTerm) => set({ searchTerm: newTerm }),
  updateBooksList: (book) =>
    set((state) => ({ books: [...state.books, book] })),
  selectedBook: (book) => set({ selectedBook: book }),
  setApiStatus: (status) => set({ ApiStatus: status }),
  setError: (error) => set({ error: error }),
  resetBookList: () => set({ ...initState }),
  clearSelectedBook: () => set({ selectedBook: {} }),
  clearBooksList: () => set({ books: [] }),
  deleteBookFromList: (bookId) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== bookId),
    })),
}));

export default useBooksStore;
