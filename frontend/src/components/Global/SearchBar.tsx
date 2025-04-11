import { useState } from "react";
import FlippingText from "./FlippingText";
import {
  citySuggestionsList,
  MovieSuggestionsList,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  type: string;
  className?: string;
  mainClassName?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  type,
  mainClassName = "",
  className = "",
}) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // For arrow key selection

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1); // Reset selection

    if (value.length > 0) {
      const filtered = (
        type === "movie"
          ? MovieSuggestionsList
          : type === "city"
          ? citySuggestionsList
          : []
      )
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        handleSelectSuggestion(filteredSuggestions[selectedIndex]);
        // navigate(`/search/${type}/${suggestion}`);
        navigate(`/search:id=1`);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    // navigate(`/search/${type}/${suggestion}`);
    navigate(`/moreInfo/:id=1`);
  };

  return (
    <div
      className={`w-full h-max absolute z-50 text-white bg-purple-200/6 rounded-md outline-2 outline-white/20 
        outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all 
        duration-200 focus:outline-none active:opacity-100 flex flex-col overflow-clip ${mainClassName}`}
    >
      <div className="seach-input-container flex flex-row justify-start items-center gap-3 px-4 py-2 md:px-6 md:py-3">
        <img
          src="/icons/search.svg"
          alt="search"
          className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all 
          duration-200 active:scale-110 active:scale-3d cursor-pointer"
        />
        <div className="relative w-full z-100">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
          {inputValue.length === 0 && type === "movie" && <FlippingText />}
          {inputValue.length === 0 && type === "city" && (
            <h3 className="absolute text-[clamp(16px,2vw,21px)] top-1/2 -translate-y-1/2 font-medium  pointer-events-none">
              Location
            </h3>
          )}
        </div>
      </div>

      {showSuggestions && (
        <ul className={`w-full z-50 ${className}`}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              role="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`p-3 text-white cursor-pointer transition-all ${
                selectedIndex === index ? "bg-[#7349AD]" : "hover:bg-[#7349AD]"
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
