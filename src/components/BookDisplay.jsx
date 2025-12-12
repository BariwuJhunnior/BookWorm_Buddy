import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import BooksCard from "./BookCard";

const BookDisplay = () => {
  const books = useBooksStore();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 my-[2em]">
      {/* Book Display Component Content */}
      {books.length > 0 ? (
        books.map((book, index) => {
          <BooksCard
            title={book.title}
            authors={book.authors}
            publish_date={book.publish_date}
            publishers={book.publishers}
            subjects={book.subjects}
            cover={book.cover}
            key={index}
          />;
        })
      ) : (
        <p>No books found!</p>
      )}
    </div>
  );
};

export default BookDisplay;
