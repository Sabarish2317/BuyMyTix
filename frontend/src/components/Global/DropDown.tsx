import { useState } from "react";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  heading: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  heading,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full z-90">
      {/* Dropdown Button */}
      <div className="title-and-drop-down">
        <div className="self-stretch justify-start text-white text-[clamp(12px,1vw,16px)]  font-bold leading-loose ">
          {heading}
        </div>
        <div
          className="w-full px-3 py-3 bg-white rounded-sm outline-2 outline-white inline-flex justify-between items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption}</span>
          <img
            src="/icons/down-arrow-orange.svg"
            alt="Dropdown"
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-3 hover:bg-gray-200 transition-all cursor-pointer"
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

import { useEffect, useRef } from "react";

interface Dropdown2Props {
  options: string[];
  selectedOption: string;
  heading?: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown2: React.FC<Dropdown2Props> = ({
  options,
  selectedOption,
  setSelectedOption,
  heading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left z-[110] min-w-[100px] min-h-full"
    >
      <h2 className="text-[clamp(12px,1.5vw,16px)] font-bold text-white">
        {heading}
      </h2>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2  h-full text-white px-4 py-2 rounded-md cursor-pointer transition-all"
      >
        <span className="text-[clamp(16px,1.5vw,20px)]">{selectedOption}</span>
        <img
          src="/icons/down-arrow-orange.svg"
          alt="dropdown"
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 h-[300px] w-full bg-black/98 rounded-md shadow-lg border border-white/10 max-h-64 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 text-[clamp(12px,1vw,16px)] cursor-pointer hover:bg-white/10 transition-colors ${
                option === selectedOption
                  ? "text-[#DC3912] font-medium"
                  : "text-white"
              }`}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown2 };
