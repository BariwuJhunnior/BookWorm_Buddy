import { create } from "zustand";
import { persist } from "zustand/middleware";

const initState = {
  books: [],
  favoriteBooks: [],
  readingList: [],
  booksRead: [],
  ApiStatus: null,
  error: null,
  searchTerm: "",
  selectedBook: {},
  bookCovers: {},
};

const useBooksStore = create(
  persist(
    (set) => ({
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
      addToFavorites: (book) =>
        set((state) => {
          // Avoid duplicates by checking if book key already exists
          const exists = state.favoriteBooks.some(
            (fav) => fav.key === book.key
          );
          if (exists) return state;
          return { favoriteBooks: [...state.favoriteBooks, book] };
        }),
      removeFromFavorites: (bookKey) =>
        set((state) => ({
          favoriteBooks: state.favoriteBooks.filter(
            (book) => book.key !== bookKey
          ),
        })),
      isFavorite: (bookKey) => {
        const state = useBooksStore.getState();
        return state.favoriteBooks.some((book) => book.key === bookKey);
      },
      clearFavorites: () => set({ favoriteBooks: [] }),
      addToReadingList: (book) =>
        set((state) => {
          // Avoid duplicates by checking if book key already exists
          const exists = state.readingList.some(
            (item) => item.key === book.key
          );
          if (exists) return state;
          return { readingList: [...state.readingList, book] };
        }),
      removeFromReadingList: (bookKey) =>
        set((state) => ({
          readingList: state.readingList.filter((book) => book.key !== bookKey),
        })),
      isInReadingList: (bookKey) => {
        const state = useBooksStore.getState();
        return state.readingList.some((book) => book.key === bookKey);
      },
      clearReadingList: () => set({ readingList: [] }),
      addToBooksRead: (book) =>
        set((state) => {
          // Avoid duplicates by checking if book key already exists
          const exists = state.booksRead.some((item) => item.key === book.key);
          if (exists) return state;
          return { booksRead: [...state.booksRead, book] };
        }),
      removeFromBooksRead: (bookKey) =>
        set((state) => ({
          booksRead: state.booksRead.filter((book) => book.key !== bookKey),
        })),
      isBookRead: (bookKey) => {
        const state = useBooksStore.getState();
        return state.booksRead.some((book) => book.key === bookKey);
      },
      clearBooksRead: () => set({ booksRead: [] }),
    }),
    {
      name: "books-store", // localStorage key name
      partialize: (state) => ({
        favoriteBooks: state.favoriteBooks,
        readingList: state.readingList,
        booksRead: state.booksRead,
      }),
    }
  )
);

export default useBooksStore;
