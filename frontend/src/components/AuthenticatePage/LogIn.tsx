import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDivider from "../Global/Divider";
import { AnimatePresence, motion } from "motion/react";
import { SIGNUP_PAGE } from "../../routes/appRoutes";
import { SignInRequest } from "../../types/SignIn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "../../queries/SignIn";
import GoogleAuthButton from "./googleOauthButton";
import ForgotPasswordDialogBox from "../DialogBoxes/ForgotPasswordDialogBox";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<SignInRequest>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isForgotPasswordDialogBoxVisible, SetForgotPasswordDialogBoxVisible] =
    useState(false);
  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: signInUser,
  });
  const { isError, error, isPending } = mutate;
  const queryClient = useQueryClient();
  //for login via email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate.mutate(form, {
      onSuccess: (responseData) => {
        setIsAnimating(true);
        if (!responseData.token) {
          return;
        }
        localStorage.setItem("token", responseData?.token);
        // ✅ Invalidate so profile gets fresh data on next render

        queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        setTimeout(() => navigate("/home"), 1000);
      },
    });
  };

  return (
    <div className="w-full h-min self-center">
      {/* Animation for successful login */}
      <AnimatePresence>
        {isForgotPasswordDialogBoxVisible && (
          <ForgotPasswordDialogBox
            email={form.email || ""}
            setToggleDialogueBox={SetForgotPasswordDialogBoxVisible}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isAnimating && (
          <>
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
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Welcome Text */}
      <div className="flex-col justify-center items-center ">
        <div className="text-center">
          <span className="text-[#dc3912] text-[clamp(18px,1.5vw,28px)] font-black leading-0">
            Welcome
          </span>
          <span className="text-white text-[clamp(18px,1.5vw,28px)] font-black leading-0">
            {" "}
            back
          </span>
        </div>
        <div className="self-stretch text-center text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium tracking-wide leading-3 sm:leading-3 md:leading-4 lg:leading-5 pb-3">
          Log in to your BuyMyTix account
        </div>

        {/* Display login error message */}

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-[#dc3912] font-medium px-4 py-2 rounded-md mb-3 text-center"
          >
            {error.message}
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
              x: isError ? [-20, 0] : 0,
              borderColor: isError ? "#dc3912" : "rgba(255,255,255,0.5)",
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
              onChange={hanldeChange}
              placeholder="m@example.com"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </motion.div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <div className="label-and-forgot-passsword-container flex flex-row w-full justify-between">
            <label className="text-white/80 text-[clamp(12px,1.2vw,16px)] font-medium">
              Password
            </label>
            <h3
              onClick={() => SetForgotPasswordDialogBoxVisible(true)}
              className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-regular cursor-pointer"
            >
              Forgot password ?
            </h3>
          </div>
          <motion.div
            initial={false}
            animate={{
              x: isError ? [-20, 0] : 0,
              borderColor: isError ? "#dc3912" : "rgba(255,255,255,0.5)",
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
              onChange={hanldeChange}
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

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`px-6 py-3 w-full text-[clamp(14px,1.5vw,18px)] font-medium rounded-md relative overflow-hidden
          transition-all duration-400 ease-in-out hover:scale-105 ${
            isPending
              ? "bg-white/50 text-black/70 cursor-not-allowed"
              : "bg-white/90 text-black cursor-pointer hover:bg-white"
          }`}
          whileTap={{ scale: 0.98 }}
          disabled={isPending || isAnimating}
        >
          {isPending ? "Logging in..." : "Login"}
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
        <GoogleAuthButton name="Sign in" />

        {/* Sign Up Link */}
        <div className="text-center text-white/80 text-[clamp(12px,1.2vw,16px)]">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-white transition-all duration-100 ease-in-out"
            onClick={() => navigate(`${SIGNUP_PAGE}`)}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
