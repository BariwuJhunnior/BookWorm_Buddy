import React, { useState } from "react";
import useBooksStore from "../store/books/useBooksStore";
import { FaHeart, FaBookmark, FaCheckCircle } from "react-icons/fa";

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

  const [isFav, setIsFav] = useState(isFavorite(book.key));
  const [isInReading, setIsInReading] = useState(isInReadingList(book.key));
  const [isRead, setIsRead] = useState(isBookRead(book.key));

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
    setIsFav(!isFav);
  };

  const handleReadingListClick = () => {
    if (isInReading) {
      removeFromReadingList(book.key);
    } else {
      addToReadingList(book);
    }
    setIsInReading(!isInReading);
  };

  const handleDoneReadingClick = () => {
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

  return (
    <div className="border-2 p-4 rounded-xl shadow-xs max-w-sm flex flex-col items-start">
      <h2>
        <strong>Title: </strong>
        {title}
      </h2>
      <p>
        <strong>Published: </strong>
        {first_publish_date}
      </p>
      <p>
        <strong>By:</strong>{" "}
        {Array.isArray(author_name) ? author_name[0] : author_name}
      </p>
      <p className="pb-3">
        <strong>Language(s):</strong>{" "}
        {Array.isArray(languages) ? languages.join(", ") : languages}
      </p>

      <div className="flex gap-2 w-full justify-center flex-wrap">
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
                ? "bg-green-500 text-white hover:bg-green-600 hover:cursor-pointer"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer"
            }`}
            onClick={handleDoneReadingClick}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
