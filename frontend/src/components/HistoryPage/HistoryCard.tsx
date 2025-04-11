import React from "react";

interface HistoryCarcProps {}

const HistoryCarc: React.FC<HistoryCarcProps> = ({}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg w-full max-w-full flex flex-row items-center gap-6 p-2 overflow-hidden opacity-">
      <div className="aspect-[3/4]  min-h-full relative overflow-clip">
        <img
          src="/images/vidamuyarchi.png"
          className="h-full w-full object-cover rounded-lg relative "
          alt="Poster"
        />
        <div
          className="expired absolute top-1/2 left-0 w-full bg-white/10 text-center justify-center backdrop-blur-sm flex py-2 px-4
         text-[clamp(12px,1.2vw,16px)] font-semibold text-white"
        >
          Expired
        </div>
      </div>

      <div className="right-side flex flex-col gap-2">
        <div className="title-and-details flex flex-col itmes-start gap-0">
          <h3 className="text-[#DC3912]  text-[clamp(16px,2vw,22px)] font-bold">
            Vidamuyarchi (U/A)
          </h3>
          <div className="flex gap-2 text-white  text-[clamp(16px,2vw,20px)] font-medium">
            <span>Tamil</span>
            <span>|</span>
            <span>2D</span>
            <span>|</span>
            <span>Screen-2</span>
          </div>
        </div>
        {/* Seat and Ticket Price */}

        {/* venue and date
         */}
        <div className="venuce-and-datetext-center w-full flex flex-col items-start gap-0 ">
          <div className="text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
            Murugan Cinemas, Coimbatore
          </div>
          <div className="text-white/80 text-[clamp(16px,2vw,20px)] font-regular">
            Friday, 23 Apr, 09:00 AM
          </div>
          <button className="text-white/60 text-[clamp(16px,2vw,20px)]  underline cursor-pointer  scale-3d hover:scale-105 hover:text-white active:opacity-80 transition-all duration-200 ease-in-out">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCarc;
