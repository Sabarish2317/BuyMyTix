import { HISTORY_PAGE, HOME_PAGE } from "@/routes/appRoutes";
import { useNavigate } from "react-router-dom";

const Footer: React.FC<{
  showSellDialogBoxInstruction: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showSellDialogBoxInstruction }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-12 -mt-4 p-6 md:p-10 bg-gradient-to-b from-[#4E2E7B] to-[#26004C]">
      {/* Main Box */}
      <div className="rounded-[16px] px-6 md:px-10 py-8 gap-10 flex flex-col bg-[rgba(255,_255,_255,_0.10)] backdrop-blur-[40px] text-[#CCC]  text-base font-normal leading-[140%]">
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
                <p className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out">
                  Privacy policy
                </p>
                <p className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out">
                  Terms of service
                </p>
                <p className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out">
                  Raise a complaint
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="opacity-60">Explore</p>
              <div>
                <p
                  onClick={() => showSellDialogBoxInstruction(true)}
                  className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out"
                >
                  Sell Ticket
                </p>
                <p
                  onClick={() => navigate(HISTORY_PAGE)}
                  className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out"
                >
                  History
                </p>
                <p
                  onClick={() => navigate(HOME_PAGE)}
                  className="hover:underline active:text-[#DC3912] transition duration-200 ease-in-out"
                >
                  Buy Ticket
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#CCC]  ">
            <h4>© 2024–2025 BuyMyTix. All rights reserved.</h4>
            <h4>Designed and developed with passion.</h4>
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
                <img src="./icons/send.svg" alt="Email" />
              </a>
            </div>
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200">
              <a
                href="https://wa.me/919715524124"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full w-10 h-10 flex justify-center items-center bg-[#DC3912] backdrop-blur-[72.7px] cursor-pointer hover:scale-105 transition duration-200"
              >
                <img src="./icons/wp.svg" alt="WhatsApp" />
              </a>
            </div>
          </div>
          <p className="text-center lg:text-left hidden">
            Coimbatore, Tamil Nadu
          </p>
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
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-[#CCC] ">
        <h2 className="shine-text text-[24px] sm:text-[32px] lg:text-[40px] font-black leading-tight">
          Experience events effortlessly <br /> buy, sell, and enjoy tickets
          with confidence.
        </h2>
      </div>

      {/* Footer Note */}
      <p className="text-white  text-start">© 2023 — Copyright</p>
    </div>
  );
};

export default Footer;
