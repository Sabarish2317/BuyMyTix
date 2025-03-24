import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "../../utils/constants";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  isHomePage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  const parentRef = useRef<HTMLDivElement>(null); // Reference to parent container
  return (
    <div
      ref={parentRef}
      className={`main-entry-point w-full h-screen flex flex-col items-center relative overflow-scroll overflow-x-clip  
                 bg-gradient-to-b from-black via-[#402283] via-50% to-[#9f64da] ${className}`}
    >
      {/* Noise Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: ANIMATION_DURATION * 6,
          delay: ANIMATION_DURATION * 1,
          ease: "easeOut",
        }}
        className="absolute z-10 inset-0 pointer-events-none opacity-50 mix-blend-multiply "
        style={{
          backgroundImage: "url('/images/noise-overlay.png')",
          backgroundSize: "fit",
          backgroundRepeat: "repeat",
        }}
      ></motion.div>

      {/* Wrapper for Page Content */}
      <div className="wrapper w-full flex flex-col max-w-[1490px]  px-4 md:px-6 lg:px-[42px] z-50 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
