import React from "react";

interface DetailCardProps {
  imgSrc: string;
  title: string;
  forwardUrl: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  imgSrc,
  title,
  forwardUrl,
}) => {
  return (
    <div
      onClick={() => (window.location.href = forwardUrl)}
      className="detail-card-container min-w-32 h-max hover:scale-102 active:scale-95   duration-100 transition-all ease-in-out "
    >
      <img
        className="w-full rounded-lg hover:outline-3 hover:outline-fuchsia-950"
        src={imgSrc}
      />
      <h3 className="w-full px-1 text-center justify-center text-white/80 text-lg  font-medium">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
