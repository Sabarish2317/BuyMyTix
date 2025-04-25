import React from "react";
import { getImageForType } from "../../utils/getImageForType";
import { AddTitlesRequest } from "../../types/Titles";
import { useNavigate } from "react-router-dom";
import { TICKET_DETAILS_PAGE } from "../../routes/appRoutes";

interface DetailCardProps {
  imgSrc: string;
  title: string;
  forwardUrl: string;
  className?: string;
  alt: string; // represents the type (Movie, Event, Sport)
}

const DetailCard: React.FC<DetailCardProps> = ({
  imgSrc,
  title,
  forwardUrl,
  className = "",
  alt,
}) => {
  const fallbackImg = getImageForType({ type: alt } as AddTitlesRequest);
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${forwardUrl}`)
      }
      className={`detail-card-container flex flex-col items-center cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <div className="image-container w-[clamp(80px,10vw,140px)] aspect-[2/3] bg-zinc-800 rounded-lg overflow-hidden">
        <img
          src={imgSrc || fallbackImg}
          alt={`${title} Poster`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-2 text-center text-white text-[clamp(14px,1.2vw,18px)] font-medium leading-snug px-1">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
