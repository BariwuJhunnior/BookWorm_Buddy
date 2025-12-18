import React, { useState, useEffect } from "react";
import { fetchBookDetails } from "../services/books";
import useBooksStore from "../store/books/useBooksStore";
import {
  FaHeart,
  FaBookmark,
  FaCheckCircle,
  FaDumpster,
  FaTimes,
} from "react-icons/fa";

const BookDetailsModal = ({ book, isOpen, onClose }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState("");

  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
    addToBooksRead,
    removeFromBooksRead,
    isBookRead,
  } = useBooksStore();

  const [isFav, setIsFav] = useState(false);
  const [isInReading, setIsInReading] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (isOpen && book) {
      loadBookDetails();
    }
  }, [isOpen, book]);

  const loadBookDetails = async () => {
    if (!book || !book.key) {
      setError("No book data available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const details = await fetchBookDetails(book.key);
      setBookDetails(details);

      // Set favorites and reading list states
      setIsFav(isFavorite(book.key));
      setIsInReading(isInReadingList(book.key));
      setIsRead(isBookRead(book.key));

      // Extract summary from details
      if (details.description) {
        setSummary(
          typeof details.description === "string"
            ? details.description
            : details.description.value || "No summary available."
        );
      } else {
        setSummary("No summary available.");
      }
    } catch (err) {
      console.error("Error loading book details:", err);
      setError(err.message || "Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!book) return;

    if (isFav) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites({
        key: book.key,
        title: book.title || "Unknown Title",
        author_name: book.author_name || ["Unknown"],
        first_publish_year: book.first_publish_year || "Unknown",
        language: book.language || ["Unknown"],
      });
    }
    setIsFav(!isFav);
  };

  const handleReadingListClick = (e) => {
    e.stopPropagation();
    if (!book) return;

    if (isInReading) {
      removeFromReadingList(book.key);
    } else {
      addToReadingList({
        key: book.key,
        title: book.title || "Unknown Title",
        author_name: book.author_name || ["Unknown"],
        first_publish_year: book.first_publish_year || "Unknown",
        language: book.language || ["Unknown"],
      });
    }
    setIsInReading(!isInReading);
  };

  const handleDoneReadingClick = (e) => {
    e.stopPropagation();
    if (!book) return;

    if (isRead) {
      removeFromBooksRead(book.key);
      setIsRead(false);
    } else {
      addToBooksRead({
        key: book.key,
        title: book.title || "Unknown Title",
        author_name: book.author_name || ["Unknown"],
        first_publish_year: book.first_publish_year || "Unknown",
        language: book.language || ["Unknown"],
      });
      removeFromReadingList(book.key);
      setIsRead(true);
      setIsInReading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const title = book?.title || "Unknown Title";
  const authors = book?.author_name?.join(", ") || "Unknown Author";
  const publishDate =
    book?.first_publish_year || book?.first_publish_date || "Unknown";
  const languages =
    book?.language?.join(", ") || book?.languages?.join(", ") || "Unknown";

  const modalBookDetails = bookDetails
    ? {
        title: bookDetails.title || title,
        authors:
          bookDetails.authors?.map((author) => author.name).join(", ") ||
          authors,
        publishDate: bookDetails.first_publish_date || publishDate,
        languages: bookDetails.languages?.join(", ") || languages,
        subjects:
          bookDetails.subjects?.slice(0, 10).join(", ") ||
          "No subjects available",
        publishers: bookDetails.publishers?.join(", ") || "Unknown",
        numberOfPages: bookDetails.number_of_pages_median || "Unknown",
      }
    : {
        title,
        authors,
        publishDate,
        languages,
        subjects: "Loading subjects...",
        publishers: "Loading publishers...",
        numberOfPages: "Loading...",
      };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Book Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white">Loading book details...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400 text-lg mb-4">Error: {error}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-3 text-white">
                  {modalBookDetails.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <span className="text-lg">{modalBookDetails.authors}</span>
                </div>
              </div>

              {/* Book Information Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Published</p>
                      <p className="text-white">
                        {modalBookDetails.publishDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Language(s)</p>
                      <p className="text-white">{modalBookDetails.languages}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Pages</p>
                      <p className="text-white">
                        {modalBookDetails.numberOfPages}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Publisher(s)</p>
                      <p className="text-white">
                        {modalBookDetails.publishers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Subjects</p>
                      <p className="text-white text-sm">
                        {modalBookDetails.subjects}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-white">
                  Summary
                </h2>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    isFav
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                  }`}
                >
                  <FaHeart size={14} />
                  {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <button
                  onClick={handleReadingListClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    isInReading
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                  }`}
                >
                  <FaBookmark size={14} />
                  {isInReading
                    ? "Remove from Reading List"
                    : "Add to Reading List"}
                </button>

                {isInReading && (
                  <button
                    onClick={handleDoneReadingClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                      isRead
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                    }`}
                  >
                    <FaCheckCircle size={14} />
                    {isRead ? "Mark as Unread" : "Mark as Read"}
                  </button>
                )}

                {isRead && (
                  <button
                    onClick={handleDoneReadingClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium bg-gray-600 hover:bg-red-500 text-gray-200 hover:text-white"
                  >
                    <FaDumpster size={14} />
                    Remove from Read Books
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
