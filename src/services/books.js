import axios from "axios";
import useBooksStore from "../store/books/useBooksStore";
import SearchBook from "../config/index";

async function fetchBooks() {
  const { searchTerm, updateBooksList, books, setApiStatus, ApiStatus } =
    useBooksStore.getState();

  const searchURL = `${SearchBook}/${encodeURIComponent(searchTerm)}`;

  if (ApiStatus === "pending") {
    return;
  }

  try {
    setApiStatus("pending");
    const response = await axios.get(searchURL);

    const BooksResult = response.data;
    console.log("Successfully fetched books.");

    if (BooksResult.response === "True") {
      updateBooksList([...books, ...BooksResult.books]);
      setApiStatus("success");
    } else {
      setApiStatus("failure");
      throw new Error("Something went wrong while fetching books.");
    }
    return BooksResult;
  } catch (error) {
    setApiStatus("failure");
    console.error("Error fetching books:", error);

    throw new Error(
      "Could not connect to the book database. Please check your network."
    );
  }
}

fetchBooks();

export default fetchBooks;
