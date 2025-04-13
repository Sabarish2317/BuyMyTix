// Fixed SearchBar.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import FlippingText from "./FlippingText";
import { SearchTitleRequest, SearchTitleResponse } from "../../types/Titles";
import { fetchTitles } from "../../queries/Titles";

interface SearchBarProps {
  className?: string;
  mainClassName?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  mainClassName = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data: titlesData = [],
    isLoading,
    isFetched,
  } = useQuery<SearchTitleResponse[]>({
    queryKey: ["titles", debouncedInput],
    staleTime: 1000 * 60,

    queryFn: () =>
      fetchTitles({
        q: debouncedInput.toString(),
        y: "2024",
      } as SearchTitleRequest), // Updated parameter name to 'q'
    enabled: debouncedInput.length > 2,
  });
  useEffect(() => {
    console.table(titlesData);
  }, [titlesData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (titlesData.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < titlesData.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : titlesData.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < titlesData.length) {
        handleSelectSuggestion(selectedIndex);
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selected = titlesData[index];
    if (!selected) return;

    setInputValue(`${selected.title}`);
  };

  return (
    <div
      className={`w-full h-max absolute z-[999] text-white bg-purple-200/6 rounded-md outline-2 outline-white/20
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
            onClick={() => {
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
          {inputValue.length === 0 && <FlippingText />}
        </div>
      </div>

      {isLoading && inputValue.length >= 1 && (
        <div className="p-3 text-white">Searching •••</div>
      )}
      {isFetched &&
        inputValue.length &&
        titlesData.length === 0 &&
        !isLoading && <div className="p-3 text-white">No results found</div>}

      {titlesData.length > 0 && (
        <ul className={`w-full z-[999] bg-[#090e18] ${className}`}>
          {titlesData.map((item, index) => (
            <li
              key={index}
              role="button"
              onClick={() => handleSelectSuggestion(index)}
              className={`p-3 text-white cursor-pointer transition-all flex flex-row justify-between items-center  ${
                selectedIndex === index
                  ? "bg-[#7349AD]"
                  : "hover:bg-[#7349ad8f]"
              }`}
            >
              <div className="image-title-date-container flex flex-row justify-start items-center gap-4">
                <img
                  className="w-12 h-16 object-cover rounded-md"
                  src={item.poster || "/images/popcorn.png"}
                  alt="poster"
                />
                <div className="title-year flex flex-col gap-1 justify-start align-middle  text-[clamp(16px,1.5vw,20px)]  ">
                  {item.title}
                  <h3 className="text-[clamp(14px,1.5vw,18px)] text-overflow-ellipsis">
                    {item.year && ` (${item.year})`}
                  </h3>
                </div>
              </div>
              {item.type && (
                <span className="text-[clamp(14px,1.3vw,16px)] text-gray-400 leading-0 ml-2">
                  ({item.type})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
