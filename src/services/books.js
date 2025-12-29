import useBooksStore from "../store/books/useBooksStore";
import { BookDetailsURL, BookSummaryURL, BookCoverURL } from "../config";

const SearchBook = import.meta.env.VITE_OPEN_LIBRARY_BOOK_SEARCH_URL;

async function fetchBooks(query) {
  const { searchTerm, updateBooksList, setApiStatus, ApiStatus } =
    useBooksStore.getState();

  // allow caller to pass a query directly; fallback to store's searchTerm
  const term =
    typeof query === "string" && query.trim() !== ""
      ? query.trim()
      : searchTerm;

  if (!term || term.trim() === "") {
    return;
  }

  // URL encode the search term for proper API request (use '+' for spaces)
  const encodedSearchTerm = encodeURIComponent(term).replace(/%20/g, "+");
  const searchURL = `${SearchBook}${encodedSearchTerm}`;

  if (ApiStatus === "pending") {
    //console.log("API request already in progress");
    return;
  }

  try {
    setApiStatus("pending");
    // Clear existing books immediately so the UI can show a loading state
    // while new search results are being fetched.
    const { clearBooksList } = useBooksStore.getState();
    clearBooksList();
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
      console.error("Response text:", text.substring(0, 500));
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

// Function to fetch individual book details
async function fetchBookDetails(bookKey) {
  if (!bookKey) {
    throw new Error("Book key is required");
  }

  try {
    // Handle different key formats from Open Library API
    // Keys can be in format: "/works/OL12345W" or "/books/OL12345M"
    let detailsURL;

    if (bookKey.startsWith("/works/")) {
      // It's a work ID
      const workId = bookKey.replace("/works/", "");
      detailsURL = `${BookDetailsURL}/works/${workId}.json`;
    } else if (bookKey.startsWith("/books/")) {
      // It's a book/edition ID
      const bookId = bookKey.replace("/books/", "");
      detailsURL = `${BookDetailsURL}/books/${bookId}.json`;
    } else {
      // Assume it's a work ID (most common case)
      detailsURL = `${BookDetailsURL}/works/${bookKey}.json`;
    }

    //console.log("Fetching book details from:", detailsURL);

    const response = await fetch(detailsURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response, got ${contentType}`);
    }

    const bookDetails = await response.json();
    return bookDetails;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw new Error("Could not fetch book details. Please try again.");
  }
}

// Function to fetch book summary for BookCard component
async function fetchBookSummary(workKey) {
  if (!workKey) {
    throw new Error("Work key is required");
  }

  try {
    // Extract work ID from the key
    let workId;
    if (workKey.startsWith("/works/")) {
      workId = workKey.replace("/works/", "");
    } else {
      workId = workKey;
    }

    const summaryURL = `${BookSummaryURL}/${workId}.json`;
    //console.log("Fetching book summary from:", summaryURL);

    const response = await fetch(summaryURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response, got ${contentType}`);
    }

    const bookData = await response.json();

    // Extract description/summary from the response
    const summary =
      bookData.description ||
      (bookData.description && bookData.description.value) ||
      "No summary available for this book.";

    return typeof summary === "string"
      ? summary
      : summary.value || "No summary available for this book.";
  } catch (error) {
    console.error("Error fetching book summary:", error);
    return "Summary not available.";
  }
}

// Function to generate book cover URL

function generateBookCoverURL(book) {
  /* console.log(
    "Debug: Generating cover URL for book:",
    book?.title,
    "cover_i:",
    book?.cover_i
  ); */

  if (!book || !book.cover_i) {
    //console.log("Debug: No cover_i available, returning null");

    return null;
  }

  const url = `${BookCoverURL}/b/id/${book.cover_i}-M.jpg`;

  //console.log("Debug: Generated cover URL:", url);

  return url;
}

// Fixed: Removed immediate execution - function should only be called when needed
// fetchBooks();

export { fetchBookDetails, fetchBookSummary, generateBookCoverURL };
export default fetchBooks;
