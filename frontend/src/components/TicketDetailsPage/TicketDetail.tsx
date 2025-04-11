import React from "react";

interface TicketDetailProps {}

const TicketDetail: React.FC<TicketDetailProps> = ({}) => {
  return (
    <div className="w-full px-5 py-8 bg-white/5 rounded-xl items-start backdrop-blur-lg flex flex-col gap-6 mb-6">
      {/* Ticket Details Section */}
      <section className="ticket-details-sction flex w-full flex-col gap-3 items-start">
        <h2 className="text-white  text-[clamp(16px,2vw,28px)] font-bold text-center ">
          Ticket Details
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {/* Movie Info */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[#DC3912]  text-[clamp(16px,1.5vw,22px)] font-bold">
              Vidamuyarchi (U/A)
            </h3>
            <div className="flex gap-1.5 text-white  text-[clamp(16px,1.5vw,20px)] font-medium">
              <span>Tamil</span>
              <span>|</span>
              <span>2D</span>
              <span>|</span>
              <span>Screen-2</span>
            </div>
          </div>

          {/* Seat and Ticket Price */}
          <div className="w-full flex justify-between">
            <div className="w-full">
              <span className="text-white text-[clamp(16px,2vw,20px)] font-medium">
                Seat no:
              </span>
              <br />
              <span className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-medium">
                E-14, E-15
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="text-white text-[clamp(16px,2vw,20px)] font-regular font-medium w-max">
                ₹240{" "}
                <span className="text-white/70 text-[clamp(16px,2vw,20px)] font-regular font-normal">
                  / per ticket
                </span>
              </div>
              <button className="px-4 py-1 w-full bg-[#ffffff33]  text-[clamp(16px,2vw,18px)]  backdrop-blur-lg  rounded-lg text-white text-base font-regular">
                2 Tickets
              </button>
            </div>
          </div>

          {/* Venue and Date */}
          <div className="venuce-and-datetext-center w-full flex flex-col items-start gap-1.5 ">
            <div className="text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
              Murugan Cinemas, Coimbatore
            </div>
            <div className="text-white text-[clamp(16px,2vw,20px)] font-regular">
              Friday, 23 Apr, 09:00 AM
            </div>
            <button className="text-white/60 text-lg underline cursor-pointer  scale-3d hover:scale-105 hover:text-white active:opacity-80 transition-all duration-200 ease-in-out">
              View on Maps
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="contact-detilas-section flex  w-full items-start flex-col gap-3">
        <h2 className="text-white  text-[clamp(16px,2vw,28px)] font-bold text-center">
          Contact Details
        </h2>

        <div className="flex flex-col gap-2">
          {/* User Info */}
          <div className="flex items-center gap-6">
            <span className="text-[#DC3912] w-max text-[clamp(16px,1.5vw,22px)] font-bold">
              Sabarish V S
            </span>
            <div className="px-3 py-1.5 bg-[#ffffff33] rounded-lg flex items-center gap-3  backdrop-blur-lg ">
              <img src="/icons/heart-liked.svg" alt="" />
              <span className="text-white text-base font-semibold">26</span>
            </div>
            <button className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-regular underline cursor-pointer  scale-3d hover:text-red-600 hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out">
              Like
            </button>
          </div>

          <div className="flex gap-1.5 text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
            <span>Thudiyalur</span>
            <span>|</span>
            <span>Coimbatore</span>
          </div>
          {/* const handleRedirect = () => {
    const query = `${theatre} ${city}`; // e.g., "Murugan Cinemas Coimbatore"
    const encodedQuery = encodeURIComponent(query);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
    window.open(mapsUrl, '_blank'); // open in new tab
  }; */}
          {/* Phone Number */}
          <div className="flex gap-3">
            <span className="text-white  text-[clamp(16px,1.5vw,24px)] font-medium">
              +91 9344* *****
            </span>
            <button className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-regular underline cursor-pointer  scale-3d hover:text-red-600 hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out">
              Log in to view
            </button>
          </div>

          {/* Social Icons Placeholder */}
          <div className="flex gap-5">
            <button className="w-12 h-12 bg-white/75 rounded-lg flex justify-center items-center cursor-pointer  scale-3d hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out">
              <img src="/icons/phone.svg" alt="phone" />
            </button>
            <button className="w-12 h-12 bg-white/75 rounded-lg flex justify-center items-center cursor-pointer scale-3d hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out">
              <img src="/icons/wp.svg" alt="whatsapp" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketDetail;
