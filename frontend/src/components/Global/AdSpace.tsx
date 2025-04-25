import React from "react";

interface AdSpaceProps {}

const AdSpace: React.FC<AdSpaceProps> = ({}) => {
  return (
    <img
      className="w-full h-[260px] object-cover  rounded-xl origin-top"
      src="/images/ad-space.png"
      alt="google-ads "
    />
  );
};

export default AdSpace;
