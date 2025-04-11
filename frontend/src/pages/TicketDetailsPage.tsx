import { easeInOut } from "motion";
import { motion } from "motion/react";
import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import DetailCard from "../components/Global/DetailCard";
import TicketDetailsTile from "../components/TicketDetailsPage/TicketDetailsTile";
import TicketDetail from "../components/TicketDetailsPage/TicketDetail";

interface TicketDetailsPageProps {}

const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({}) => {
  const [selectedTicket, setSelectedTicket] = React.useState(0);
  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar isLoggedIn={true} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: easeInOut,
        }}
        className="main-container flex flex-col gap-8 items-start justify-start w-full md:flex-row  "
      >
        <div className="tickets-left-side flex-2 w-full flex flex-col gap-6 h-max">
          <div className="poster-and-details-contaienr w-full flex h-[300px] rounded-[12px] overflow-clip relative">
            <img
              className="w-full h-full object-cover object-top blur-[2px] brightness-50 "
              src="/images/vidamuyarchi.png"
              alt="poster"
            />
            <div className="description-container absolute bottom-8 left-8">
              <h2 className="text-white text-[clamp(20px,2.5vw,32px)] font-bold">
                Vidamuyaarchi
              </h2>
              <div className="imdb flex flex-row gap-2 text-white text-[clamp(16px,1.5vw,20px)]">
                {" "}
                <img src="/icons/imdb.svg" alt="" />
                <h3>Imdb 8.2</h3>
              </div>
              <h3 className="text-white text-[clamp(16px,1.5vw,20px)] font-regular w-full pr-8">
                A married couple's trip takes an unsettling turn when the wife
                goes missing, prompting the husband's frantic search while an
                unknown villain creates obstacles.
              </h3>
            </div>
          </div>
          <h2 className="text-white text-[clamp(20px,2vw,28px)] font-semibold ">
            Tickets
          </h2>
          {ticketData.map((ticket, index) => (
            <TicketDetailsTile key={index} {...ticket} />
          ))}
        </div>
        <div className="other-results-right-side w-full flex-1 flex-col gap-3 ">
          <TicketDetail />
          <h2 className="text-white text-[clamp(16px,1.5vw,24px)] font-semibold mb-4">
            Other results for "Vid"
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ticketData.map((ticket, index) => (
              <DetailCard
                key={index}
                forwardUrl="c"
                imgSrc="/images/vidamuyarchi.png"
                title={ticket.title}
              ></DetailCard>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default TicketDetailsPage;

const ticketData = [
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "09:00 AM",
    date: "Friday, 23 Apr",
    title: "Vidamuyarchi vendam da",
    venue: "Murugan Cinemas",
    city: "Coimbatore",
    language: "Tamil",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "07:30 PM",
    date: "Saturday, 24 Apr",
    title: "Leo",
    venue: "PVR Cinemas",
    city: "Chennai",
    language: "Tamil",
    ticketQuant: "3",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "06:00 PM",
    date: "Sunday, 25 Apr",
    title: "Jailer",
    venue: "INOX Cinemas",
    city: "Bangalore",
    language: "Tamil",
    ticketQuant: "4",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "05:45 PM",
    date: "Monday, 26 Apr",
    title: "Vikram",
    venue: "IMAX",
    city: "Hyderabad",
    language: "Tamil",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "08:00 PM",
    date: "Tuesday, 27 Apr",
    title: "KGF 2",
    venue: "Sathyam Cinemas",
    city: "Chennai",
    language: "Kannada",
    ticketQuant: "5",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "04:30 PM",
    date: "Wednesday, 28 Apr",
    title: "RRR",
    venue: "Luxe Cinemas",
    city: "Mumbai",
    language: "Telugu",
    ticketQuant: "6",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "02:15 PM",
    date: "Thursday, 29 Apr",
    title: "MS Dhoni: The Untold Story",
    venue: "Carnival Cinemas",
    city: "Delhi",
    language: "Hindi",
    ticketQuant: "3",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "10:30 AM",
    date: "Friday, 30 Apr",
    title: "Pathaan",
    venue: "PVR Icon",
    city: "Pune",
    language: "Hindi",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "09:00 PM",
    date: "Saturday, 1 May",
    title: "Avengers: Endgame",
    venue: "Cinepolis",
    city: "Kolkata",
    language: "English",
    ticketQuant: "7",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "11:45 AM",
    date: "Sunday, 2 May",
    title: "Jawan",
    venue: "INOX",
    city: "Ahmedabad",
    language: "Hindi",
    ticketQuant: "4",
    callback: () => alert("Ticket Selected!"),
  },
];

export { ticketData };
