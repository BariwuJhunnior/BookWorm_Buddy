import React from "react";
import useBooksStore from "../store/books/useBooksStore";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const { setSearchTerm } = useBooksStore();
  return (
    <div className="flex items-center gap-5 bg-transparent] px-4 py-2 rounded-full md:max-w-[40%] max-w-[80%] sm:max-w-[80%] xs:max-w-[30%] border-solid border-2 border-slate-700 text-black font-bold mx-auto my-[1em]">
      <FaSearch />
      <input
        type="text"
        name=""
        id=""
        placeholder="Search for Books"
        onChange={(event) => setSearchTerm(event.target.value)}
        className="outline-none border-none active:border-none bg-none placeholder-black"
      />
    </div>
  );
};

export default SearchBar;
