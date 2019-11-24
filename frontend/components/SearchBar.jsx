import React from "react";
import classNames from "classnames";
import Search from "../icons/search.svg";

export const SearchBar = ({ className, ...props }) => (
  <div
    className={classNames(
      "flex rounded-xl text-sm bg-white items-center",
      className
    )}
  >
    <input
      className="focus:shadow-outline rounded-l-xl flex-1 min-w-0 px-4 py-3 placeholder-gray-700"
      type="search"
      {...props}
    />
    <button
      type="submit"
      className="focus:shadow-outline flex items-center px-4 py-3 rounded-r-xl text-brand-600"
    >
      <Search />
    </button>
  </div>
);
