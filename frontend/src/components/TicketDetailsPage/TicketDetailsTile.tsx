import React from "react";

interface TicketDetailsTileProps {
  imgUrl: string;
  time: string;
  date: string;
  title: string;
  venue: string;
  city: string;
  language: string;
  ticketQuant: string;
  callback: () => void;
}

const TicketDetailsTile: React.FC<TicketDetailsTileProps> = ({
  imgUrl,
  time,
  date,
  callback,
  language,
  ticketQuant,
  title,
  venue,
  city,
}) => {
  return (
    <div
      onClick={callback}
      className="w-full h-full bg-white/5 rounded-lg outline-1 outline-white/20 backdrop-blur-lg flex justify-between items-stretch 
    hover:bg-white/10 hover:outline-2 hover:outline-white/30 hover:cursor-pointer transition-all duration-200 ease-in-out"
    >
      {/* Left Section - Movie Details */}
      <div className="left-side flex items-center gap-4 ">
        {/* Movie Poster */}
        <img
          className="w-20 h-30 bg-cover rounded-l-lg"
          src={imgUrl}
          alt={title}
        />

        {/* Movie Info */}
        <div className="flex flex-col gap-1.5 leading-tight">
          {/* Date & Time */}
          <div className="text-[#DC3912] text-[clamp(12px,1.5vw,18px)] font-medium">
            {`${date} , ${time}`}
          </div>

          {/* Movie Title and Language */}
          <div className="flex items-center gap-2">
            <h2 className="text-white text-[clamp(20px,2vw,28px)] font-bold">
              {title}
            </h2>
            <span className="text-white text-[clamp(16px,1.5vw,20px)] font-medium">
              ({language})
            </span>
          </div>

          {/* Cinema Details */}
          <div className="text-white/80 text-[clamp(16px,1.5vw,20px)]">
            {`${venue} , ${city}`}
          </div>
        </div>
      </div>

      {/* Right Section - Tickets Button */}
      <div className="right-side flex flex-col items-center justify-center gap-2 px-4 bg-[#ffffff2b] rounded-r-lg min-h-full text-white ">
        <h1 className="text-[clamp(16px,1.5vw,20px)] font-semibold ">
          {"₹180"}{" "}
          <span className="text-[clamp(12px,1vw,16px)] font-light">
            (Per ticket)
          </span>
        </h1>
        <div className="tickets-quant flex flex-row gap-2">
          <img className="rotate-45 w-4" src="/images/ticket.svg" alt="" />
          <h2 className="text-[clamp(12px,1vw,16px)] font-regular">
            {ticketQuant} Tickets
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsTile;
