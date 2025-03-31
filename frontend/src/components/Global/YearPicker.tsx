import React from "react";

interface YearPickerProps {
    year : string;
    setYear : 
}

const YearPicker: React.FC<YearPickerProps> = ({}) => {
  return (
    <div className="date-picker flex flex-col gap-1 items-start w-full min-w-60">
      <label
        className="text-white text-[clamp(20px,1.4vw,24px)] font-bold "
        htmlFor="year"
      >
        Select Year
      </label>
      <input
        className="w-full min-w-60 pl-4 pr-3 py-4 bg-white rounded-lg outline-2 outline-white 
             inline-flex justify-start items-center gap-2 text-black focus:outline-none "
        type="date"
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
    </div>
  );
};

export default YearPicker;
