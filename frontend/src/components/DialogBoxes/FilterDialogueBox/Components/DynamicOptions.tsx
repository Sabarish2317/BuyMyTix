import React, { useEffect, useState } from "react";
import { SearchBar } from "../../../Global/SearchBarAll";

interface DynamicOptionsProps {
  option: number;
}

const DynamicOptions: React.FC<DynamicOptionsProps> = ({ option }) => {
  // for type
  const [selectedType, setSelectedType] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  // for date picker
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7);

    setFromDate(today.toISOString().split("T")[0]); // Today's date
    setToDate(futureDate.toISOString().split("T")[0]); // 7 days later
  }, []);

  switch (option) {
    // search bar
    case 1:
      return (
        <div className="margin relative my-4 h-[56px]">
          <SearchBar type="city" />
        </div>
      );
    case 2:
      return (
        <div className="ticker-options  gap-6 option-2 text-[clamp(20px,2vw,24px)] font-semibold text-white flex flex-col justify-center items-start">
          {["Movie", "Concert", "Event"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-white font-medium"
            >
              <input
                type="radio"
                name="ticket-type"
                value={type}
                checked={selectedType === type}
                onChange={handleChange}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center peer-checked:border-[#611002] peer-checked:bg-[#DC3912] peer-checked:border-4 transition-all duration-200 ease-in-out"></div>
              {type}
            </label>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="language-options-container flex flex-row gap-4 items-start">
          {/* vena grid potuko 2 columns bathil */}
          <div className="ticker-options  gap-6 option-2 text-[clamp(20px,2vw,24px)] font-semibold text-white flex flex-col justify-center items-start">
            {["Tamil", "English", "Telugu", "Kannada"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer text-white font-medium"
              >
                <input
                  type="radio"
                  name="ticket-type"
                  value={type}
                  checked={selectedType === type}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center peer-checked:border-[#611002] peer-checked:bg-[#DC3912] peer-checked:border-4 transition-all duration-200 ease-in-out"></div>
                {type}
              </label>
            ))}
          </div>
          <div className="ticker-options  gap-6 text-[clamp(20px,2vw,24px)] font-semibold text-white flex flex-col justify-center items-start">
            {["Konkani", "Malayalam", "Hindi"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer text-white font-medium"
              >
                <input
                  type="radio"
                  name="ticket-type"
                  value={type}
                  checked={selectedType === type}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center peer-checked:border-[#611002] peer-checked:bg-[#DC3912] peer-checked:border-4 transition-all duration-200 ease-in-out"></div>
                {type}
              </label>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="date-pickers-container flex flex-col items-start justify-start gap-3 transition-all duration-200 ease-in-out">
          {[
            { label: "From", value: fromDate, setValue: setFromDate },
            { label: "To", value: toDate, setValue: setToDate },
          ].map(({ label, value, setValue }) => (
            <div
              key={label}
              className="date-picker flex flex-col gap-1 items-start"
            >
              <label
                className="text-[clamp(16px,1.5vw,20px)] font-regular text-white"
                htmlFor={label}
              >
                {label}
              </label>
              <input
                className="text-[clamp(20px,2vw,24px)] font-regular text-white border-2 rounded-md border-[#AB2302] py-3 px-4 bg-transparent"
                type="date"
                name={label}
                id={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          ))}
        </div>
      );
  }
};

export default DynamicOptions;
