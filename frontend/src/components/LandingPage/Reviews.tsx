import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { AuroraBackground } from "../ui/aurora-background";

const Reviews = () => {
  const reviewsData = [
    {
      quote:
        "Honestly, I was skeptical at first. But BuyMyTix really delivered. Got front row seats without hassle!",
      name: "Sabarish Vs",
      email: "sa@gmail.com",
      profileImg: "./images/Pro.png",
    },
    {
      quote:
        "The interface is clean and fast. It took me less than 2 minutes to buy tickets for the big match.",
      name: "John Doe",
      email: "john.doe@gmail.com",
      profileImg: "./images/Pro.png",
    },
    {
      quote:
        "Sold my spare tickets in hours. The platform made it super easy and safe!",
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      profileImg: "./images/Pro.png",
    },
    {
      quote:
        "Love the vibe of this site. It’s way better than the typical ticket platforms.",
      name: "Alex Brown",
      email: "alex.brown@gmail.com",
      profileImg: "./images/Pro.png",
    },
    {
      quote:
        "Customer support was surprisingly fast. Helped me recover a failed payment instantly.",
      name: "Emily Carter",
      email: "emily.carter@gmail.com",
      profileImg: "./images/Pro.png",
    },
    {
      quote:
        "I found last-minute tickets to a sold-out show. Unreal experience. Thanks, team!",
      name: "Michael Trent",
      email: "michael.trent@gmail.com",
      profileImg: "./images/Pro.png",
    },
  ];
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
  });

  const { ref: carouselRef, inView: carouselInView } = useInView({
    triggerOnce: true,
  });

  const borderGradient = "linear-gradient(to bottom, #8D59C2, #000000)";
  const backgroundColor = "rgba(132, 122, 122, 0.16)";
  const mainBackground = "linear-gradient(180deg, #000 0%, #0F081E 100%)";

  return (
    <AuroraBackground
      children={
        <>
          <div
            style={{ background: mainBackground, borderColor: "#8D59C2" }}
          ></div>

          <div className="relative z-10 flex justify-center">
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.0 }}
              className="px-4 py-2 rounded-[24px] -mt-6 mb-4 self-center w-fit bg-[#fff] text-[#150C29] font-semibold text-[20px]"
            >
              Reviews
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 mb-4 flex flex-col gap-1 text-center"
          >
            <h2 className="text-[#fff] font-bold text-[clamp(22px,5vw,32px)]">
              What Our Users Are Saying
            </h2>
            <p className="text-[#fff] text-[clamp(16px,4vw,24px)] font-medium">
              From discovering events to selling your own tickets, BuyMyTix
              makes the entire process <br /> seamless, secure, and effortless.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            ref={carouselRef}
            initial={{ opacity: 0, x: 40 }}
            animate={carouselInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative z-10 overflow-hidden w-full"
          >
            <div
              className="flex gap-4 w-max animate-scroll"
              style={{ animation: "scroll 40s linear infinite" }}
            >
              {[...reviewsData, ...reviewsData].map((review, index) => (
                <div
                  key={index}
                  className="rounded-[9px] flex flex-col flex-1 min-w-[280px] max-w-[350px] w-full mt-3"
                  style={{
                    background: backgroundColor,
                    border: `1px solid ${borderGradient}`,
                  }}
                >
                  <div className="px-6 py-10 text-[20px] text-center text-white">
                    <p>{`"${review.quote}"`}</p>
                  </div>
                  <hr />
                  <div className="px-6 p-3 flex gap-3 text-white items-center rounded-xl">
                    <img
                      src={review.profileImg}
                      alt="profile"
                      className="h-8 w-8"
                    />
                    <div className="flex flex-col text-s">
                      <p>{review.name}</p>
                      <p>{review.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      }
    />
  );
};

export default Reviews;
