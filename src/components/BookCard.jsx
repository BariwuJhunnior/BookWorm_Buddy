import React from "react";

const BookCard = ({ props }) => {
  const { title, author_name, first_publish_year, language } = props;
  return (
    <div className="border p-4 rounded shadow-md max-w-sm flex flex-col items-center">
      {/* <img src={cover} alt={`Cover of ${title}`} /> */}
      <h2>
        {title} - {first_publish_year}
      </h2>
      <p>
        <strong>By:</strong> {author_name[0]}
      </p>
      <p>
        <strong>Language:</strong> {language.join(", ")}
      </p>
    </div>
  );
};

export default BookCard;
