import { create } from "zustand";

const initState = {
  books: [],
  ApiStatus: null,
  error: null,
  searchTerm: "",
  selectedBook: {},
  bookCovers: {}, // Map of OLID for cover page URL
};

const useBooksStore = create((set) => ({
  ...initState,
  setSearchTerm: (newTerm) => set({ searchTerm: newTerm }),
  updateBooksList: (book) =>
    set((state) => ({ books: [...state.books, book] })),
  selectedBook: (book) => set({ selectedBook: book }),
  setApiStatus: (status) => set({ ApiStatus: status }),
  setError: (error) => set({ error: error }),
  setBookCover: (olid, coverUrl) =>
    set((state) => ({
      bookCovers: { ...state.bookCovers, [olid]: coverUrl },
    })),
  getBookCover: (olid) => {
    const state = useBooksStore.getState();
    return state.bookCovers[olid] || null;
  },
  resetBookList: () => set({ ...initState }),
  clearSelectedBook: () => set({ selectedBook: {} }),
  clearBooksList: () => set({ books: [] }),
  deleteBookFromList: (bookId) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== bookId),
    })),
}));

export default useBooksStore;
