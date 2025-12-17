import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import BookCard from "../components/BookCard";
import ErrorBoundary from "../components/common/ErrorBoundary";

const BooksReadPage = () => {
  const { booksRead } = useBooksStore();

  return (
    <div className="min-h-screen pt-24 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Books Read</h1>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {booksRead.length > 0 ? (
          booksRead.map((book, index) => (
            <ErrorBoundary key={index}>
              <BookCard book={book} />
            </ErrorBoundary>
          ))
        ) : (
          <p className="text-gray-300 text-lg">
            No books marked as read yet. Start reading!
          </p>
        )}
      </div>
    </div>
  );
};

export default BooksReadPage;
