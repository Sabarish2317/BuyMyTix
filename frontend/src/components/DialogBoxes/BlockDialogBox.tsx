import React from "react";
import { createPortal } from "react-dom";

interface BlockDialogBoxProps {
  onTrueCallBack: () => void;
  onFalseCallBack: () => void;
  title: string;
  subtitle: string;
  body: string;
}

export const BlockDialogBox: React.FC<BlockDialogBoxProps> = ({
  onTrueCallBack,
  onFalseCallBack,
  title,
  subtitle,
  body,
}) => {
  const content = (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#171717] border border-[#272727] text-white p-4 flex flex-col gap-2 rounded-xl max-w-[400px] w-[90vw]">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-white/90 text-sm">{subtitle}</p>
        <p className="text-white/60 text-sm mb-4">{body}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onTrueCallBack}
            className="px-4 py-2 flex items-center gap-2 text-red-600 cursor-pointer
               bg-[#1e1e1e] hover:bg-[#272727] rounded-md font-semibold"
          >
            Confirm
          </button>
          <div className="h-[1px] w-full bg-[#272727]" />
          <button
            onClick={onFalseCallBack}
            className="px-4 py-2 flex items-center gap-2 cursor-pointer
              font-semibold bg-[#1e1e1e] hover:bg-[#272727] rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
