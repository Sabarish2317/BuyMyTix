import { useEffect, useRef, useState } from "react";

const useClickOutside = (
  initialState: boolean
): [
  React.RefObject<HTMLDivElement>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);
  const ref = useRef<HTMLDivElement>(null); // 👈 Specific to HTMLDivElement

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return [ref, isVisible, setIsVisible];
};

export default useClickOutside;
