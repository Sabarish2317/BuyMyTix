import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDivider from "../../utils/Divider";
import { AnimatePresence, motion } from "framer-motion";
import { LOGIN_PAGE } from "../../utils/routing";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/home");
    }, 1500); // waiting for animation to finish
    console.log({ email, password, confirmPassword });
  };

  return (
    <div className="w-full self-center">
      {/* Welcome Text */}
      <div className="flex-col justify-center items-center self-center">
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="bg-[#402283]"
              initial={{
                position: "absolute",
                top: "75%",
                left: "50%",
                x: "-50%",
                width: "100%",
                height: 48,
                scale: 0.8,
                borderRadius: "0.375rem",
                zIndex: 52,
                opacity: 0,
                backdropFilter: "blur(10px)",
              }}
              animate={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "300vw",
                height: "300vh",
                scale: 1,
                zIndex: 52,
                opacity: 1,
                backdropFilter: "blur(50px)",
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            />
          )}
        </AnimatePresence>

        <div className="text-center">
          <span className="text-[#dc3912] text-[clamp(18px,1.5vw,28px)] font-black leading-0">
            Create
          </span>
          <span className="text-white text-[clamp(18px,1.5vw,28px)] font-black leading-0">
            {" "}
            Account
          </span>
        </div>
        <div className="self-stretch text-center text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium tracking-wide leading-3 sm:leading-3 md:leading-4 lg:leading-5 pb-3">
          Sign up for your BuyMyTix account
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        {/* Email Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Email
          </label>
          <div className="w-full px-3 py-[14px] rounded-md border-2 border-white/50 flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Password
          </label>
          <div className="w-full px-3 py-[14px] rounded-md border-2 border-white/50 flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/60 text-[clamp(14px,1.5vw,18px)] cursor-pointer"
            >
              <img
                src={`${
                  showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"
                }`}
                alt="eye"
              />
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Confirm Password
          </label>
          <div className="w-full px-3 py-[14px] rounded-md border-2 border-white/50 flex items-center justify-between">
            <input
              type={"password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="px-6 py-3 w-full bg-white/90 text-black text-[clamp(14px,1.5vw,18px)] cursor-pointer font-medium rounded-md relative overflow-hidden
          hover:bg-white transition-all duration-400 ease-in-out hover:scale-3d hover:scale-105"
          whileTap={{ scale: 0.98 }}
          disabled={isAnimating}
        >
          Sign Up
        </motion.button>

        {/* Or Divider */}
        <div className="flex items-center justify-center gap-2">
          <MyDivider />
          <div className="text-white/80 text-[clamp(12px,1.3vw,16px)] font-medium">
            Or
          </div>
          <MyDivider />
        </div>

        {/* Sign Up with Google */}
        <button
          type="button"
          className="px-6 py-3 w-full bg-black text-white text-[clamp(14px,1.5vw,18px)] font-medium rounded-md cursor-pointer"
        >
          Sign Up with Google
        </button>

        {/* Log In Link */}
        <div className="text-center text-white/80 text-[clamp(12px,1.2vw,16px)]">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-white transition-all duration-100 ease-in-out"
            onClick={() => navigate(`${LOGIN_PAGE}`)}
          >
            Log In
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
