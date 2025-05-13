import Layout from "../components/Global/Layout";
import { useSearchParams } from "react-router-dom";
import LogIn from "../components/AuthenticatePage/LogIn";
import SignUp from "../components/AuthenticatePage/SignUp";
import { motion, AnimatePresence } from "framer-motion";
import { ANIMATION_DURATION } from "../utils/constants";
import { useEffect } from "react";

const AuthenticationPage: React.FC = () => {
  //mode?="login" etc parser
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login"; //default mode is login ie without no params means it directs to login tab
  let redirectUrl = searchParams.get("redirectUrl");
  useEffect(() => {
    if (!redirectUrl) {
      redirectUrl = "null";
    }
  }, []);
  console.log(redirectUrl);
  return (
    <Layout className="justify-center relative select-none">
      {/* max width section */}
      <div className="auth-page  items-center self-center flex flex-col justify-center w-full max-w-[760px] rounded-xl ">
        <img
          className="sm:flex md:hidden w-[150px] self-center p-4 mb-6"
          src="/icons/logo.svg"
          alt="logo"
        />

        {/* main frame */}
        <div className="main-frame w-full  h-min flex flex-row justify-center self-center ">
          {/*dynamic tabs section */}
          <div
            className="flex-6 mx-4 md:mx-0 rounded-md md:rounded-[0px] forms-tab-left w-full p-[26px] flex flex-col justify-start items-start gap-2
            md:gap-3 lg:gap-4 backdrop-blur-[40px] bg-white/10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "login" ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "login" ? 50 : -50 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  ease: "easeOut",
                  type: "tween",
                }}
                className="w-full"
              >
                {mode == "login" ? (
                  <LogIn redirect={redirectUrl} />
                ) : (
                  <div>
                    <SignUp redirect={redirectUrl || ""} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* illustration section */}
          <div className="flex-4 illustration-tab-right hidden md:flex ">
            <img
              className="object-cover"
              src="/images/auth-image.png"
              alt="image"
            />
          </div>
        </div>

        {/* terms and conditions */}
        <div className="w-full mx-4 md:mx-0 text-center text-white/80 mt-2 text-[clamp(12px,1vw,20px)] font-regular leading-snug tracking-wide">
          By clicking continue, you agree to our {"  "}
          <span className=" w-full underline hover: cursor-pointer hover:text-white hover:text-[clamp(12px,1vw,20px)] transition-all duration-100 ease-in-out">
            Terms of Service and Privacy Policy
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default AuthenticationPage;
