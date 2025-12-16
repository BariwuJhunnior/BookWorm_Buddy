import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import { FaSearch } from "react-icons/fa";
import { useMemo } from "react";
import _ from "lodash";
import fetchBooks from "../services/books";

const SearchBar = () => {
  const { setSearchTerm, searchTerm } = useBooksStore();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    const updatedSearchTerm = _.debounce(() => {
      fetchBooks();
    }, 250);

    //call fetchBooks 500ms after user stops typing
    updatedSearchTerm();
  };
  return (
    <div className="flex items-center gap-5 bg-transparent] px-4 py-2 rounded-full md:max-w-[40%] max-w-[80%] sm:max-w-[80%] xs:max-w-[30%] border-solid border-2 border-slate-700 text-black mx-auto my-[1em] justify-between">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search for Books"
        onChange={handleChange}
        className="outline-none border-none active:border-none bg-none w-125"
      />
      <FaSearch className="cursor-pointer hover:opacity-50 transition-all duration-200 " />
    </div>
  );
};

export default SearchBar;
