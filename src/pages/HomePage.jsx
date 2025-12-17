import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookDisplay from "../components/BookDisplay";
import fetchBooks from "../services/books";
import useBooksStore from "../store/books/useBooksStore";

const terms = [
  "life",
  "gold",
  "king",
  "happy",
  "evil",
  "money",
  "soul",
  "success",
];

const DEFAULT_TERM = terms[Math.floor(Math.random() * terms.length)];

function HomePage() {
  const { books, ApiStatus, searchTerm } = useBooksStore();

  useEffect(() => {
    // Always load random books when visiting home page
    // This clears any previous search results
    const { setSearchTerm, clearBooksList } = useBooksStore.getState();

    clearBooksList();
    setSearchTerm(DEFAULT_TERM);
    fetchBooks(DEFAULT_TERM);
  }, []);

  const noResults =
    searchTerm &&
    searchTerm.trim() !== "" &&
    books.length === 0 &&
    ApiStatus !== "pending";

  if (noResults || ApiStatus === "failure") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start pt-24">
        <SearchBar />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">No books found</h2>
          <p className="text-gray-600">
            Try a different search term or clear the box to see default results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SearchBar />
      <BookDisplay />
    </>
  );
}

export default HomePage;
