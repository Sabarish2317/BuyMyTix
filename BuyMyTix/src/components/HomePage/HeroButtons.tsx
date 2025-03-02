import { motion } from "motion/react";
import React, { useState } from "react";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import FlippingText from "../../utils/FlippingText";

const HeroButtons: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 6,
        ease: "easeOut",
      }}
      className="buttons-container self-center w-max justify-center items-center gap-3 md:gap-4 flex flex-col"
    >
      <div className="buttons-container buttons-container justify-center items-center gap-3 md:gap-4 flex flex-row">
        {/* Sell Tickets Button */}
        <button
          className="px-4 py-2 md:px-6 md:py-3 text-white bg-white/5 rounded-md border-2 border-white/20 backdrop-blur-[145.40px] justify-center items-center gap-2.5 flex
           text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
        >
          Sell your tickets
        </button>

        {/* Buy Now Button */}
        <button
          className="px-4 py-2 md:px-6 md:py-3 text-black bg-white rounded-md justify-center items-center gap-2.5 flex
      text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
        >
          Buy now
        </button>
      </div>
      {/* search button*/}
      <div className="relative w-full  ">
        <motion.div
          initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_DURATION * 2,
            delay: ANIMATION_DURATION * 7,
            ease: "easeOut",
          }}
          className="w-[3528.60px] h-[941.24px] bg-black rounded-[50%]
                           shadow-[0px_-25px_94px_7px_rgba(128,80,175,1.00)]
                           absolute left-1/2 -translate-x-1/2
                            top-1/4 md:top-1/3 lg:top-1/2
                           pointer-events-none"
          style={{
            boxShadow:
              "inset 0px -25px 94px 7px rgba(128,80,175,1.00), 0px -25px 94px 7px rgba(128,80,175,1.00)",
          }}
        />
        <input
          type="text"
          onFocus={() => setInputValue(" ")}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder=""
          className="w-full px-4 py-2 md:px-6 md:py-3 text-white bg-white/5 rounded-md border-2 border-white/20 
      backdrop-blur-[145.40px] text-[clamp(16px,2vw,24px)] font-medium 
      hover:scale-95  transition-all duration-200 
      focus:outline-none focus:scale-105 active:opacity-100 pr-12" // Added padding-right for icon
        />
        {/* Show Flipping Text when Input is Empty */}
        {inputValue.length === 0 && <FlippingText />}
        <img
          src="/icons/search.svg"
          alt="search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6  hover:scale-105  transition-all duration-200 active:scale-110 active:scale-3d cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default HeroButtons;
