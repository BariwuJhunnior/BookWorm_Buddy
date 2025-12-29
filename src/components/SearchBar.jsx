import React, { useEffect, useRef } from "react";
import useBooksStore from "../store/books/useBooksStore";
import { FaSearch, FaHome } from "react-icons/fa";
import _ from "lodash";
import fetchBooks from "../services/books";

const terms = [
  "life",
  "success",
  "money",
  "brain",
  "rich",
  "poor",
  "old",
  "wisdom",
  "manipulation",
];

const DEFAULT_TERM = Math.floor(Math.random() * terms.length);

const SearchBar = () => {
  const { setSearchTerm } = useBooksStore();

  const inputRef = useRef();
  const debouncedFetchRef = useRef(
    _.debounce((term) => {
      fetchBooks(term);
    }, 1000)
  );

  useEffect(() => {
    return () => {
      if (debouncedFetchRef.current && debouncedFetchRef.current.cancel) {
        debouncedFetchRef.current.cancel();
      }
    };
  }, []);

  const handleHome = () => {
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    fetchBooks(randomTerm);
    setSearchTerm("");
    inputRef.current.value = "";
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      if (debouncedFetchRef.current && debouncedFetchRef.current.cancel) {
        debouncedFetchRef.current.cancel();
      }
      return;
    }
    setSearchTerm(value);
    // call fetchBooks 500ms after user stops typing, passing the latest value
    debouncedFetchRef.current(value);
  };
  return (
    <div className="flex items-center gap-5  px-4 py-2 rounded-full md:max-w-[40%] max-w-[80%] sm:max-w-[80%] xs:max-w-[30%] border-solid border-2 border-white text-white mx-auto my-[1em] justify-between mt-20 ">
      <input
        ref={inputRef}
        type="text"
        name=""
        id=""
        placeholder="Search for Books"
        onChange={handleChange}
        className="outline-none border-none active:border-none bg-none w-125"
      />
      <div className="flex gap-2">
        <FaHome onClick={handleHome} className="cursor-pointer" />
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
