import { useState } from "react";
import FlippingText from "../../utils/FlippingText";

const suggestionsList = [
  "Vidaamuyrachi",
  "Captain Miller",
  "Ayalaan",
  "Thangalaan",
  "Viduthalai Part 2",
  "Indian 2",
  "Jigarthanda DoubleX",
  "Leo",
  "Mark Antony",
  "Lal Salaam",
  "Japan",
  "Maaveeran",
  "Vaathi",
  "Bommai Nayagi",
  "Farhana",
  "Pathu Thala",
  "Good Night",
  "Pon Ondru Kanden",
  "Kazhuvethi Moorkkan",
  "Rathnam",
  "Rebel",
  "Irugapatru",
  "Paramporul",
  "Love Today",
  "Gatta Kusthi",
  "Kaari",
  "Nitham Oru Vaanam",
  "Sembi",
  "Raayan",
  "Garudan",
  "Red Sandal Wood",
  "Deiva Machan",
  "Aalambana",
  "Chandramukhi 2",
  "Vettaiyan",
  "Kannagi",
  "Borrder",
  "Agilan",
  "Mission Chapter 1",
  "Vikram",
  "Ponniyin Selvan: Part 2",
  "Vaadivaasal",
  "Maharaja",
  "Irumbu Kai Maayavi",
  "Maveeran Kittu 2",
  "Vichithiran",
  "Kuttrame Thandanai 2",
  "RDX",
  "Narakasura",
  "Kanguva",
  "Tamilarasan",
  "Kaalaivanam",
];

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = suggestionsList
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div
      className="w-full h-max absolute z-50  text-white bg-purple-200/6 rounded-md outline-2 outline-white/20 
        outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all 
        duration-200  focus:outline-none active:opacity-100 flex flex-col overflow-clip"
    >
      <div className="seach-input-container flex flex-row justify-start items-center gap-3 p-0 md:px-6 md:py-3 ">
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
            className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
          {inputValue.length === 0 && <FlippingText />}
        </div>
      </div>
      {showSuggestions && (
        <ul className="w-full z-50">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              typeof="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-3 text-white cursor-pointer hover:bg-[#7349AD] transition-all"
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
