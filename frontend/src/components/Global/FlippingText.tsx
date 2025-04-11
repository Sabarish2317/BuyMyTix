import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["Movies", "Concerts", "Sports", "Shows", "and more"]; // Words to cycle through

const FlippingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      className="motion-div  text-white/80  absolute top-1/2 -translate-y-1/2 
           text-[clamp(16px,2vw,21px)] font-medium pointer-events-none "
    >
      Search for{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]} // Re-render when word changes
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block "
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default FlippingText;
