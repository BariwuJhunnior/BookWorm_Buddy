import React from "react";
import useBooksStore from "../store/books/useBooksStore";

const BookCard = ({ index, book: bookProp } = {}) => {
  const { books } = useBooksStore();

  const book =
    bookProp ?? (Number.isInteger(index) ? books[index] : undefined) ?? {};

  const title = book.title ?? "Untitled";
  const author_name =
    book.author_name ?? (book.authors ? [book.authors] : ["Unknown"]);
  const first_publish_date =
    book.first_publish_year ?? book.first_publish_date ?? "N/A";
  const languages = book.language ?? book.languages ?? ["Unknown"];

  return (
    <div className="border p-4 rounded shadow-md max-w-sm flex flex-col items-start">
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
        <strong>Language:</strong>{" "}
        {Array.isArray(languages) ? languages.join(", ") : languages}
      </p>
    </div>
  );
};

export default BookCard;
