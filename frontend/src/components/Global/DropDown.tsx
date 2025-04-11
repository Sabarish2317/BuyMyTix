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

