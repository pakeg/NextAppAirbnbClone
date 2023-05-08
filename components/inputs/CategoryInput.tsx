"use client";

import IconType from "react-icons";

interface ICategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: React.FC<ICategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 p-4 border-2 rounded-xl
  hover:border-black
  transition
  cursor-pointer
  ${selected ? "border-black" : "border-neutral-200"}`}
    >
      <Icon size={22} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
