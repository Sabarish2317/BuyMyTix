import React from "react";

interface MyDividerProps {
  ClassName?: string;
}

const MyDivider: React.FC<MyDividerProps> = ({ ClassName = "" }) => {
  return (
    <div
      className={`" h-[1.5px] w-full rounded-2xl bg-white/50 self-center ${ClassName}"`}
    ></div>
  );
};

export default MyDivider;
