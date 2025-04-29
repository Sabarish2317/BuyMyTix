import React from "react";

type InputType = "str" | "num";

interface SmartInputProps<T extends string | number> {
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

const SmartInput = <T extends string | number>({
  title,
  placeholder = "",
  intputValue,
  setInputValue,
  type = "str",
  name = "",
  icon,
  prefixText = "",
  maxLength = 36,
}: SmartInputProps<T>) => {
  const inputType = type === "num" ? "number" : "text";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (type === "num") {
      setInputValue(raw === "" ? ("" as T) : (Number(raw) as T));
    } else {
      setInputValue(raw as T);
    }
  };

  return (
    <div className="relative self-stretch w-full min-w-[180px] ">
      <h3 className="w-full justify-start text-white text-[clamp(12px,1vw,16px)] font-bold leading-loose">
        {title}
      </h3>
      <div className="input-container flex flex-row gap-0 items-center justify-center bg-white rounded-sm outline-2 outline-white ">
        {prefixText && (
          <h3
            className="w-min  text-black  
                   inline-flex justify-start items-center  pl-4 text-[clamp(12px,1vw,16px)] font-medium leading-loose"
          >
            {prefixText}
          </h3>
        )}
        <input
          maxLength={maxLength}
          type={inputType}
          name={name}
          value={intputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full focus:outline-none min-h-max text-black px-3 py-3 text-start  autofill:text-black"
        />
      </div>
      {icon && <img src={icon} alt="" />}
    </div>
  );
};

export default SmartInput;
