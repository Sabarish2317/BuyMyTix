import { motion } from "motion/react";
import React, { useState } from "react";
import { ANIMATION_DURATION } from "../../utils/constants";

const popUpVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 56 },
  exit: { opacity: 0, y: -10 },
};

interface LocationDialogBoxProps {
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationDialogBox: React.FC<LocationDialogBoxProps> = ({
  setToggleDialogueBox,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION * 2,
        ease: "easeOut",
      }}
      className="main-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 w-screen h-screen bg-white/2 backdrop-blur-sm flex justify-center items-center overflow-clip mt-4"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div className="w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 overflow-hidden mb-32 ">
        <div className="w-full flex justify-between h-min items-center">
          <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            Location
          </h2>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <h3 className="text-red-600 text-xl font-bold leading-7">
            Select new location
          </h3>

          <div className="w-full h-16 px-6 py-4 bg-white/10 rounded-lg backdrop-blur-[81.60px] flex justify-between items-center overflow-hidden">
            <img src="/icons/search.svg" />
            <input
              type="text"
              onFocus={() => setInputValue(" ")}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Coimbatore,Tamil Nadu"
              className="items-center gap-4 text-white text-xl font-normal leading-7 w-full self-start pl-4"
            ></input>
          </div>
        </div>

        <button
          onClick={() => setToggleDialogueBox(false)}
          className="w-full px-6 py-3.5 bg-white rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-black text-xl font-medium leading-7">
            Change location
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default LocationDialogBox;
