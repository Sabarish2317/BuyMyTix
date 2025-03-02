import { motion } from "motion/react";
import React from "react";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";

const HeroButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 6,
        ease: "easeOut",
      }}
      className="buttons-container justify-center items-center gap-3 md:gap-4 flex flex-row"
    >
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
    </motion.div>
  );
};

export default HeroButtons;
<motion.div
  initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: ANIMATION_DURATION,
    delay: ANIMATION_DURATION * 5,
    ease: "easeOut",
  }}
  className="text-center text-white/80 text-[clamp(14px,1.9vw,24px)] font-medium font-['Satoshi Variable'] leading-[20px] md:leading-[50px] tracking-wide md:mt-[-10px] lg:mt-[-10px]"
>
  Connecting buyers and sellers for a seamless movie ticket exchange
</motion.div>;
