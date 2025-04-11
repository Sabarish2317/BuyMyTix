import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../queries/City";
import { City } from "../../types/City";
import { ProfileResponse } from "../../types/Profile";

interface SearchBarProps {
  setUserData: React.Dispatch<React.SetStateAction<ProfileResponse>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setUserData }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data: cityData = [] } = useQuery<City[]>({
    queryKey: ["cities", debouncedInput],
    queryFn: () => fetchCities(debouncedInput),
    enabled: debouncedInput.length > 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (cityData.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < cityData.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cityData.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < cityData.length) {
        handleSelectSuggestion(selectedIndex);
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selectedCity = cityData[index];
    if (selectedCity) {
      // returns { city, state }
      setInputValue(`${selectedCity.city}, ${selectedCity.state}`);
      setUserData((prev) => ({
        ...prev,
        city: selectedCity.city,
        state: selectedCity.state,
      }));
    }
  };

  return (
    <div className="w-full h-max absolute z-50 text-white bg-purple-200/6 rounded-md outline-2 outline-white/20 outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all duration-200 focus:outline-none active:opacity-100 flex flex-col overflow-clip">
      <div className="seach-input-container flex flex-row justify-start items-center gap-3 px-4 py-2 md:px-6 md:py-3">
        <img
          src="/icons/search.svg"
          alt="search"
          className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all duration-200 active:scale-110 active:scale-3d cursor-pointer"
        />
        <div className="relative w-full z-100">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
          {inputValue.length === 0 && (
            <h3 className="absolute text-[clamp(16px,2vw,21px)] top-1/2 -translate-y-1/2 font-medium pointer-events-none">
              Location
            </h3>
          )}
        </div>
      </div>

      {cityData.length > 0 && (
        <ul className="w-full z-50 bg-gray-950 rounded-b-md">
          {cityData.map((item, index) => (
            <li
              key={index}
              role="button"
              onClick={() => handleSelectSuggestion(index)}
              className={`p-3 text-white cursor-pointer transition-all ${
                selectedIndex === index ? "bg-[#7349AD]" : "hover:bg-[#7349AD]"
              }`}
            >
              {item.city}, {item.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
