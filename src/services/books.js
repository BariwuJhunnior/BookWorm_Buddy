import useBooksStore from "../store/books/useBooksStore";

const SearchBook = import.meta.env.VITE_OPEN_LIBRARY_BOOK_SEARCH_URL;

async function fetchBooks() {
  const { searchTerm, updateBooksList, setApiStatus, ApiStatus } =
    useBooksStore.getState();

  // Don't proceed if no search term
  if (!searchTerm || searchTerm.trim() === "") {
    //console.log("No search term provided, skipping API request");
    return;
  }

  // URL encode the search term for proper API request
  // URL encode the search term for proper API request
  // Use '+' for spaces (application/x-www-form-urlencoded style)
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim()).replace(
    /%20/g,
    "+"
  );
  const searchURL = `${SearchBook}${encodedSearchTerm}`;

  if (ApiStatus === "pending") {
    console.log("API request already in progress");
    return;
  }

  try {
    setApiStatus("pending");
    //console.log("Fetching books with search term:", searchTerm);
    //console.log("Request URL:", searchURL);

    const response = await fetch(searchURL);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check content type before parsing as JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Expected JSON but got:", contentType);
      console.error("Response text:", text.substring(0, 200));
      throw new Error(`Expected JSON response, got ${contentType}`);
    }

    // Use response.json() instead of response.data
    const BooksResult = await response.json();
    //console.log("API Response:", BooksResult);

    // Open Library API returns books in 'docs' array, not 'books'
    if (BooksResult.docs && BooksResult.docs.length > 0) {
      // Clear existing books and add new search results
      const { clearBooksList } = useBooksStore.getState();
      clearBooksList();

      // Add each book to the store
      BooksResult.docs.forEach((book) => updateBooksList(book));
      setApiStatus("success");
      //console.log(`Successfully fetched ${BooksResult.docs.length} books`);
    } else {
      setApiStatus("failure");
      throw new Error("No books found for the given search term");
    }
    return BooksResult;
  } catch (error) {
    setApiStatus("failure");
    console.error("Error fetching books:", error);

    if (
      error instanceof SyntaxError &&
      error.message.includes("Unexpected token")
    ) {
      throw new Error(
        "API returned invalid data format. Please check your search term and try again."
      );
    }

    throw new Error(
      "Could not connect to the book database. Please check your network."
    );
  }
}

// Fixed: Removed immediate execution - function should only be called when needed
// fetchBooks();

export default fetchBooks;
