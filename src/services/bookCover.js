const BOOK_COVER_URL = import.meta.env.VITE_OPEN_LIBRARY_BOOK_COVER_URL;

export function getBookCoverUrl(bookIdentifier, size = "M") {
  console.log("[Cover] getBookCoverUrl called:", {
    bookIdentifier,
    size,
    BOOK_COVER_URL,
  });
  if (!bookIdentifier || !BOOK_COVER_URL) {
    console.log("[Cover] Missing bookIdentifier or BOOK_COVER_URL");
    return null;
  }

  // Replace $key, $value, $size with olid, bookIdentifier, and size
  const url = BOOK_COVER_URL.replace("$key", "olid")
    .replace("$value", bookIdentifier)
    .replace("$size", size);
  console.log("[Cover] Generated URL:", url);
  return url;
}

export function extractOLIDFromBook(book) {
  // edition_key first
  if (book.edition_key && book.edition_key[0]) {
    console.log("[Cover] Using edition_key:", book.edition_key[0]);
    return book.edition_key[0];
  }

  // Fallback key field
  if (book.key) {
    const parts = book.key.split("/");
    const olid = parts[parts.length - 1];
    console.log("[Cover] Using key:", olid);
    return olid;
  }

  console.log("[Cover] No OLID found. Book keys:", Object.keys(book));
  return null;
}

export function getBookCoverUrlFromBook(book, size = "M") {
  const olid = extractOLIDFromBook(book);
  if (!olid) return null;
  return getBookCoverUrl(olid, size);
}

export default {
  getBookCoverUrl,
  extractOLIDFromBook,
  getBookCoverUrlFromBook,
};
