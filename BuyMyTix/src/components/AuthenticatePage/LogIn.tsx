import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDivider from "../../utils/Divider";
import { AnimatePresence, motion } from "motion/react";
import { SIGNUP_PAGE } from "../../utils/routing";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // states for managing the mail validation
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    return isValid;
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear error when typing
    if (emailError) {
      setEmailError("");
    }

    // Clear login error when typing
    if (loginError) {
      setLoginError("");
    }
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    // Clear login error when typing
    if (loginError) {
      setLoginError("");
    }
  };

  // Simulated API call for login
  const loginUser = async (email: string, password: string) => {
    // This would be your actual API call
    return new Promise<{ success: boolean; message?: string }>((resolve) => {
      setTimeout(() => {
        // Simulate different responses based on credentials
        if (email === "user@example.com" && password === "password") {
          resolve({ success: true });
        } else if (!email || !password) {
          resolve({
            success: false,
            message: "Email and password are required",
          });
        } else {
          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 1000); // Simulate network delay
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setLoginError("");

    // Validate email format first
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Attempt to login
      const response = await loginUser(email, password);

      if (response.success) {
        // Success - start animation and redirect
        setIsAnimating(true);
        setTimeout(() => {
          navigate("/home");
        }, 1500); // waiting for animation to finish
      } else {
        // Display the error from the backend
        setLoginError(response.message || "An error occurred during login");
      }
    } catch (error) {
      // Handle any unexpected errors
      setLoginError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full self-center">
      {/* Animation for successful login */}
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
                duration: 1,
                delay: 0.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Welcome Text */}
      <div className="flex-col justify-center items-center self-center">
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
        {loginError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-red-500 font-medium px-4 py-2 rounded-md mb-3 text-center"
          >
            {loginError}
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
          <div
            className={`w-full px-3 py-[14px] rounded-md border-2 ${
              emailError ? "border-red-500" : "border-white/50"
            } flex items-center`}
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="m@example.com"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </div>
          {emailError && (
            <p className="text-red-400 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center">
            <label className="text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
              Password
            </label>
            <h3 className="text-white/60 text-[clamp(12px,1.2vw,16px)] font-medium cursor-pointer">
              Forgot password?
            </h3>
          </div>
          <div className="w-full px-3 py-[14px] rounded-md border-2 border-white/50 flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
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

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`px-6 py-3 w-full text-[clamp(14px,1.5vw,18px)] font-medium rounded-md relative overflow-hidden
          transition-all duration-400 ease-in-out hover:scale-105 ${
            isLoading
              ? "bg-white/50 text-black/70 cursor-not-allowed"
              : "bg-white/90 text-black cursor-pointer hover:bg-white"
          }`}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || isAnimating}
        >
          {isLoading ? "Logging in..." : "Login"}
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
          disabled={isLoading || isAnimating}
        >
          Sign In with Google
        </button>

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
