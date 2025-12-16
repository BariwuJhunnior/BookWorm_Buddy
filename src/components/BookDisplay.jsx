import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import BooksCard from "./BookCard";

const BookDisplay = () => {
  const { books, ApiStatus } = useBooksStore();

  const isLoading = ApiStatus === "pending";

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 my-[2em]">
      {/* Book Display Component Content */}
      {books.length > 0 ? (
        books.map((book, index) => <BooksCard index={index} key={index} />)
      ) : isLoading ? (
        <p>Fetching your book details...</p>
      ) : (
        <p>No books found!</p>
      )}
    </div>
  );
};

export default BookDisplay;
