import React, { useState } from "react";
import useBooksStore from "../store/books/useBooksStore";
import { FaHeart } from "react-icons/fa";

const BookCard = ({ index, book: bookProp } = {}) => {
  const { books, addToFavorites, removeFromFavorites, isFavorite } =
    useBooksStore();

  const book =
    bookProp ?? (Number.isInteger(index) ? books[index] : undefined) ?? {};

  const title = book.title ?? "Untitled";
  const author_name =
    book.author_name ?? (book.authors ? [book.authors] : ["Unknown"]);
  const first_publish_date =
    book.first_publish_year ?? book.first_publish_date ?? "N/A";
  const languages = book.language ?? book.languages ?? ["Unknown"];

  const [isFav, setIsFav] = useState(isFavorite(book.key));

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="border-2 p-4 rounded-xl shadow-xs max-w-sm flex flex-col items-start">
      <button
        onClick={handleFavoriteClick}
        className={`mb-3 flex items-center gap-2 px-3 py-1 rounded transition-all ${
          isFav
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
        }`}
      >
        <FaHeart />
        {isFav ? "Remove" : "Add to Favorites"}
      </button>

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
      <p>
        <strong>Language(s):</strong>{" "}
        {Array.isArray(languages) ? languages.join(", ") : languages}
      </p>
    </div>
  );
};

export default BookCard;
