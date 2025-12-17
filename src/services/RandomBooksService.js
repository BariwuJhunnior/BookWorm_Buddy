import React from "react";
import useRandomBooksStore from "../store/books/useRandomBooksStore";

async function fetchRandomBooks() {
  const { books, ApiStatus, error, updateBooksList, setApiStatus, setError } =
    useRandomBooksStore.getState();

  const RandomBooksURL = import.meta.env
    .VITE_OPEN_LIBRARY_RANDOM_BOOKS_ENDPOINT;

  if (ApiStatus === "pending") {
    console.log("API Request In Progress...");
    return;
  }

  try {
    setApiStatus("pending");

    const response = await fetch(RandomBooksURL);

    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }

    //Check Content Type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Expected JSON but got: ", contentType);
      console.error("Response text: ", text.substring(0, 200));
      throw new Error(`Expected JSON response, but got ${contentType}`);
    }

    const RandomBooksList = await response.json();
    console.log("API Response: ", RandomBooksList);
    if (RandomBooksList.docs && RandomBooksList.docs.length > 0) {
      //Clear existing books and add new random books
      const { clearBooksList } = useRandomBooksStore.getState();
      clearBooksList();

      RandomBooksList.docs.forEach((book) => updateBooksList(book));
      setApiStatus("success");
      console.log(
        `Successfully fetched ${RandomBooksList.docs.length} random books.`
      );
    } else {
      setApiStatus("failure");
      throw new Error("No Books Found!");
    }
    return RandomBooksList;
  } catch (error) {
    setApiStatus("failure");
    console.error("Error fetching Books: ", error);
    setError(error);

    if (
      error instanceof SyntaxError &&
      error.message.includes("Unexpected token")
    ) {
      throw new Error(
        "API returned invalid data format. Please try again later."
      );
    }

    throw new Error(
      "Could not connect to the Books API. Please check your network connection and try again."
    );
  }
}

export default fetchRandomBooks;
