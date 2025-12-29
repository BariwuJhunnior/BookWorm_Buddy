import React, { useState, useEffect } from "react";
import useBooksStore from "../store/books/useBooksStore";
import {
  fetchBookDetails,
  fetchBookSummary,
  generateBookCoverURL,
} from "../services/books";
import BookDetailsModal from "./BookDetailsModal";
import {
  FaHeart,
  FaBookmark,
  FaCheckCircle,
  FaDumpster,
  FaEye,
  FaBookOpen,
} from "react-icons/fa";

const BookCard = ({ index, book: bookProp } = {}) => {
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

  // State for cover URL
  const [coverURL, setCoverURL] = useState(null);
  const [canRead, setCanRead] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFav, setIsFav] = useState(isFavorite(book.key));
  const [isInReading, setIsInReading] = useState(isInReadingList(book.key));
  const [isRead, setIsRead] = useState(isBookRead(book.key));

  // Fetch book summary when component mounts or book key changes
  useEffect(() => {
    const loadSummary = async () => {
      //console.log("Debug: BookCard loading for book:", book);
      if (!book.key) {
        setSummary("No summary available");
        setSummaryLoading(false);
        return;
      }

      try {
        setSummaryLoading(true);
        const bookSummary = await fetchBookSummary(book.key);
        setSummary(bookSummary);
        const url = generateBookCoverURL(book);
        setCoverURL(url);
        setCanRead(!!(book.public_scan_b || book.lending_edition_s));
        //console.log("Debug: Cover URL set to:", url);
      } catch (error) {
        console.error("Error loading book summary:", error);
        setSummary("Summary not available");
      } finally {
        setSummaryLoading(false);
      }
    };

    loadSummary();
  }, [book.key]);

  const handleViewDetailsClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

  // Shorten summary if it's too long
  const truncateSummary = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="border border-white/20 p-4 rounded-xl bg-gray-800/10 backdrop-blur-sm max-w-sm flex flex-col items-start hover:shadow-lg hover:bg-gray-800/20 transition-all duration-300 wrap-break-word">
        {coverURL ? (
          <img
            src={coverURL}
            alt={`${title} cover`}
            className="w-full h-60 object-cover rounded-t-xl mb-2"
          />
        ) : (
          <div className="w-full h-60 flex items-center justify-center bg-gray-200 rounded-t-xl mb-2">
            <span className="text-gray-600">No cover available</span>
          </div>
        )}
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
        <div className="mb-3 grow">
          <h4 className="text-sm font-semibold text-white mb-1">Summary:</h4>
          <p className="text-xs text-white leading-relaxed">
            {summaryLoading ? (
              <span className="italic text-white">Loading summary...</span>
            ) : (
              truncateSummary(summary)
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full justify-center flex-wrap mt-auto">
          <button
            onClick={handleViewDetailsClick}
            className="mb-1 flex items-center gap-2 px-3 py-1 rounded transition-all text-sm bg-gray-300 text-gray-700 hover:bg-gray-400"
            title="View Details"
          >
            <FaEye size={14} />
            View Details
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
              isFav
                ? "bg-red-400 text-white hover:bg-red-500 "
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 "
            }`}
          >
            <FaHeart size={14} />
            {isFav ? "Favorited" : "Favorite"}
          </button>
          {canRead && (
            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (book.key) {
                  try {
                    const details = await fetchBookDetails(book.key);
                    if (details.ocaid) {
                      window.open(
                        `https://archive.org/details/${details.ocaid}`,
                        "_blank"
                      );
                    } else {
                      window.open(
                        `https://openlibrary.org${book.key}`,
                        "_blank"
                      );
                    }
                  } catch (error) {
                    console.error(
                      "Error fetching book details for reading:",
                      error
                    );
                    window.open(`https://openlibrary.org${book.key}`, "_blank");
                  }
                }
              }}
              className="mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm bg-blue-300 text-gray-700 hover:bg-blue-400 "
              title="Read Online"
            >
              <FaBookOpen size={14} />
              Read
            </button>
          )}
          <button
            onClick={handleReadingListClick}
            className={`mb-1 flex items-center gap-2 px-2 py-1 rounded transition-all text-sm ${
              isInReading
                ? "bg-blue-400 text-white hover:bg-blue-500 "
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 "
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
                  ? "bg-green-500 text-white hover:bg-green-600 "
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 "
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
                  ? "bg-gray-300 text-gray-700 hover:bg-red-400 "
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 "
              }`}
              onClick={handleDoneReadingClick}
            >
              <FaDumpster size={14} />
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Book Details Modal */}
      <BookDetailsModal
        book={book}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default BookCard;
