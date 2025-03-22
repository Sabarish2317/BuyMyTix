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
      className="detail-card-container"
    >
      <img className="w-36 h-56 rounded-lg" src={imgSrc} />
      <h3 className="text-center justify-center text-white text-2xl font-medium">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
