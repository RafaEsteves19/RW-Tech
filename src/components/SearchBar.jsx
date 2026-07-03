import { Search, X } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ searchQuery, onSearchChange, onClear }) {
  return (
    <div className="search-container">

      <Search className="search-icon" />

      <input
        type="text"
        placeholder="Buscar por produto ou categoria..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      {searchQuery && (
        <button
          onClick={onClear}
          className="clear-search"
          aria-label="Limpar busca"
        >
          <X />
        </button>
      )}

    </div>
  );
}

export default SearchBar;