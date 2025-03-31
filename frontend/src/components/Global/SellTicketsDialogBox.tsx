import { motion } from "motion/react";
import React, { useState } from "react";
import { ANIMATION_DURATION } from "../../utils/constants";


const popUpVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 56 },
  exit: { opacity: 0, y: -10 },
};

interface SellTicketDialogBoxProps {
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
  callBackToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const SellTicketDialogBox: React.FC<SellTicketDialogBoxProps> = ({
  setToggleDialogueBox,
  callBackToggle,
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
      className="main-container-with-blur fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 w-screen h-screen bg-white/2 backdrop-blur-sm flex justify-center items-center  mt-4"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div className="dialogue-box w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 overflow-hidden mb-32 ">
        <div className="title-and-close-button-container w-full flex justify-between h-min items-center">
          <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            Guide to sell ?
          </h2>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>

        <img
          src="/images/sell-instructions.svg"
          alt="details"
          className="pointer-events-none"
        />

        <button
          onClick={() => {
            setToggleDialogueBox(false);
            setTimeout(() => {
              callBackToggle(true);
            }, 200);
          }}
          className="w-full px-6 py-3.5 bg-white text-black rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 hover:bg-[#DC3912] hover:text-white active:opacity-100 transition-all duration-200"
        >
          <span className="text-xl font-medium leading-7">Start Selling</span>
        </button>
      </div>
    </motion.div>
  );
};

export default SellTicketDialogBox;
