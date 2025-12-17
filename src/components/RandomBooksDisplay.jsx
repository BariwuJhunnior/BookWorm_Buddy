import React from "react";
import useRandomBooksStore from "../store/books/useRandomBooksStore";
import RandomBookCard from "./RandomBookCard";
import ErrorBoundary from "./common/ErrorBoundary";

const RandomBooksDisplay = () => {
  const { books, ApiStatus } = useRandomBooksStore();
  const isLoading = ApiStatus == "pending";
  return (
    <div>
      {/*  Random Book Display Component */}
      {books.length > 0 ? (
        books.map((book, index) => (
          <ErrorBoundary key={index}>
            <RandomBookCard key={index} />
          </ErrorBoundary>
        ))
      ) : isLoading ? (
        <p>Fetching Your Books...</p>
      ) : (
        <p>No Books Found!</p>
      )}
    </div>
  );
};

export default RandomBooksDisplay;
