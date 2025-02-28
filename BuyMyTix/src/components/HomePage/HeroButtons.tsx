import React from "react";

const HeroButtons: React.FC = () => {
  return (
    <div className="buttons-container justify-center items-center gap-3 md:gap-4 flex flex-row">
      {/* Sell Tickets Button */}
      <button
        className="px-4 py-2 md:px-6 md:py-4 text-white bg-white/5 rounded-md border-2 border-white/20 backdrop-blur-[145.40px] justify-center items-center gap-2.5 flex
           text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
      >
        Sell your tickets
      </button>

      {/* Buy Now Button */}
      <button
        className="px-4 py-2 md:px-6 md:py-4 text-black bg-white rounded-md justify-center items-center gap-2.5 flex
      text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
      >
        Buy now
      </button>
    </div>
  );
};

export default HeroButtons;
