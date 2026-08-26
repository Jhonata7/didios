import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  function clearSearch() {
    setSearch("");
  }

  function clearFilters() {
    setSearch("");
    setCategory("Todos");
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        clearSearch,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}