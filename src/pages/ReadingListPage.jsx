import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import ErrorBoundary from "../components/common/ErrorBoundary";
import BookCard from "../components/BookCard";

function ReadingListPage() {
  const { readingList } = useBooksStore();

  return (
    <div className="pt-24 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">
        My Reading List
      </h1>

      {readingList.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl text-gray-300">
            You haven't added any books to your reading list yet.
          </p>
          <p className="text-gray-400 mt-2">
            Click the bookmark icon on any book to add it to your reading list!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 my-[2em]">
          {readingList.map((book, index) => (
            <ErrorBoundary key={book.key || index}>
              <BookCard book={book} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingListPage;
