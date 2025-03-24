import { useState } from "react";
import FlippingText from "../../utils/FlippingText";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="relative w-full h-max my-4">
      <input
        type="text"
        onFocus={() => setInputValue(" ")}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder=""
        className="w-full px-3 py-2 md:px-6 md:py-3 text-white bg-white/5 rounded-md outline-2 outline-white/20 outline-offset-[-2px]
      backdrop-blur-[145.40px] text-[clamp(16px,2vw,24px)] font-medium 
       transition-all duration-200 
    focus:outline-none  active:opacity-100  pr-12" // Added padding-right for icon
      />
      <div className="row flex flex-row justify-between px-1.5">
        {/* Show Flipping Text when Input is Empty */}
        <img
          src="/icons/search.svg"
          alt="search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 origin-right scale-80 md:scale-100 hover:scale-105  transition-all duration-200 active:scale-110 active:scale-3d cursor-pointer"
        />
        {inputValue.length === 0 && <FlippingText />}
      </div>
    </div>
  );
};

export default SearchBar;
