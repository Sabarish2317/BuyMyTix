import React from "react";
import { motion } from "motion/react";

const LoadingTitlesCard: React.FC = () => {
  return (
    <div className="detail-card-container flex flex-col items-center cursor-default animate-pulse min-w-25 md:min-w-30 lg:min-w-35">
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        className="w-[clamp(80px,10vw,140px)] aspect-[2/3] bg-zinc-700 rounded-lg"
      />
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="mt-2 h-4  bg-zinc-700 rounded-sm"
      />
    </div>
  );
};

export default LoadingTitlesCard;
