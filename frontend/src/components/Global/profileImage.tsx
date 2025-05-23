import React, { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

interface ProfileImageProps {
  data: string;
  className?: string;

  onClick?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  data,
  onClick,
  className = "",
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [shadowColor, setShadowColor] = useState<string>("rgba(220,57,18,1)");

  useEffect(() => {
    const fac = new FastAverageColor();

    if (!imgRef.current) return;

    fac
      .getColorAsync(imgRef.current)
      .then((color) => setShadowColor(color.rgba))
      .catch(() => setShadowColor("rgba(220,57,18,1)"));
  }, [data]);

  const fallbackImage = "/icons/no-profile.png";
  const isEmpty =
    !data || data.trim().toLowerCase() === "empty" ? fallbackImage : data;

  return (
    <div
      onClick={onClick}
      className={`w-10 h-10 rounded-[290.91px] origin-left flex overflow-clip  scale-3d scale-90 md:scale-100 lg:scale-100 hover:scale-105 transition-all
         duration-200 ease-in-out active:scale-110 cursor-pointer ${className}`}
      style={{
        boxShadow: `0px 0px 24px 0px ${shadowColor}`,
      }}
    >
      <img
        ref={imgRef}
        className="w-full h-full object-cover user-drag-none"
        src={isEmpty}
        alt="profile"
      />
    </div>
  );
};

export default ProfileImage;
