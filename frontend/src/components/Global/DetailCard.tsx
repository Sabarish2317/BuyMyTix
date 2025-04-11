import React from "react";

interface DetailCardProps {
  imgSrc: string;
  title: string;
  forwardUrl: string;
  className?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  imgSrc,
  title,
  forwardUrl,
  className = "",
}) => {
  return (
    <div
      onClick={() => (window.location.href = forwardUrl)}
      className={`detail-card-container min-w-16 max-w-32 h-max hover:scale-102 active:scale-95   duration-100 transition-all ease-in-out ${className}`}
    >
      <img
        className="w-full rounded-lg hover:outline-3 hover:outline-fuchsia-950"
        src={imgSrc}
      />
      <h3 className="w-full px-1 text-center justify-center text-white mt-1  text-[clamp(16px,1.5vw,20px)] font-regular leading-6">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
