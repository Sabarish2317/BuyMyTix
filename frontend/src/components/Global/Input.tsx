import React from "react";

type InputType = "str" | "num";

interface InputProps<T extends string | number> {
  title: string;
  placeholder?: string;
  intputValue: T;
  setInputValue: React.Dispatch<React.SetStateAction<T>>;
  type?: InputType;
  name?: string;
  icon?: string;
  prefixText?: string;
  maxLength?: number;
}

const Input = <T extends string | number>({
  title,
  placeholder = "",
  intputValue,
  setInputValue,
  type = "str",
  name = "",
  icon,
  prefixText = "",
  maxLength = 36,
}: InputProps<T>) => {
  const inputType = type === "num" ? "number" : "text";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (type === "num") {
      if (raw.length > maxLength) return;
      setInputValue(raw === "" ? ("" as T) : (Number(raw) as T));
    } else {
      if (raw.length > maxLength) return;
      setInputValue(raw as T);
    }
  };

  return (
    <div className="relative self-stretch w-full min-w-[180px]">
      <h3 className="w-full justify-start text-[clamp(12px,1vw,16px)] mb-0.5 text-gray-200 font-bold leading-loose">
        {title}
      </h3>
      <div className="input-container flex flex-row gap-0 items-center justify-center bg-white rounded-sm outline-2 outline-white">
        {prefixText && (
          <h3 className="w-min text-black inline-flex justify-start items-center  pl-4  font-medium leading-loose">
            {prefixText}
          </h3>
        )}
        <input
          type={inputType}
          name={name}
          value={intputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full focus:outline-none min-h-max text-black px-3 py-3 text-start autofill:text-black"
          // For number inputs, we skip maxLength here since browser ignores it
          {...(type !== "num" && { maxLength })}
        />
      </div>
      {icon && <img src={icon} alt="" />}
    </div>
  );
};

export default Input;
