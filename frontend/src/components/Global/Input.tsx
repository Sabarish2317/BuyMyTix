interface StyledInputProps {
  placeholder?: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  intputValue: string;
  title: string;
  icon?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  placeholder,
  intputValue,
  setInputValue,
  title,
  icon,
}) => {
  return (
    <div className="relative self-stretch w-full min-w-[180px]">
      <div className="w-full justify-start text-white text-[clamp(12px,1vw,16px)] font-bold leading-loose">
        {title}
      </div>
      <input
        type="text"
        value={intputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full  px-3 py-3 bg-white rounded-sm outline-2 outline-white 
                   inline-flex justify-start items-center gap-2 text-black focus:outline-none"
      />
      <img src={icon} alt="" />
    </div>
  );
};

export default StyledInput;
