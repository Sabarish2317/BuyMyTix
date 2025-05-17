import { motion } from "motion/react";
import { ANIMATION_DURATION } from "../../utils/constants";

interface HistoryTicketActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  closeActions: () => void;
}

export const HistoryTicketActions: React.FC<HistoryTicketActionsProps> = ({
  onEdit,
  onDelete,
  closeActions,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: ANIMATION_DURATION / 2, ease: "easeOut" }}
      className="absolute right-0 top-12 bg-[#171717] z-50 w-max rounded-xl shadow-lg overflow-clip"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
          closeActions();
        }}
        className="px-4 py-2 flex gap-2 items-center text-white hover:bg-[#272727] w-full"
      >
        <img className="w-4 h-4" src="/icons/edit-icon.svg" alt="edit" />
        Edit
      </button>
      <div className="h-[1px] w-full bg-[#272727]" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
          closeActions();
        }}
        className="px-4 py-2 flex gap-2 items-center text-white hover:bg-[#272727]"
      >
        <img className="w-4 h-4" src="/icons/delete-icon.svg" alt="delete" />
        Delete
      </button>
    </motion.div>
  );
};
