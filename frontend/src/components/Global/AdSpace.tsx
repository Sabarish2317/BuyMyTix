import React from "react";

interface AdSpaceProps {}

const AdSpace: React.FC<AdSpaceProps> = ({}) => {
  return (
    <img
      className="w-full h-[200px] object-cover hidden rounded-2xl origin-top"
      src="/images/ad-space.png"
      alt="google-ads "
    />
  );
};

export default AdSpace;
