import { motion } from "motion/react";
import React, { useState } from "react";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Global/SearchBar";

const HeroButtons: React.FC = () => {
  const navigate = useNavigate();
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
          className="px-4 py-2 md:px-6 md:py-3 text-white bg-[#ff3300] rounded-md   backdrop-blur-[145.40px] justify-center items-center gap-2.5 flex
           text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
        >
          Sell your tickets
        </button>

        {/* Buy Now Button */}
        <button
          onClick={() => navigate("/home:id=1")}
          className="px-4 py-2 md:px-6 md:py-3 text-black bg-white rounded-md justify-center items-center gap-2.5 flex
      text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
        >
          Buy now
        </button>
      </div>
      {/* search button*/}
      <div className="relative w-full h-max ">
        <motion.div
          initial={{ opacity: 1, y: MOVEMENT_DISTANCE }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: [
              "inset 0px -25px 94px 7px rgba(128,80,175,1.00), 0px -25px 94px 7px rgba(128,80,175,1.00)", // Start
              "inset 0px -15px 80px 10px rgba(128,80,175,0.8), 0px -15px 80px 10px rgba(128,100,175,0.8)", // Wave Up
              "inset 0px -30px 100px 5px rgba(128,80,175,1.1), 0px -30px 100px 5px rgba(128,100,175,1.1)", // Wave Down
              "inset 0px -25px 94px 7px rgba(128,80,175,1.00), 0px -25px 94px 7px rgba(128,80,175,1.00)", // Back to Start
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-[3528.60px] h-[941.24px] bg-black rounded-[50%]
             absolute left-1/2 -translate-x-1/2
             top-6 md:top-4 lg:2
             pointer-events-none"
        />

        <SearchBar type="movie" />
      </div>
    </motion.div>
  );
};

export default HeroButtons;
