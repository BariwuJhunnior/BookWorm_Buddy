import React, { useEffect } from "react";
import { useLocation } from "react-router";
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

function HomePage() {
  const { books, ApiStatus, searchTerm } = useBooksStore();
  const location = useLocation();

  useEffect(() => {
    // Only initialize default/random books when there is no existing
    // books list and no search term. This preserves the user's
    // previous books and search box value when they navigate away
    // and return to Home.
    const state = useBooksStore.getState();

    // If there are already books in the store, keep them intact
    if (state.books && state.books.length > 0) return;

    // If the user previously entered a search term (even if it
    // produced no results), preserve that search state and do not
    // replace it with a random term.
    if (state.searchTerm && state.searchTerm.trim() !== "") return;

    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    const { setSearchTerm } = state;

    // Only set a random default term if there's no existing term
    if (!state.searchTerm || state.searchTerm.trim() === "") {
      setSearchTerm(randomTerm);
    }

    fetchBooks(randomTerm);
  }, [location.pathname]);

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
