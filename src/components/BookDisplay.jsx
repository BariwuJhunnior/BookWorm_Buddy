import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import BooksCard from "./BookCard";
import ErrorBoundary from "./common/ErrorBoundary";

const BookDisplay = () => {
  const { books, ApiStatus, getCurrentPageBooks, getTotalPages } =
    useBooksStore();

  const isLoading = ApiStatus === "pending";
  const currentPageBooks = getCurrentPageBooks();
  const totalPages = getTotalPages();

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center gap-4 p-4 my-[2em]">
        {/* Book Display Component Content */}
        {books.length > 0 ? (
          currentPageBooks.map((book, index) => (
            <ErrorBoundary key={book.key || index}>
              <BooksCard book={book} />
            </ErrorBoundary>
          ))
        ) : isLoading ? (
          <p>Fetching your book details...</p>
        ) : (
          <p>No books found!</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-4">
          <PaginationControls />
        </div>
      )}
    </div>
  );
};

// Separate Pagination Controls Component
const PaginationControls = () => {
  const {
    currentPage,
    getTotalPages,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
    books,
  } = useBooksStore();

  const totalPages = getTotalPages();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with smart navigation
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-700  p-3 rounded-lg shadow-sm border-none">
      {/* Previous Button */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 py-1 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-200">
        Page {currentPage} of {totalPages} ({books.length} total books)
      </div>
    </div>
  );
};

export default BookDisplay;
