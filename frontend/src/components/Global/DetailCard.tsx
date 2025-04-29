import React from "react";
import { getImageForType } from "../../utils/getImageForType";
import { AddTitlesRequest } from "../../types/Titles";
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

  return (
    <div
      onClick={() =>
        window.open(
          `${TICKET_DETAILS_PAGE}/?eventRefId=${forwardUrl}`,
          "_blank"
        )
      }
      className={`detail-card-container w-[clamp(80px,10vw,140px)] flex flex-col items-center cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <div className="image-container  aspect-[2/3] ">
        <img
          src={imgSrc || fallbackImg}
          alt={`${title} Poster`}
          className="w-full h-full object-cover  aspect-[2/3]  rounded-lg"
        />
      </div>
      <h3 className="mt-2  text-center text-white/80 text-[clamp(14px,1.2vw,18px)]  font-medium leading-snug px-0.5 overflow-ellipsis line-clamp-2">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
