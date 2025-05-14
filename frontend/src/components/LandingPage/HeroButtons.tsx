import { motion } from "motion/react";
import React from "react";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { SearchBarDb } from "../Global/SearchBarDb";
import { HOME_PAGE } from "../../routes/appRoutes";

interface props {
  showSellDialogBoxInstruction: React.Dispatch<React.SetStateAction<boolean>>;
}
const HeroButtons: React.FC<props> = ({ showSellDialogBoxInstruction }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 6,
        ease: "easeOut",
      }}
      className="buttons-container self-center my-4 w-max justify-center items-center gap-3 md:gap-4 flex flex-col "
    >
      <div className="buttons-container buttons-container z-[99] justify-center items-center gap-3 md:gap-4 flex flex-row">
        {/* Sell Tickets Button */}
        <button
          onClick={() => showSellDialogBoxInstruction(true)}
          className="px-4 py-3 md:px-6 md:py-3 text-white bg-[#ff3300] rounded-md   backdrop-blur-[145.40px] justify-center items-center gap-2.5 flex
           text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100 cursor-pointer"
        >
          Sell your tickets
        </button>

        {/* Buy Now Button */}
        <button
          onClick={() => navigate(HOME_PAGE)}
          className="px-4 py-3 md:px-6 md:py-3 text-black bg-white rounded-md justify-center items-center gap-2.5 flex
      text-[clamp(16px,2vw,24px)] font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100 cursor-pointer"
        >
          Buy now
        </button>
      </div>
      {/* search button*/}
      <div className="relative w-full h-max items-center justify-center ">
        <motion.div
          initial={{ opacity: 1, y: MOVEMENT_DISTANCE }}
          animate={{
            willChange: "transform, filter",
            opacity: 1,
            y: 0,
            filter: [
              "drop-shadow(0px -25px 94px rgba(128,80,175,1.0))",
              "drop-shadow(0px -15px 80px rgba(128,100,175,0.8))",
              "drop-shadow(0px -50px 100px rgba(128,100,175,1.1))",
              "drop-shadow(0px -25px 94px rgba(128,80,175,1.0))",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-[4500.60px] h-[941.24px] bg-black  rounded-t-[100%]
             absolute left-1/2 -translate-x-1/2
             top-6 md:top-4 lg:2
             pointer-events-none "
        />

        <SearchBarDb />
      </div>
    </motion.div>
  );
};

export default HeroButtons;
