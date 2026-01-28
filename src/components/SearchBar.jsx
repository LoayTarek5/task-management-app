import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../store/slices/tasksSlice.js";
import { selectSearchTerm } from "../store/selectors.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const inputRef = useRef(null);

  // Debounce search term updates to Redux
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleClear = () => {
    setLocalSearch("");
    dispatch(setSearchTerm(""));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400 text-lg">🔍</span>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localSearch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search tasks..."
        className="input pl-10 pr-10"
        aria-label="Search tasks"
      />

      {/* Clear Button */}
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
