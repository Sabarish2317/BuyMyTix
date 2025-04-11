import React from "react";
import { motion } from "framer-motion";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";

const HeroSection: React.FC = () => {
  return (
    <div className="h-max justify-start items-center flex flex-col mt-6 gap-2 md:gap-0 pointer-events-none select-none">
      <div className="text-center leading-[30px] md:leading-[40px] lg:leading-[50px] uppercase pointer-events-none select-none">
        <motion.span
          initial={{ opacity: 0, x: -MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: ANIMATION_DURATION,
            ease: "easeOut",
          }}
          className=" text-white text-[clamp(22px,4vw,48px)] font-black font-['Satoshi Variable'] [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)] inline-block"
        >
          Missed out ?{" "}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: ANIMATION_DURATION * 2,
            ease: "easeOut",
          }}
          className="pl-2 text-[#dc3912] text-[clamp(22px,4vw,48px)] font-bold font-['Satoshi Variable'] [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)] inline-block"
        >
          Find Tickets.
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, x: -MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: ANIMATION_DURATION * 3,
            ease: "easeOut",
          }}
          className="text-white text-[clamp(22px,4vw,48px)] font-black font-['Satoshi Variable'] [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)] inline-block"
        >
          {"  "}Can't Go ?{" "}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: ANIMATION_DURATION * 4,
            ease: "easeOut",
          }}
          className="pl-2 text-[#dc3912] text-[clamp(22px,4vw,48px)] font-bold font-['Satoshi Variable'] [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)] inline-block"
        >
          {" "}
          Sell your tickets.
        </motion.span>
      </div>
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
      </motion.div>
    </div>
  );
};

export default HeroSection;
