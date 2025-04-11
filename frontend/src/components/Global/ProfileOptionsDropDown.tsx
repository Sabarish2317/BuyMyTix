export { DropdownDark };
import imageCompression from "browser-image-compression";
import React, { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../queries/Profile";
import { ProfileResponse } from "../../types/Profile";

const DropdownDark: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heading = "";
  const options = ["Edit profile", "Remove Profile"];
  const selectedOption = "Actions";
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile"],
    retry: 1,
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      alert("Failed to upload image");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type");
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

      const requestData: ProfileResponse = {
        profileImage: {
          data: base64,
          contentType: "image/webp",
        },
        _id: "",
        email: "",
        name: "",
        preferredLanguage: "",
        city: "",
        state: "",
        phone: "",
        type: "",
        loginType: "",
        soldTickets: [],
      };

      Mutation.mutate(requestData);
    } catch {
      alert("Failed to upload image");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Dropdown Button */}
      <div className="title-and-drop-down w-full">
        <div className="self-stretch justify-start text-white text-[clamp(10px,1vw,12px)] font-bold leading-loose">
          {heading}
        </div>
        <div
          className="w-full px-3 py-2 bg-[#171717] text-white rounded-sm outline-2 outline-[#474747] inline-flex justify-between items-center gap-2 cursor-pointer hover:bg-[#222222] transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{selectedOption}</span>
          <img
            src="/icons/down-arrow-orange.svg"
            alt="Dropdown"
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-[#171717] text-white shadow-lg rounded-lg overflow-hidden z-50 max-h-56 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-3 hover:bg-purple-400/50 transition-all cursor-pointer"
              onClick={() => {
                if (index === 0) {
                  triggerFileInput();
                  setIsOpen(false);
                }
                if (index == 1) {
                  const requestData: ProfileResponse = {
                    profileImage: {
                      data: "empty",
                      contentType: "image/webp",
                    },
                    _id: "",
                    email: "",
                    name: "",
                    preferredLanguage: "",
                    city: "",
                    state: "",
                    phone: "",
                    type: "",
                    loginType: "",
                    soldTickets: [],
                  };
                  window.location.reload();
                  Mutation.mutate(requestData);
                  setIsOpen(false);
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
