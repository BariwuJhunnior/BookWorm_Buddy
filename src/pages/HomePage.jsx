import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookDisplay from "../components/BookDisplay";
import RandomBooksDisplay from "../components/RandomBooksDisplay";
import fetchBooks from "../services/books";
import useBooksStore from "../store/books/useBooksStore";

function HomePage() {
  useEffect(() => {
    const { searchTerm, setSearchTerm } = useBooksStore.getState();

    // If there's no saved search term, set a default and fetch
    const defaultTerm = "life";

    if (!searchTerm || searchTerm.trim() === "") {
      setSearchTerm(defaultTerm);
      // pass the default to ensure fetch runs on first load
      fetchBooks(defaultTerm);
    } else {
      // if a term exists (e.g., from persisted state), fetch with it
      fetchBooks(searchTerm);
    }
  }, []);

  return (
    <>
      <SearchBar />
      <BookDisplay />
    </>
  );
}

export default HomePage;
