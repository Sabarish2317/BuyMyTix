import React, { useEffect } from "react";
import { AddTitlesRequest } from "../../../types/Titles";
import Dropdown from "../../Global/DropDown";
import Input from "../../Global/Input";

interface PageZeroProps {
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageZero: React.FC<PageZeroProps> = ({
  setTitlesData,
  toggleDialogBox,
}) => {
  const [ticketType, setSelectedType] = React.useState("Movie");
  const [bmsUrl, setBmsUrl] = React.useState("");

  //Changes the data selected on the drop down into the upper state of SetTitlesData
  useEffect(() => {
    setTitlesData((prev) => ({ ...prev, type: ticketType }));
  }, [ticketType]);

  return (
    <>
      <div className="title-and-close-button-container w-full flex justify-between h-min items-start">
        <div className="text-center justify-start items-center flex flex-col">
          <span className="text-white text-[clamp(20px,2vw,24px)] uppercase font-black">
            Create A{" "}
            <span className="text-red-600 text-[clamp(20px,2vw,24px)] uppercase font-black">
              post
            </span>
          </span>
          <h3 className="text-white text-[clamp(16px,1.5vw,20px)]">
            Select the ticket type
          </h3>
        </div>
        <img
          className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
          onClick={() => toggleDialogBox(false)}
          src="/icons/close-icon.svg"
          alt="close"
        />
      </div>
      <Dropdown
        heading="Ticket Type"
        options={["Movie", "Sport", "Event"]}
        selectedOption={ticketType}
        setSelectedOption={setSelectedType}
      />
      {/* //tmeporatily not used */}
      <Input
        intputValue={bmsUrl}
        setInputValue={setBmsUrl}
        title="BMS M-Ticket url (optional)"
        placeholder="Url"
      />
      <div className="w-full h-max justify-center py-2">
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          Paste the{" "}
        </span>
        <span className="text-red-600 text-[clamp(16px,1.4vw,20px)] font-bold">
          BMS ticket url{" "}
        </span>
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          to{" "}
        </span>
        <span className="text-red-600 text-[clamp(16px,1.4vw,20px)] font-bold">
          auto fill {""}
        </span>
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          the details. The parsing is local to your computer. We don't store any
          sensitive information.
        </span>
      </div>
    </>
  );
};

export default PageZero;
