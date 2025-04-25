import { motion } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";
import { SignUpRequest } from "../../types/SignUp";
import imageCompression from "browser-image-compression";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "../../queries/SignUp";
import { useNavigate } from "react-router-dom";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface AddProfileDialogBoxProps {
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
  form: SignUpRequest;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<SignUpRequest>>;

  redirectUrl: string;
}

const AddProfileDialogBox: React.FC<AddProfileDialogBoxProps> = ({
  form,
  setToggleDialogueBox,
  setForm,
  setIsAnimating,
  redirectUrl,
}) => {
  const [profile, setProfile] = useState(
    form.profileImage.data || "/icons/no-profile.png"
  );

  const [domReady, setDomReady] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const signUpMutation = useMutation({
    mutationKey: ["SignUp"],
    mutationFn: signUpUser,
  });
  const { isPending } = signUpMutation;

  const hanldeContinue = () => {
    if (!form.name || !form.phone) {
      setError(true);
      setErrorMsg("Please enter your name and phone number");
      return;
    }
    if (form.name.length > 54) {
      setError(true);
      setErrorMsg("Name is too long");
      return;
    }
    if (form.phone.length !== 10 && !form.phone.match("[0-9]+")) {
      setError(true);
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    signUpMutation.mutate(form, {
      onSuccess: (responseData) => {
        if (!responseData.token) {
          setError(true);
          setErrorMsg("Could not sign up");
          return;
        }
        setToggleDialogueBox(false);
        setError(false);
        setIsAnimating(true);

        localStorage.setItem("token", responseData?.token);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        setTimeout(() => navigate(redirectUrl || "/home"), 1000);
      },
      onError: (err) => {
        setError(true);
        setErrorMsg(err.message);
      },
    });
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError(true);
      setErrorMsg("Invalid file type");
      return;
    }

    try {
      const options = {
        maxSizeMB: 0.05, // target ~50KB
        maxWidthOrHeight: 512, // optional dimension cap
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      setProfile(base64);

      setForm((prev) => ({
        ...prev,
        profileImage: {
          data: base64,
          contentType: "image/webp",
        },
      }));
    } catch {
      setError(true);
      setErrorMsg("Failed to upload image");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //For managing portal dont worry abt this
  useEffect(() => {
    setDomReady(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  if (!domReady) return null;

  const AddProfileDialogBoxContent = (
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
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div className="w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3">
        <div className="title-and-close-bnutton w-full flex justify-between flex-row items-center h-min ">
          <div className="title-contnainer flex flex-col  gap-0">
            <h2 className=" text-start text-white  text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
              Profile
            </h2>
            {isError ? (
              <h2 className=" text-start text-[#DC3912] text-[clamp(14px,1.4vw,18px)] font-medium leading-4 md:leading-1 mb-3">
                {error}
              </h2>
            ) : (
              <h2 className=" text-start text-white text-[clamp(14px,1.4vw,18px)] font-medium leading-4 md:leading-1 mb-3">
                Please add your details to continue to your account
              </h2>
            )}
          </div>
          <img
            className="scale-3d hover:scale-95  hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>
        <div className="relative profile-and-edit-container">
          <img
            className="w-16 l-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative rounded-[290.91px] object-cover outline-2 outline-[#dc3a1246]"
            src={profile}
            alt="profile"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="px-4 py-1.5 absolute bottom-[-16px] right-[-32px]  cursor-pointer bg-[#9F64DA] text-[clamp(14px,1.5vw,18px)] text-white font-medium rounded-md flex justify-center items-center gap-2.5 scale-3d 
          hover:scale-105 active:opacity-100 transition-all duration-200"
          >
            Edit
          </button>
        </div>
        <div className="name input-label-container flex flex-col gap-2 w-full">
          <label className="self-start text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Name
          </label>
          <motion.div
            initial={false}
            animate={{
              x: isError ? [-20, 0] : 0,
              borderColor: isError ? "#dc3912" : "rgba(255,255,255,0.5)",
            }}
            transition={{
              duration: 0.1,
              ease: "backInOut",
            }}
            className="w-full px-3 py-[14px] rounded-md border-2 flex items-center justify-between"
          >
            <input
              name="name"
              type="email"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="m@example.com"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </motion.div>
        </div>
        <div className="phonenumber input-label-container flex flex-col gap-2 w-full">
          <label className="self-start text-white/80 text-[clamp(14px,1.5vw,18px)] font-medium">
            Phone number
          </label>
          <motion.div
            initial={false}
            animate={{
              x: isError ? [-20, 0] : 0,
              borderColor: isError ? "#dc3912" : "rgba(255,255,255,0.5)",
            }}
            transition={{
              duration: 0.1,
              ease: "backInOut",
            }}
            className="w-full px-3 py-[14px] rounded-md border-2 flex items-center justify-between"
          >
            <input
              name="number"
              type=""
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91"
              className="w-full bg-transparent text-white/80 text-[clamp(14px,1.3vw,16px)] font-normal outline-none"
            />
          </motion.div>
        </div>
        <button
          onClick={hanldeContinue}
          className="w-full px-6 py-3.5 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-white text-xl font-medium leading-7">
            {isPending ? "Signing up ..." : "Continue"}
          </span>
        </button>
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(AddProfileDialogBoxContent, document.body);
};

export default AddProfileDialogBox;
