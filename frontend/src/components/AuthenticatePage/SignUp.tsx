import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDivider from "../Global/Divider";
import { AnimatePresence, motion } from "framer-motion";
import { LOGIN_PAGE } from "../../routes/appRoutes";
import { useMutation } from "@tanstack/react-query";
import { checkIsEmailAvailable } from "../../queries/SignUp";
import { SignUpRequest } from "../../types/SignUp";
import AddProfileDialogBox from "./AddProfileDetailsDialogBox";
import GoogleAuthButton from "./googleOauthButton";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileDialogBoxVisible, setShowProfileDetailsDialog] =
    useState(false);
  const toggleProfileDialogueBox = () => {
    setShowProfileDetailsDialog((prev) => !prev);
  };
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [form, setForm] = useState<SignUpRequest>({
    name: "",
    email: "",
    phone: "",
    profileImage: {
      data: "",
      contentType: "",
    },
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmailMutation = useMutation({
    mutationFn: checkIsEmailAvailable,
    onSuccess: () => {
      toggleProfileDialogueBox();
    },
    onError: (err: any) => {
      setErr(err.message);
    },
  });
  const { isPending } = checkEmailMutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); // Clear old errors

    if (!form.email) return setErr("Email is required");
    if (!form.password || !form.confirmPassword)
      return setErr("Password is required");
    if (form.password !== form.confirmPassword)
      return setErr("Passwords do not match");
    checkEmailMutation.mutate(form.email);
  };

  return (
    <div className="w-full self-center">
      <AnimatePresence mode="wait">
        {isProfileDialogBoxVisible && (
          <AddProfileDialogBox
            setIsAnimating={setIsAnimating}
            form={form}
            setForm={setForm}
            setToggleDialogueBox={toggleProfileDialogueBox}
          />
        )}
      </AnimatePresence>

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
                width: "300vw",
                height: "300vh",
                scale: 1,
                zIndex: 52,
                opacity: 1,
                backdropFilter: "blur(50px)",
              }}
              transition={{
                duration: 2,

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

        {/* Error container */}
        <div
          className={`self-stretch text-center text-white text-[clamp(14px,1.5vw,18px)] font-medium tracking-wide leading-3 sm:leading-3 md:leading-4 lg:leading-5 pb-3 transition-all duration-200 ease-in-out
            "text-white/80"}`}
        >
          Sign up for your BuyMyTix account
        </div>
        {err && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-[#dc3912] font-medium px-4 py-2 rounded-md mb-3 text-center"
          >
            {err}
          </motion.div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        {/* Email Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Email
          </label>
          <motion.div
            initial={false}
            animate={{
              x: err ? [-20, 0] : 0,
              borderColor: err ? "#dc3912" : "rgba(255,255,255,0.5)",
            }}
            transition={{
              duration: 0.1,
              ease: "backInOut",
            }}
            className="w-full px-3 py-[14px] rounded-md border-2 flex items-center justify-between"
          >
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="m@example.com"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </motion.div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Password
          </label>
          <motion.div
            initial={false}
            animate={{
              x: err ? [-20, 0] : 0,
              borderColor: err ? "#dc3912" : "rgba(255,255,255,0.5)",
            }}
            transition={{
              duration: 0.1,
              ease: "backInOut",
            }}
            className="w-full px-3 py-[14px] rounded-md border-2 flex items-center justify-between"
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
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
          </motion.div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Confirm Password
          </label>
          <motion.div
            initial={false}
            animate={{
              x: err ? [-20, 0] : 0,
              borderColor: err ? "#dc3912" : "rgba(255,255,255,0.5)",
            }}
            transition={{
              duration: 0.1,
              ease: "backInOut",
            }}
            className="w-full px-3 py-[14px] rounded-md border-2 flex items-center justify-between"
          >
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`px-6 py-3 w-full bg-white/90 text-black text-[clamp(14px,1.5vw,18px)] cursor-pointer font-medium rounded-md relative overflow-hidden
          hover:bg-white transition-all duration-400 ease-in-out hover:scale-3d hover:scale-105 `}
          whileTap={{ scale: 0.98 }}
          disabled={isAnimating}
        >
          {isPending ? "Signing Up..." : "Sign Up"}
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
        <GoogleAuthButton name="Sign up" />
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
