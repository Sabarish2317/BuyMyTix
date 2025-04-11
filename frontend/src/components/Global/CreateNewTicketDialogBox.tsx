import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { ANIMATION_DURATION } from "../../utils/constants";
import Dropdown from "./DropDown";
import Input from "./Input";
import ProgressIndicator from "./ProgressIndicator";
import Movie from "../../models/movieTicketModel";
import Event from "../../models/eventTicketModel";
import Sport from "../../models/sportsTicketModel";
import ReactDOM from "react-dom";

type TicketType = Movie | Sport | Event;

const popUpVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 56 },
  exit: { opacity: 0, y: -10 },
};

const pageVariants = {
  //animation for each pages used in switch cases global var
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

interface CreateNewTicketDialogBoxProps {
  closeDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewTicketDialogBox: React.FC<CreateNewTicketDialogBoxProps> = ({
  closeDialogBox,
}) => {
  const [currentPage, setCurrentPage] = useState(0); //manages the state of the progressBar and other edge cases
  const [selectedType, setSelectedType] = useState("Movie"); //dropDown box second page la irukum athuku, manages the class from start to finsih
  const [firstPageError, setFirstPageError] = useState("");
  const [secondPageError, setSecondPageError] = useState("");
  const [thirdPageError, setThirdPageError] = useState("");
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType>(
    () =>
      ({
        id: "",
        type: "Movie",
        ticketId: "",
        movieTitle: "",
        releaseYear: 2025,
        language: "",
        screenNo: "",
        format: "2D",
        theatre: "",
        city: "",
        date: "",
        time: "",
        seatNos: "",
        postedUsrId: "",
        price: "0",
        ticketQuant: "1",
        imgUrl: "",
        description: "",
        usrDescription: "",
      } as Movie)
  );

  useEffect(() => {
    if (currentPage > 3) {
      setTimeout(() => {
        closeDialogBox(false);
      }, 3000);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <FirstPage
            ticketType={selectedType}
            setSelectedType={setSelectedType}
            closeDialogBox={closeDialogBox}
          />
        );
      case 1:
        return (
          <SecondPage
            errorStr={firstPageError}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            closeDialogBox={closeDialogBox}
          />
        );
      case 2:
        return (
          <ThirdPage
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            closeDialogBox={closeDialogBox}
            errorStr={secondPageError}
          />
        );
      case 3:
        return (
          <FourthPage
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            closeDialogBox={closeDialogBox}
            errorStr={thirdPageError}
            isAgreedToTerms={isAgreedToTerms}
            setIsAgreedToTerms={setIsAgreedToTerms}
          />
        );
      default:
        return (
          <>
            <div className="flex flex-row  gap-3">
              <motion.img
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 4, rotate: 360 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-[32px]   bg-transparent "
                src="/icons/tick.svg"
                alt="Success"
              />

              <div
                className="text-white text-[clamp(16px,1.5vw,20px)] 
              font-semibold "
              >
                Posted Successfully
              </div>
            </div>
          </>
        );
    }
  };

  // handle page movement and error
  const handleContinue = () => {
    // Helper function to validate string inputs
    const validateStringInput = (value: string) => {
      if (typeof value !== "string") {
        return "Invalid value: must be a string";
      }
      if (value.length > 52) {
        return "Value exceeds maximum length of 52 characters";
      }
      return ""; // No error
    };

    // Helper function to validate numeric inputs
    const validateNumericInput = (value: string) => {
      if (isNaN(Number(value)) || typeof Number(value) !== "number") {
        return "Invalid value: must be a number";
      }
      return ""; // No error
    };

    if (currentPage === 0) {
      // Create the appropriate ticket object based on the selected type
      if (selectedType === "Movie") {
        setSelectedTicket({
          id: "",
          type: "Movie",
          ticketId: "",
          movieTitle: "",
          releaseYear: 2025,
          language: "",
          screenNo: "",
          format: "2D",
          theatre: "",
          city: "",
          date: "",
          time: "",
          seatNos: "",
          postedUsrId: "",
          phoneNo: "",
          price: "0",
          ticketQuant: "1",
          imgUrl: "",
          description: "",
          usrDescription: "",
        } as Movie);
      } else if (selectedType === "Sports") {
        setSelectedTicket({
          id: "",
          type: "Sport",
          ticketId: "",
          title: "", // e.g., "CSK vs MI"
          venue: "",
          city: "",
          date: "", // Format: YYYY-MM-DD
          time: "", // Format: HH:mm
          gate: "",
          row: "",
          seatNos: "", // Single or multiple seat numbers
          postedUsrId: "",
          price: "0",
          phoneNo: "",
          ticketQuant: "1",
          imgUrl: "",
          description: "",
          usrDescription: "",
        } as Sport);
      } else if (selectedType === "Event") {
        setSelectedTicket({
          id: "",
          type: "Event",
          ticketId: "",
          title: "",
          venue: "",
          city: "",
          date: "",
          time: "",
          gate: "",
          row: "",
          seatNos: "",
          postedUsrId: "",
          price: "0",
          ticketQuant: "1",
          phoneNo: "",
          imgUrl: "",
          description: "",
          usrDescription: "",
        } as Event);
      }
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (currentPage === 1) {
      let error = "";

      if (selectedTicket.type === "Movie") {
        const movieTicket = selectedTicket as Movie;
        error = validateStringInput(movieTicket.movieTitle);

        if (error) {
          setFirstPageError(`Movie title: ${error}`);
          return;
        }

        if (movieTicket.movieTitle === "") {
          setFirstPageError("Please enter a title for your ticket.");
          return;
        }
      } else if (
        selectedTicket.type === "Event" ||
        selectedTicket.type === "Sport"
      ) {
        const eventOrSportTicket = selectedTicket as Event | Sport;
        error = validateStringInput(eventOrSportTicket.title);

        if (error) {
          setFirstPageError(`Title: ${error}`);
          return;
        }

        if (eventOrSportTicket.title === "") {
          setFirstPageError("Please enter a title for your ticket.");
          return;
        }
      }

      setCurrentPage((prevPage) => prevPage + 1);
      setFirstPageError("");
    } else if (currentPage === 2) {
      let error = "";

      if (
        !(
          parseInt(selectedTicket.price) &&
          parseInt(selectedTicket.ticketQuant) &&
          parseInt(selectedTicket.price) > 0 &&
          parseInt(selectedTicket.ticketQuant) > 0 &&
          parseInt(selectedTicket.price) < 50000 &&
          parseInt(selectedTicket.ticketQuant) < 50000
        )
      ) {
        setSecondPageError("Please enter a valid Price and Count");
        return;
      }

      if (selectedTicket.type === "Movie") {
        const movieTicket = selectedTicket as Movie;

        // Validate all string fields
        const fieldsToValidate = [
          { field: movieTicket.format, name: "Format" },
          { field: movieTicket.screenNo, name: "Screen number" },
          { field: movieTicket.language, name: "Language" },
          { field: movieTicket.seatNos, name: "Seat numbers" },
          { field: movieTicket.theatre, name: "Theatre" },
          { field: movieTicket.city, name: "City" },
          { field: movieTicket.time, name: "Time" },
          { field: movieTicket.date, name: "Date" },
        ];

        for (const { field, name } of fieldsToValidate) {
          error = validateStringInput(field);
          if (error) {
            setSecondPageError(`${name}: ${error}`);
            return;
          }
          if (field === "") {
            setSecondPageError(
              `Please enter a ${name.toLowerCase()} for your ticket.`
            );
            return;
          }
        }

        // Validate ticketQuant
        error = validateNumericInput(movieTicket.ticketQuant);
        if (error) {
          setSecondPageError(`Ticket quantity: ${error}`);
          return;
        }
      } else if (
        selectedTicket.type === "Event" ||
        selectedTicket.type === "Sport"
      ) {
        const eventOrSportTicket = selectedTicket as Event | Sport;

        // Validate all string fields
        const fieldsToValidate = [
          { field: eventOrSportTicket.seatNos, name: "Seat numbers" },
          { field: eventOrSportTicket.venue, name: "Venue" },
          { field: eventOrSportTicket.city, name: "City" },
          { field: eventOrSportTicket.time, name: "Time" },
          { field: eventOrSportTicket.date, name: "Date" },
          { field: eventOrSportTicket.gate, name: "Gate" },
          { field: eventOrSportTicket.row, name: "Row" },
        ];

        for (const { field, name } of fieldsToValidate) {
          error = validateStringInput(field || "");
          if (error) {
            setSecondPageError(`${name}: ${error}`);
            return;
          }
          if (field === "") {
            setSecondPageError(
              `Please enter a ${name.toLowerCase()} for your ticket.`
            );
            return;
          }
        }

        // Validate ticketQuant
        error = validateNumericInput(eventOrSportTicket.ticketQuant);
        if (error) {
          setSecondPageError(`Ticket quantity: ${error}`);
          return;
        }
      }

      setCurrentPage((prevPage) => prevPage + 1);
      setSecondPageError("");
    } else if (currentPage === 3) {
      if (selectedTicket.phoneNo.length !== 10) {
        setThirdPageError("Enter a valid phone number");
      }
      const error = validateStringInput(selectedTicket.usrDescription || "");

      if (error) {
        setThirdPageError(`Description: ${error}`);
        return;
      }

      if (selectedTicket.usrDescription === "") {
        setThirdPageError("Please enter a description for your ticket.");
        return;
      }

      if (!isAgreedToTerms) {
        setThirdPageError("Please agree to the terms and conditions.");
        return;
      }

      setCurrentPage((prevPage) => prevPage + 1);
      console.log(selectedTicket);
      setThirdPageError("");
    }
  };

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
    // Lock body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  // Early return before DOM is ready (for SSR compatibility)
  if (!domReady) return null;
  const CreateNewTicketDialogBoxContent = (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION * 2,
        ease: "easeOut",
      }}
      className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
    >
      <div className="dialogue-box w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 mb-32 ">
        {currentPage >= 1 && currentPage < 4 && (
          <ProgressIndicator currentStep={currentPage} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col items-center gap-3"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        {currentPage < 4 && (
          <div className="buttons-div w-full flex flex-row gap-5">
            {currentPage >= 1 && (
              <button
                onClick={() => {
                  setCurrentPage((prevPage) => prevPage - 1);
                }}
                className="w-full px-6 py-3 bg-[#9F64DA] text-white rounded-md text-[clamp(16px,1.4vw,20px)] font-semibold leading-tight flex justify-center items-center gap-3 scale-3d hover:scale-105 hover:opacity-90 hover:text-white active:opacity-100 transition-all duration-200"
              >
                Previous
              </button>
            )}
            <button
              style={{
                backgroundColor:
                  selectedType === "" && currentPage === 0
                    ? "#2f2f2f"
                    : "#9F64DA",
              }}
              onClick={handleContinue}
              className="w-full px-6 py-3.5 bg-[#9F64DA] text-white text-[clamp(16px,1.4vw,20px)] font-semibold leading-tight rounded-md flex justify-center items-center gap-3 scale-3d hover:scale-105 hover:opacity-90 hover:text-white active:opacity-100 transition-all duration-200"
            >
              {currentPage == 0
                ? "Continue"
                : currentPage == 3
                ? "Upload Post"
                : currentPage >= 1 && currentPage <= 3
                ? "Next"
                : "Post"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
  return ReactDOM.createPortal(CreateNewTicketDialogBoxContent, document.body);
};

export default CreateNewTicketDialogBox;

// page 1

interface FirstPageProps {
  ticketType: string;
  closeDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

const FirstPage: React.FC<FirstPageProps> = ({
  closeDialogBox,
  ticketType,
  setSelectedType,
}) => {
  const [bmsUrl, setBmsUrl] = React.useState("");

  return (
    <>
      <div className="title-and-close-button-container w-full flex justify-between h-min items-start">
        <div className="text-center justify-start items-center flex flex-col">
          <span className="text-white text-[clamp(20px,2vw,24px)] uppercase font-black">
            Create A{" "}
            <span className="text-red-600 text-[clamp(20px,2vw,24px)] uppercase font-black">
              post
            </span>
          </span>
          <h3 className="text-white text-[clamp(16px,1.5vw,20px)]">
            Select the ticket type
          </h3>
        </div>
        <img
          className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
          onClick={() => closeDialogBox(false)}
          src="/icons/close-icon.svg"
          alt="close"
        />
      </div>
      <Dropdown
        heading="Ticket Type"
        options={["Movie", "Sports", "Event"]}
        selectedOption={ticketType}
        setSelectedOption={setSelectedType}
      />
      <Input
        intputValue={bmsUrl}
        setInputValue={setBmsUrl}
        title="BMS M-Ticket url (optional)"
        placeholder="Url"
      />
      <div className="w-full h-max justify-center py-2">
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          Paste the{" "}
        </span>
        <span className="text-red-600 text-[clamp(16px,1.4vw,20px)] font-bold">
          BMS ticket url{" "}
        </span>
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          to{" "}
        </span>
        <span className="text-red-600 text-[clamp(16px,1.4vw,20px)] font-bold">
          auto fill {""}
        </span>
        <span className="text-white text-[clamp(16px,1.4vw,20px)] font-medium">
          the details. The parsing is local to your computer. We don't store any
          sensitive information.
        </span>
      </div>
    </>
  );
};

//page 2
interface SecondPageProps {
  closeDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTicket: TicketType;
  setSelectedTicket: React.Dispatch<React.SetStateAction<TicketType>>;
  errorStr: string;
}
const SecondPage: React.FC<SecondPageProps> = ({
  closeDialogBox,
  selectedTicket,
  setSelectedTicket,
  errorStr,
}) => {
  const [title, setTitle] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return (selectedTicket as Movie).movieTitle || "";
    } else {
      return (selectedTicket as Sport | Event).title || "";
    }
  });

  const [selectedYear, setSelectedYear] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return String((selectedTicket as Movie).releaseYear || "2025");
    } else {
      return "2025";
    }
  });

  // Update the ticket object when title or year changes
  useEffect(() => {
    if (selectedTicket.type === "Movie") {
      setSelectedTicket({
        ...selectedTicket,
        movieTitle: title,
        releaseYear: parseInt(selectedYear),
      } as Movie);
    } else if (
      selectedTicket.type === "Event" ||
      selectedTicket.type === "Sport"
    ) {
      setSelectedTicket({
        ...selectedTicket,
        title: title,
      } as Event | Sport);
    }
  }, [title, selectedYear]); // Only run when these values change

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedTicket({
        ...selectedTicket,
        imgUrl: URL.createObjectURL(file),
      });
    }
  };

  return (
    <>
      <div className="title-and-close-button-container w-full flex justify-between h-min items-start">
        <div className="text-center justify-start items-center flex flex-col self-start ">
          <span className="text-white text-[clamp(20px,2vw,24px)] uppercase font-black self-start w-full text-start ">
            Create A{" "}
            <span className="text-red-600 text-[clamp(20px,2vw,24px)] uppercase font-black">
              post
            </span>
          </span>
          {errorStr === "" ? (
            <h3 className="text-white text-[clamp(16px,1.5vw,20px)]">
              Select the ticket type
            </h3>
          ) : (
            <h3 className="text-red-600 font-bold text-[clamp(16px,1.5vw,20px)]">
              {errorStr}
            </h3>
          )}
        </div>
        <img
          className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
          onClick={() => closeDialogBox(false)}
          src={"/icons/close-icon.svg"}
          alt="close"
        />
      </div>
      <Input
        intputValue={title}
        setInputValue={setTitle}
        title={selectedTicket.type === "Movie" ? "Movie title" : "Event title"}
        placeholder={`Search for ${selectedTicket.type.toLowerCase()} title`}
      />
      {/* year picker */}
      <Dropdown
        heading="Select year"
        options={["2025", "2024", "2023", "2022", "2021", "2020"]}
        selectedOption={selectedYear}
        setSelectedOption={setSelectedYear}
      />
      {/* select image */}
      <div className="select-image w-full flex flex-col gap-2 py-2 overflow-clip rounded-xl">
        <h2 className="w-full justify-start text-white text-[clamp(16px,1.5vw,20px)] font-bold leading-tight">
          Cover image{" "}
          <span className="text-[clamp(16px,1.3vw,20px)] font-semibold leading-tight">
            (Increases the chance of selling)
          </span>
        </h2>

        <div className="image-and-button-container relative flex flex-col gap-2 group">
          <img
            className="w-full rounded-xl relative object-cover h-[200px] group-hover:brightness-50 transition-all ease-in-out duration-400"
            src={
              selectedTicket.imgUrl ||
              (selectedTicket.type === "Movie"
                ? "/images/popcorn.png"
                : selectedTicket.type === "Event"
                ? "/images/concert.png"
                : "/images/sport.png")
            }
            alt="result-from-search"
          />
          <label
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 opacity-0 group-hover:opacity-100 bg-[#9F64DA] 
    text-white text-[clamp(12px,1vw,18px)] font-bold rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Upload your image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3.5 opacity-0 cursor-pointer bg-[#9F64DA] hidden text-white text-[clamp(12px,1vw,18px)] font-bold leading-tight rounded-md justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-100 hover:text-white active:opacity-100 transition-all duration-200"
            />
          </label>
        </div>
      </div>
    </>
  );
};

// page 3
interface ThirdPageProps {
  closeDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTicket: TicketType;
  setSelectedTicket: React.Dispatch<React.SetStateAction<TicketType>>;
  errorStr: string;
}

const ThirdPage: React.FC<ThirdPageProps> = ({
  selectedTicket,
  setSelectedTicket,
  errorStr,
}) => {
  // Initialize state from the ticket object
  const [movieType, setMovieType] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return (selectedTicket as Movie).format || "2D";
    }
    return "2D";
  });

  const [screenNo, setScreenNo] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return (selectedTicket as Movie).screenNo || "";
    }
    return "";
  });

  const [language, setLanguage] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return (selectedTicket as Movie).language || "";
    }
    return "";
  });

  // Venue/Theatre handling
  const [venue, setVenue] = useState(() => {
    if (selectedTicket.type === "Movie") {
      return (selectedTicket as Movie).theatre || "";
    } else {
      return (selectedTicket as Sport | Event).venue || "";
    }
  });

  // Location handling
  const [location, setLocation] = useState(() => {
    return selectedTicket.city || "";
  });

  const [seatNo, setSeatNo] = useState(() => {
    return selectedTicket.seatNos || "";
  });

  const [ticketCount, setTicketCount] = useState(() => {
    return String(selectedTicket.ticketQuant || 1);
  });

  // Time and date
  const [time, setTime] = useState(() => {
    return selectedTicket.time || "";
  });

  const [date, setDate] = useState(() => {
    return selectedTicket.date || "";
  });

  // For Sports and Event tickets
  const [gate, setGate] = useState(() => {
    if (selectedTicket.type !== "Movie") {
      return (selectedTicket as Sport | Event).gate || "";
    }
    return "";
  });

  const [row, setRow] = useState(() => {
    if (selectedTicket.type !== "Movie") {
      return (selectedTicket as Sport | Event).row || "";
    }
    return "";
  });

  const [price, setPrice] = useState(() => {
    return selectedTicket.price || "";
  });

  // Update the ticket object when values change
  useEffect(() => {
    const updatedTicket = { ...selectedTicket };
    updatedTicket.city = location;
    updatedTicket.seatNos = seatNo;
    updatedTicket.ticketQuant = ticketCount;
    updatedTicket.date = date;
    updatedTicket.time = time;
    updatedTicket.price = price;

    if (selectedTicket.type === "Movie") {
      (updatedTicket as Movie).format = movieType;
      (updatedTicket as Movie).theatre = venue;
      (updatedTicket as Movie).screenNo = screenNo;
      (updatedTicket as Movie).language = language;
    } else {
      (updatedTicket as Sport | Event).venue = venue;
      (updatedTicket as Sport | Event).gate = gate;
      (updatedTicket as Sport | Event).row = row;
    }

    setSelectedTicket(updatedTicket);
  }, [
    movieType,
    screenNo,
    language,
    venue,
    location,
    seatNo,
    ticketCount,
    date,
    time,
    gate,
    row,
    price,
  ]);

  return (
    <div className="flex flex-col w-full gap-2 mb-2">
      {errorStr !== "" && (
        <h3 className="text-red-600  font-bold text-[clamp(16px,1.5vw,20px)]">
          {errorStr}
        </h3>
      )}
      {selectedTicket.type === "Movie" && (
        <Dropdown
          heading="Type"
          options={["2D", "3D"]}
          selectedOption={movieType}
          setSelectedOption={setMovieType}
        />
      )}

      <div className="screenNo-and-language-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 w-full">
        {selectedTicket.type === "Movie" && (
          <Input
            intputValue={screenNo}
            setInputValue={setScreenNo}
            title="Screen No"
            placeholder="Screen-1"
          />
        )}
        <Input
          intputValue={language}
          setInputValue={setLanguage}
          title="Language"
          placeholder="Enter language" //later gets this from profile api preference
        />
      </div>

      <div className="seatNo-and-ticket-count-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 w-full">
        <Input
          intputValue={seatNo}
          setInputValue={setSeatNo}
          title="Seat No."
          placeholder="S-11, S-12, S-13"
        />

        <Input
          intputValue={ticketCount}
          setInputValue={setTicketCount}
          title="Ticket Count"
          placeholder="1" //later gets this from profile api preference
        />
      </div>

      <div className="venue-container w-full">
        <Input
          intputValue={venue}
          setInputValue={setVenue}
          title={selectedTicket.type === "Movie" ? "Theatre" : "Venue"}
          placeholder={
            selectedTicket.type === "Movie"
              ? "Enter theatre name"
              : "Enter venue name"
          }
        />
      </div>

      <div className="location-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 w-full">
        <Input
          intputValue={location}
          setInputValue={setLocation}
          title="Location"
          placeholder={
            selectedTicket.type === "Movie"
              ? "Enter theatre location"
              : "Enter venue location"
          }
        />
        <Input
          intputValue={price}
          setInputValue={setPrice}
          title="Price Per ticket"
          placeholder="Enter price per ticket"
        />
      </div>

      <div className="time-and-date-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 w-full">
        <Input
          intputValue={time}
          setInputValue={setTime}
          title="Time"
          placeholder="12:30 PM"
        />

        <Input
          intputValue={date}
          setInputValue={setDate}
          title="Date"
          placeholder="YYYY-MM-DD"
        />
      </div>

      {selectedTicket.type !== "Movie" && (
        <div className="gate-and-row-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 w-full">
          <Input
            intputValue={gate}
            setInputValue={setGate}
            title="Gate"
            placeholder="Enter gate number"
          />

          <Input
            intputValue={row}
            setInputValue={setRow}
            title="Row"
            placeholder="Enter row number/letter"
          />
        </div>
      )}
    </div>
  );
};

interface FourthPageProps {
  closeDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  isAgreedToTerms: boolean;
  setIsAgreedToTerms: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTicket: TicketType;
  setSelectedTicket: React.Dispatch<React.SetStateAction<TicketType>>;
  errorStr: string;
}

const FourthPage: React.FC<FourthPageProps> = ({
  closeDialogBox,
  setSelectedTicket,
  selectedTicket,
  errorStr,
  isAgreedToTerms,
  setIsAgreedToTerms,
}) => {
  const [phoneNo, setphoneNo] = useState("from api");
  const [description, setDescription] = useState(() => {
    return (selectedTicket as Movie | Sport | Event).usrDescription || "";
  });

  //use effect
  useEffect(() => {
    setSelectedTicket({
      ...selectedTicket,
      usrDescription: description,
      phoneNo: phoneNo,
    } as Movie | Sport | Event);
  }, [description, phoneNo]);
  return (
    <>
      <div className="title-and-close-button-container w-full flex justify-between h-min items-start">
        <div className="text-center slef-start justify-start items-center flex flex-col w-full self-start">
          <span className="text-white text-[clamp(20px,2vw,24px)] uppercase font-black self-start">
            Create A{" "}
            <span className="text-red-600 text-[clamp(20px,2vw,24px)]  uppercase font-black text-start">
              post
            </span>
          </span>
          {errorStr === "" ? (
            <h3 className="text-white text-[clamp(16px,1.5vw,20px)] self-start text-start">
              Only visible to verfied users
            </h3>
          ) : (
            <h3 className="text-red-600 font-bold text-[clamp(16px,1.5vw,20px)] self-start">
              {errorStr}
            </h3>
          )}
        </div>
        <img
          className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
          onClick={() => closeDialogBox(false)}
          src="/icons/close-icon.svg"
          alt="close"
        />
      </div>

      <Input
        intputValue={phoneNo}
        setInputValue={setphoneNo}
        title="Phone number"
        placeholder="Enter your 10 digit phone number"
      />

      <Input
        intputValue={description}
        setInputValue={setDescription}
        title="Description"
        placeholder="Why are you selling the ticket ?"
      />
      <div className="check-box-container self-start flex flex-row gap-4 justify-start items-start text-white text-[clamp(16px,1vw,20px)] ">
        <img
          onClick={() => setIsAgreedToTerms(!isAgreedToTerms)}
          src={
            isAgreedToTerms
              ? "/icons/Checkbox-ticked.svg"
              : "/icons/CheckBox.svg"
          }
          alt="checkBox"
        />
        <h3>
          I accept the{" "}
          <span className="underline hover:text-purple-400 transition-all duration-200 ease-in-out">
            Terms & Condtions
          </span>
        </h3>
      </div>
    </>
  );
};
