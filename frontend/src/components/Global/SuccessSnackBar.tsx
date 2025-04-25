import { motion } from "motion/react";
import React from "react";

interface SuccessSnackBarProps {
  SuccessMessage: string;
}

const SuccessSnackBar: React.FC<SuccessSnackBarProps> = ({
  SuccessMessage,
}) => {
  return (
    <div className="flex flex-row  gap-3">
      <motion.img
        initial={{ x: 0, rotate: 0 }}
        animate={{ x: 4, rotate: 360 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-[32px]   bg-transparent "
        src="/icons/tick.svg"
        alt="Success"
      />

      <div
        className="text-white text-[clamp(16px,1.5vw,20px)] 
  font-semibold "
      >
        {SuccessMessage}
      </div>
    </div>
  );
};

export default SuccessSnackBar;
