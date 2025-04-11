import { motion } from "motion/react";
import React from "react";

interface GlowingBallsProps {}

const GlowingBalls: React.FC<GlowingBallsProps> = ({}) => {
  const floatTransition = {
    y: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
    x: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const floatVariant = {
    animate: {
      y: [0, -20],
      x: [0, 30],
    },
  };
  const floatVariant2 = {
    animate: {
      y: [0, -10],
      x: [0, 15],
    },
  };
  const floatVariant3 = {
    animate: {
      y: [0, -45],
      x: [0, 15],
    },
  };
  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-y-10 py-10 px-4 z-50 ">
      {/* PostgreSQL */}
      <motion.div
        className="flex-1/2 mt-21 min-w-[40px] max-w-[280px] aspect-square -ml-10 bg-gradient-to-b from-white/10 to-neutral-800/10 rounded-full backdrop-blur-2xl flex items-center justify-center"
        variants={floatVariant}
        animate="animate"
        transition={floatTransition}
      >
        <span className="text-white/80 text-3xl font-bold">PostgreSql</span>
      </motion.div>

      {/* React JS */}
      <motion.div
        className="flex-2 min-w-[30px] max-w-[380px] aspect-square -ml-16 bg-gradient-to-br from-emerald-100/10 to-slate-500/10 rounded-full backdrop-blur-2xl flex items-center justify-center"
        variants={floatVariant2}
        animate="animate"
        transition={floatTransition}
      >
        <span className="text-white/80 text-3xl font-bold">React Js</span>
      </motion.div>

      {/* MongoDB */}
      <motion.div
        className="flex-1 min-w-[50px] max-w-[310px] aspect-square -ml-10 bg-gray-400/10 rounded-full backdrop-blur-2xl flex items-center justify-center"
        variants={floatVariant3}
        animate="animate"
        transition={floatTransition}
      >
        <span className="text-white/80 text-3xl font-bold">MongoDb</span>
      </motion.div>

      {/* Figma */}
      <motion.div
        className="flex-1 min-w-[30px] max-w-[300px] aspect-square -ml-14 bg-gray-400/10 rounded-full backdrop-blur-2xl flex items-center justify-center"
        variants={floatVariant2}
        animate="animate"
        transition={floatTransition}
      >
        <span className="text-white/80 text-3xl font-bold">Figma</span>
      </motion.div>

      {/* Flutter */}
      <motion.div
        className="flex-2 min-w-[260px] max-w-[360px] aspect-square -ml-20 bg-gradient-to-bl from-white/10 to-neutral-400/10 rounded-full backdrop-blur-2xl flex items-center justify-center"
        variants={floatVariant3}
        animate="animate"
        transition={floatTransition}
      >
        <span className="text-white/80 text-3xl font-bold">Flutter</span>
      </motion.div>
    </div>
  );
};

export default GlowingBalls;
