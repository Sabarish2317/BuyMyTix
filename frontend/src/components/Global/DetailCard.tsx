import React from "react";
import { getImageForType } from "../../utils/getImageForType";
import { AddTitlesRequest } from "../../types/Titles";
import { TICKET_DETAILS_PAGE } from "../../routes/appRoutes";
import { useNavigate } from "react-router-dom";

interface DetailCardProps {
  index: number;
  imgSrc: string;
  title: string;
  forwardUrl: string;
  className?: string;
  alt: string;
  forwardTitle?: string;
  forwardingData: AddTitlesRequest[];
}

const DetailCard: React.FC<DetailCardProps> = ({
  imgSrc,
  title,
  index,
  forwardingData,
  forwardTitle,
  forwardUrl: eventId,
  className = "",
  alt,
}) => {
  const fallbackImg = getImageForType({ type: alt } as AddTitlesRequest);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (index === 0) {
          navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${eventId}`);
          return;
        }
        const updatedTickets = forwardingData.filter((_, i) => i !== index);
        navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${eventId}`, {
          state: { data: updatedTickets, searchQuery: forwardTitle },
        });

        return;
      }}
      className={`detail-card-container w-[clamp(40px,8vw,150px)] flex flex-col items-center cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <div className="w-full image-container  aspect-[2/3] ">
        <img
          src={imgSrc}
          alt={`${title} Poster`}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== fallbackImg) {
              target.src = fallbackImg;
            }
          }}
          className="w-full h-full object-cover aspect-[2/3] rounded-lg"
        />
      </div>
      <h3 className="mt-2  w-full text-center text-white/80 text-[clamp(14px,1.2vw,18px)]  font-medium leading-snug px-0.5 overflow-ellipsis line-clamp-2">
        {title}
      </h3>
    </div>
  );
};

export default DetailCard;
