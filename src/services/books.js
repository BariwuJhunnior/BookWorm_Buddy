import axios from "axios";
import useBooksStore from "../store/books/useBooksStore";

const BooksList_URL =
  "https://openlibrary.org/search.json?q=life&sort=random&limit=21";

async function fetchBooks() {
  const searchEndPoint = BooksList_URL;

  try {
    const response = await axios.get(searchEndPoint);

    const BooksResult = response.data;
    console.log("Successfully fetched books.");
    console.log(BooksResult);
  } catch (error) {
    console.error("Error fetching data from Open Library:", error);

    throw new Error(
      "Could not connect to the book database. Please check your network."
    );
  }
}

fetchBooks();

export default fetchBooks;
