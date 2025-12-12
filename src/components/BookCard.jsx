import React from "react";

const BookCard = ({ props }) => {
  const { title, authors, publish_date, publishers, subjects, cover } = props;
  return (
    <div className="border p-4 rounded shadow-md max-w-sm flex flex-col items-center">
      <img src={cover} alt={`Cover of ${title}`} />
      <h2>
        {title} - {publish_date}
      </h2>
      <p>
        <strong>By:</strong> {authors.join(", ")}
      </p>
      <p>
        <strong>Published by:</strong> {publishers.join(", ")}
      </p>
      <p>
        <strong>Subjects:</strong> {subjects.join(", ")}
      </p>
    </div>
  );
};

export default BookCard;
