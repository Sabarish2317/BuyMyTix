import { motion } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../../utils/constants";
import { QueryClient, useMutation } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { getImageForType } from "../../../utils/getImageForType";
import { Ticket } from "../../../types/Ticket";
import { AddTitlesRequest } from "../../../types/Titles";
import { addTitles } from "../../../queries/Titles";
import Input from "../../Global/Input";
import Dropdown from "../../Global/DropDown";
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
  setDebouncedInput: React.Dispatch<React.SetStateAction<string>>;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
}

const CreateNewTitleDialogBox: React.FC<CreateNewTitleDialogBoxProps> = ({
  input,
  setDebouncedInput,
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
  const [isCompressing, setIsCompressing] = useState(false);

  const dropZoneRef = useRef<HTMLDivElement>(null);
  const searchAllTitlesQuery = new QueryClient();
  // Compress and convert image to Base64
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsCompressing(true);

    const options = {
      maxSizeMB: 0.05, // ~100KB
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile);
      selectedImage(base64 as string);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress image");
    } finally {
      setIsCompressing(false);
    }
  };

  // Convert image to Base64
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

  // Handle image URL paste
  const handleImageUrlPaste = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value.trim();

    if (!url || !url.startsWith("http")) {
      if (url === "") return;
      toast.error("Please enter a valid image URL.");
      return;
    }

    setIsCompressing(true);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "poster.jpg", { type: blob.type });

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onload = () => {
        selectedImage(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Error loading image from URL:", err);
      toast.error("Failed to load image from URL");
    } finally {
      setIsCompressing(false);
    }
  };

  // Update titlesData when fields change
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

  // Set initial type
  useEffect(() => {
    setTitlesData((prev) => ({
      ...prev,
      source: "db",
      type: titlesData.type,
    }));
  }, []);

  // Handle component mount/unmount
  useEffect(() => {
    setDomReady(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Mutation for adding new title
  const addNewTitleMutation = useMutation({
    mutationKey: ["addNewTitle", title],
    mutationFn: addTitles,
    onSuccess: () => {
      toast.success(`${titlesData.title} added successfully!`);
      const debouncedInput = title;

      searchAllTitlesQuery.invalidateQueries({
        queryKey: ["all titles", debouncedInput, year],
      });
      setTimeout(() => {
        let oldInput = "";
        oldInput = debouncedInput;
        setToggleDialogueBox(false);
        setDebouncedInput("");
        setDebouncedInput(oldInput.trim().toLowerCase().slice(0, -1));
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isPending } = addNewTitleMutation;

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => `${currentYear - index}`
  );

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
      className="bluured-background fixed inset-0 backdrop-blur-sm z-[150] flex items-center justify-center"
    >
      {/* Show loader during compression */}
      {isPending ? (
        <TickLoader />
      ) : (
        <div
          ref={dropZoneRef}
          onDragOver={(e) => {
            e.preventDefault();
            if (dropZoneRef.current)
              dropZoneRef.current.classList.add("border-blue-400");
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (dropZoneRef.current)
              dropZoneRef.current.classList.remove("border-blue-400");

            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
              handleImageUpload(file);
            } else {
              toast.error("Please drop a valid image file.");
            }
          }}
          className="create-new-ticket-dialogue-box 
          w-[280px] sm:w-[360px] md:w-[400px] lg:w-[480px]
          h-fit min-h-[300px] max-h-[80vh] overflow-y-auto
          p-[clamp(12px,3vw,20px)] relative
          bg-black rounded-xl backdrop-blur-sm
          flex flex-col items-center gap-3"
          style={{ scrollbarColor: "rgba(255,255,255,0.2) rgba(0,0,0,0.2)" }}
        >
          {/* Header */}
          <div className="w-full flex justify-between h-min items-center ">
            <h2 className="text-white text-center text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
              {`Create ${titlesData.type} Title`}
            </h2>
            <img
              onClick={() => setToggleDialogueBox(false)}
              src="/icons/close-icon.svg"
              alt="close"
              className="scale-3d hover:scale-95 active:scale-105 transition-all duration-200 cursor-pointer"
            />
          </div>

          {/* Inputs */}
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            <Input
              name={`${titlesData.type} Title`}
              intputValue={title}
              setInputValue={setTitle}
              title={`${titlesData.type} Title`}
              placeholder={
                titlesData.type === "Movie"
                  ? "eg.: The Dark Knight"
                  : titlesData.type === "Sport"
                  ? "eg.: IND Vs ENG Cricket"
                  : "eg.: Anirudh Concert"
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
              placeholder="eg.: 7.5"
              maxLength={4}
              type="num"
            />
            <Dropdown
              options={years}
              heading="Select Year"
              selectedOption={year}
              setSelectedOption={setYear}
            />
          </div>

          {/* Image Upload Section */}
          <div className="select-image w-full flex flex-col gap-2 py-2 overflow-clip rounded-xl">
            <h2 className="w-full text-white text-[clamp(12px,1vw,16px)] font-bold leading-tight">
              Cover image{" "}
              <span className="font-semibold">
                (Increases the chance of selling)
              </span>
            </h2>

            {/* Paste Image URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-white">
                Or paste image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                onChange={handleImageUrlPaste}
                className="w-full px-3 py-2 border rounded bg-white text-black"
              />
            </div>

            {/* Image Preview / Drag & Drop Area */}
            <div className="relative group ">
              {isCompressing ? (
                <div className="w-full h-[200px] flex items-center justify-center bg-gray-800 rounded-xl">
                  <TickLoader />
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dropZoneRef.current)
                      dropZoneRef.current.classList.add("border-blue-400");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dropZoneRef.current)
                      dropZoneRef.current.classList.remove("border-blue-400");

                    const file = e.dataTransfer.files[0];
                    if (file?.type.startsWith("image/")) {
                      handleImageUpload(file);
                    } else {
                      toast.error("Only image files are allowed.");
                    }
                  }}
                  className="border-2 border-dashed border-purple-400/50 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                >
                  <img
                    className=" rounded-xl object-cover h-[200px] aspect-[3/4]"
                    src={image || getImageForType(titlesData)}
                    alt="result-from-search"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}

              {!isCompressing && (
                <label
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 w-max -translate-y-1/2 px-4 py-2 bg-[#9F64DA] text-white rounded-md cursor-pointer hover:bg-[#8f54ca] transition-all duration-200"
                  style={{ zIndex: 10 }}
                >
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (!title) return toast.error("Please enter a title");
                if (!description)
                  return toast.error("Please enter a description");
                if (!year) return toast.error("Please select a year");

                addNewTitleMutation.mutate(titlesData);
              }}
              className="w-full  px-6 py-3.5 mt-2 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
            >
              <span className="text-white text-xl font-medium leading-7">
                Create Ticket
              </span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return ReactDOM.createPortal(CreateNewTitleDialogBoxContent, document.body);
};

export default CreateNewTitleDialogBox;
