import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBooksStore from "../store/books/useBooksStore";
import { fetchBookSummary } from "../services/books";
import {
  FaHeart,
  FaBookmark,
  FaCheckCircle,
  FaRemoveFormat,
  FaDumpster,
} from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

const BookCard = ({ index, book: bookProp } = {}) => {
  const navigate = useNavigate();
  const {
    books,
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

  const book =
    bookProp ?? (Number.isInteger(index) ? books[index] : undefined) ?? {};

  const title = book.title ?? "Untitled";
  const author_name =
    book.author_name ?? (book.authors ? [book.authors] : ["Unknown"]);
  const first_publish_date =
    book.first_publish_year ?? book.first_publish_date ?? "N/A";
  const languages = book.language ?? book.languages ?? ["Unknown"];

  // State for book summary
  const [summary, setSummary] = useState("Loading summary...");
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [isFav, setIsFav] = useState(isFavorite(book.key));
  const [isInReading, setIsInReading] = useState(isInReadingList(book.key));
  const [isRead, setIsRead] = useState(isBookRead(book.key));

  // Fetch book summary when component mounts or book key changes
  useEffect(() => {
    const loadSummary = async () => {
      if (!book.key) {
        setSummary("No summary available");
        setSummaryLoading(false);
        return;
      }

      try {
        setSummaryLoading(true);
        const bookSummary = await fetchBookSummary(book.key);
        setSummary(bookSummary);
      } catch (error) {
        console.error("Error loading book summary:", error);
        setSummary("Summary not available");
      } finally {
        setSummaryLoading(false);
      }
    };

    loadSummary();
  }, [book.key]);

  const handleCardClick = () => {
    if (book.key) {
      navigate(`/books/${book.key}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (isFav) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
    setIsFav(!isFav);
  };

  const handleReadingListClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (isInReading) {
      removeFromReadingList(book.key);
    } else {
      addToReadingList(book);
    }
    setIsInReading(!isInReading);
  };

  const handleDoneReadingClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (isRead) {
      removeFromBooksRead(book.key);
      setIsRead(false);
    } else {
      addToBooksRead(book);
      removeFromReadingList(book.key);
      setIsRead(true);
      setIsInReading(false);
    }
  };

  // Truncate summary if it's too long
  const truncateSummary = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="border-2 p-4 rounded-xl shadow-xs max-w-sm flex flex-col items-start cursor-pointer hover:shadow-md transition-shadow">
      <h2 className="mb-2">
        <strong>Title: </strong>
        {title}
      </h2>
      <p className="text-sm mb-1">
        <strong>Published: </strong>
        {first_publish_date}
      </p>
      <p className="text-sm mb-1">
        <strong>By:</strong>{" "}
        {Array.isArray(author_name) ? author_name[0] : author_name}
      </p>
      <p className="text-sm mb-3">
        <strong>Language(s):</strong>{" "}
        {Array.isArray(languages) ? languages.join(", ") : languages}
      </p>

      {/* Summary Section */}
      <div className="mb-3 flex-grow">
        <h4 className="text-sm font-semibold text-white mb-1">Summary:</h4>
        <p className="text-xs text-white leading-relaxed">
          {summaryLoading ? (
            <span className="italic text-white">Loading summary...</span>
          ) : (
            truncateSummary(summary)
          )}
        </p>
      </div>

      <div className="flex gap-2 w-full justify-center flex-wrap mt-auto">
        <button
          onClick={handleFavoriteClick}
          className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
            isFav
              ? "bg-red-400 text-white hover:bg-red-500 hover:cursor-pointer"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer"
          }`}
        >
          <FaHeart size={14} />
          {isFav ? "Favorited" : "Favorite"}
        </button>
        <button
          onClick={handleReadingListClick}
          className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
            isInReading
              ? "bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer"
          }`}
        >
          <FaBookmark size={14} />
          {isInReading ? "Reading" : "Add to Reading"}
        </button>
        {isInReading && (
          <button
            onClick={handleDoneReadingClick}
            className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
              isRead
                ? "bg-green-500 text-white hover:bg-green-600 hover:cursor-pointer"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer"
            }`}
          >
            <FaCheckCircle size={14} />
            {isRead ? "Read" : "Mark Done"}
          </button>
        )}
        {isRead && (
          <button
            className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
              isRead
                ? "bg-gray-300 text-gray-700 hover:bg-red-400 hover:cursor-pointer"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer"
            }`}
            onClick={handleDoneReadingClick}
          >
            <FaDumpster size={14} />
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
