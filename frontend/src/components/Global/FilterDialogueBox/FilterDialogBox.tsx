import { motion } from "motion/react";
import React, { useState } from "react";
import { ANIMATION_DURATION } from "../../../utils/constants";
import DynamicOptions from "./Components/DynamicOptions";

const popUpVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 56 },
  exit: { opacity: 0, y: -10 },
};

interface FilterDialogBoxProps {
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterDialogBox: React.FC<FilterDialogBoxProps> = ({
  setToggleDialogueBox,
}) => {
  const [selected, setSelected] = useState("");
  const [option, setOption] = useState(1);
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
      className="main-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 w-screen h-screen bg-white/2 backdrop-blur-sm flex justify-center items-center overflow-clip mt-4 "
      //didnnt use childrens direcly as exit animations didnt work i dont know why
    >
      <div className="w-max p-4 bg-black  rounded-xl  flex flex-col items-center gap-3 overflow-hidden mb-32 ">
        {/* header */}
        <div className="title-and-close-button w-full flex justify-between h-min items-center">
          <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            Filter
          </h2>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>
        <div className="main-content flex flex-row w-max gap-5 transition-all">
          {/* static left side */}
          <div className="left-side flex flex-col gap-6 min-w-[120px] md:min-w-[200px] lg:min-w-[300px] ">
            <div className="title-&-reset-button w-full flex flex-row justify-between ">
              <h2 className="text-white text-[clamp(20px,2vw,24px)] font-regular ">
                Filter by
              </h2>
              <h3 className="primary text-[clamp(20px,2vw,24px)] font-semibold ">
                Reset
              </h3>
            </div>
            {/* buttons container */}
            <div className="buttons-contaienr flex flex-col gap-4">
              <button
                onClick={() => setOption(1)}
                style={{
                  backgroundColor:
                    option === 1 ? "#DC3912" : "rgba(255, 255, 255, 0.1)",
                }}
                className="flex p-3 bg-white/10 text-white rounded-sm text-[clamp(20px,2vw,24px)] font-semibold scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200 ease-in-out"
              >
                Location
              </button>
              <button
                onClick={() => setOption(2)}
                style={{
                  backgroundColor:
                    option === 2 ? "#DC3912" : "rgba(255, 255, 255, 0.1)",
                }}
                className="flex p-3 bg-white/10 text-white rounded-sm text-[clamp(20px,2vw,24px)] font-semibold scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-300 ease-in-out"
              >
                Ticket Type
              </button>
              <button
                onClick={() => setOption(3)}
                style={{
                  backgroundColor:
                    option === 3 ? "#DC3912" : "rgba(255, 255, 255, 0.1)",
                }}
                className="flex p-3 bg-white/10 text-white rounded-sm text-[clamp(20px,2vw,24px)] font-semibold scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200 ease-in-out"
              >
                Language
              </button>
              <button
                onClick={() => setOption(4)}
                style={{
                  backgroundColor:
                    option === 4 ? "#DC3912" : "rgba(255, 255, 255, 0.1)",
                }}
                className="flex p-3 bg-white/10 text-white rounded-sm text-[clamp(20px,2vw,24px)] font-semibold scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200 ease-in-out"
              >
                Date range
              </button>
            </div>
          </div>
          {/* divider */}
          <div className="divider w-1 min-h-full">
            <h1 className="opacity-0">dummy</h1>
          </div>
          {/* dynamic right side  */}
          <div className="sort-filter-with-dynamic-optins flex flex-col gap-6 min-w-[130px] md:min-w-[300px] lg:min-w-[400px] ">
            <div className="title-&-reset-button w-full flex flex-row gap-2 items-center ">
              <h2 className="text-white text-[clamp(20px,2vw,24px)] font-regular w-max">
                Sort by
              </h2>
              <select
                id="dropdown"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border rounded primary text-[clamp(20px,2vw,24px)] font-semibold w-max border-none"
              >
                <option value="option1">Relevance</option>
                <option value="option2">Low to high</option>
                <option value="option3">High to low</option>
              </select>
              {/* buttons container */}
            </div>
            <DynamicOptions option={option} />
          </div>
        </div>
        {/* apply button */}
        <button
          onClick={() => setToggleDialogueBox(false)}
          className="w-full px-6 py-3.5 bg-white rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-black text-xl font-medium leading-7">
            Apply filters
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default FilterDialogBox;
