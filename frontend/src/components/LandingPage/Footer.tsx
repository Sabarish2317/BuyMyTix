import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-12 p-6 md:p-10 bg-gradient-to-b from-[#4E2E7B] to-[#26004C]">
      {/* Main Box */}
      <div className="rounded-[16px] px-6 md:px-10 py-8 gap-10 flex flex-col bg-[rgba(255,_255,_255,_0.10)] backdrop-blur-[40px] text-[#CCC] font-inter text-base font-normal leading-[140%]">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 w-full">
          <img
            src="./icons/logo.svg"
            className="hover:scale-105 transition duration-200"
            alt="logo"
          />
          <div className="flex flex-col sm:flex-row gap-12">
            <div className="flex flex-col gap-4">
              <p className="opacity-60">Information</p>
              <div>
                <p>Privacy policy</p>
                <p>Terms of service</p>
                <p>Raise a complaint</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="opacity-60">Explore</p>
              <div>
                <p>Sell Ticket</p>
                <p>History</p>
                <p>Buy Ticket</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex justify-center items-center font-medium gap-2.5 hover:scale-105 transition duration-200 rounded-[6px] bg-[#DC3912] backdrop-blur-[72.7px] px-4 py-3 text-white focus:outline-none focus:ring-0">
              Request For Call
            </button>
            <a href="mailto:Santhosh@gmail.com" className="hover:underline">
              Santhosh@gmail.com
            </a>
            <a href="tel:9715524124" className="hover:underline">
              9715524124
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200">
              <a
                href="mailto:santhosh@gmail.com"
                className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200"
              >
                <img src="./images/Send.png" alt="Email" />
              </a>
            </div>
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200">
              <a
                href="https://wa.me/919715524124"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200"
              >
                <img src="./images/wp.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
          <p className="text-center lg:text-left">Coimbatore, Tamil Nadu</p>
          <div className="flex items-center gap-4 text-right">
            <div className="text-[28px] font-medium">124</div>
            <div className="text-[40px] font-light">/</div>
            <div>
              Web
              <br />
              Visitors
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action & Email Input */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-white">
        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-black leading-tight">
          If you find our website useful <br />
          Please leave your <br />
          review here.
        </h2>

        <div className="w-full max-w-[670px]">
          <p className="font-medium mb-2">Please give us a review</p>
          <input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-[12px] border border-[rgba(255,255,255,0.6)] placeholder:text-white bg-transparent text-white mb-3"
          />

          {email.trim() && (
            <button
              className="mt-2 px-6 py-2 bg-[#DC3912] text-white  font-medium rounded-[6px] backdrop-blur-[72.7px] hover:scale-105 transition duration-200"
              onClick={() => alert(`Sending mail to: ${email}`)}
            >
              Send Mail
            </button>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-white font-medium text-start">© 2023 — Copyright</p>
    </div>
  );
};

export default Footer;
