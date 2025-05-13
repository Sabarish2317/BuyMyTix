import React from "react";
import { AddTitlesRequest } from "../../../types/Titles";
import { Ticket } from "../../../types/Ticket";
import { SearchBarWhite } from "../../Global/SearchBarAll";

interface PageOneProps {
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageOne: React.FC<PageOneProps> = ({
  setTitlesData,
  toggleDialogBox,
  setTicketData,
  titlesData,
  ticketData,
}) => {
  return (
    <>
      <div className="title-and-close-button-container w-full flex justify-between h-min items-start">
        <div className="text-center justify-start items-start flex flex-col">
          <h2 className="text-white text-[clamp(20px,2vw,24px)] uppercase font-black">
            Create A Post
          </h2>
          <h3 className="text-white  text-[clamp(16px,1.5vw,20px)]">
            Choose {titlesData.type}
          </h3>
        </div>
        <img
          className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
          onClick={() => toggleDialogBox(false)}
          src={"/icons/close-icon.svg"}
          alt="close"
        />
      </div>

      <SearchBarWhite
        ticketData={ticketData}
        titlesData={titlesData}
        setTitlesData={setTitlesData}
        setTicketData={setTicketData}
      />
    </>
  );
};

export default PageOne;
