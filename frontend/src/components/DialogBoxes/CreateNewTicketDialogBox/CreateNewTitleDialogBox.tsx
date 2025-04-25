import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { getImageForType } from "../../../utils/getImageForType";
import { Ticket } from "../../../types/Ticket";
import { AddTitlesRequest } from "../../../types/Titles";
import { addTitles } from "../../../queries/Titles";
import Input from "../../Global/Input";
import { Dropdown2 } from "../../Global/DropDown";
import TickLoader from "../../Global/LoadingIcon";
import { toast } from "react-toastify";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface CreateNewTitleDialogBoxProps {
  input: string;
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
}

const CreateNewTitleDialogBox: React.FC<CreateNewTitleDialogBoxProps> = ({
  input,
  setToggleDialogueBox,
  titlesData,
  setTitlesData,
}) => {
  const [domReady, setDomReady] = useState(false);

  const [title, setTitle] = useState(input);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("2025");
  const [image, selectedImage] = useState("");

  //Image handling
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.05, // Target ~50kb
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile);
      selectedImage(base64 as string);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };
  //Update the title as the user types in the input field to the main titles data template
  //source is db by default for this request as this reqest saves this data to db
  useEffect(() => {
    setTitlesData((prev) => ({
      ...prev,
      source: "omdb",
      type: titlesData.type,
    })); // reinforcing type for saefty
  }, []);

  useEffect(() => {
    setTitlesData((prev) => ({
      ...prev,
      title,
      description,
      rating,
      year,
      poster: image,
    }));
  }, [title, description, rating, year, image]);

  const addNewTitleMutation = useMutation({
    mutationKey: ["addNewTitle", title],
    mutationFn: addTitles,
    onSuccess: () => {
      toast.success(`${titlesData.title} added successfully!`);
      setTimeout(() => {
        setToggleDialogueBox(false);
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { isPending } = addNewTitleMutation;
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

  const CreateNewTitleDialogBoxContent = (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION * 2,
        ease: "easeOut",
      }}
      className="bluured-background fixed inset-0 backdrop-blur-sm z-[150] flex items-center justify-center content-center place-content-center"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      {/* loading icon */}
      {isPending ? (
        <TickLoader />
      ) : (
        <div className="createnewticketdialgobox absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 self-center w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3  mb-32 ">
          {/* header */}
          <div className="w-full flex justify-between h-min items-center">
            <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
              {`Create ${titlesData.type} Title`}
            </h2>
            <img
              className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
              onClick={() => setToggleDialogueBox(false)}
              src="/icons/close-icon.svg"
              alt="close"
            />
          </div>
          {/* input boxes */}
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            <Input
              name={`${titlesData.type} Title`}
              intputValue={title}
              setInputValue={setTitle}
              title={`${titlesData.type} Title`}
              placeholder={
                titlesData.type === "Movie"
                  ? "eg.,: The Dark Knight"
                  : titlesData.type === "Sport"
                  ? "eg.,: IND Vs ENG Cricket"
                  : "eg.,: Anirdudh concert"
              }
              maxLength={32}
            />
            <Input
              name={`${titlesData.type} Description`}
              intputValue={description}
              setInputValue={setDescription}
              title={`${titlesData.type} Description`}
              placeholder={`Description about the ${titlesData.type}`}
              maxLength={200}
            />
          </div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            <Input
              name={`${titlesData.type} Rating`}
              intputValue={rating}
              setInputValue={setRating}
              title={`${titlesData.type} Rating`}
              placeholder="eg..: 7.5"
              maxLength={4}
              type="num"
            />
            <Dropdown2
              options={[
                "2025",
                "2024",
                "2023",
                "2022",
                "2021",
                "2020",
                "2019",
                "2018",
                "2017",
              ]}
              heading="Select Year"
              selectedOption={year}
              setSelectedOption={setYear}
            />
          </div>
          {/* select image */}
          <div className="select-image w-full flex flex-col gap-2 py-2 overflow-clip rounded-xl">
            <h2 className="w-full justify-start text-white text-[clamp(12px,1vw,16px) font-bold leading-tight">
              Cover image{" "}
              <span className="text-[clamp(12px,1vw,16px) font-semibold leading-tight">
                (Increases the chance of selling)
              </span>
            </h2>

            <div className="image-and-button-container relative flex flex-col gap-2 group">
              <img
                className="w-full rounded-xl relative object-cover h-[200px] group-hover:brightness-50 transition-all ease-in-out duration-400"
                src={image || getImageForType(titlesData)} //If user upload image show it if null show default image
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
          <button
            onClick={() => addNewTitleMutation.mutate(titlesData)}
            className="w-full px-6 py-3.5 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
          >
            <span className="text-white text-xl font-medium leading-7">
              Create Ticket
            </span>
          </button>
        </div>
      )}
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(CreateNewTitleDialogBoxContent, document.body);
};

export default CreateNewTitleDialogBox;
