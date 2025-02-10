import { ChangeEvent } from "react";
import Image from "next/image";
import searchIcon from "@public/assets/icon_search.png";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "어떤 타이틀 & 작성자님을 찾고 계세요?",
  value,
  onChange,
  onSearch,
  className = "",
}: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleIconClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (e.target.value === "" && onSearch) {
      onSearch("");
    }
  };

  return (
    <div
      className={`relative flex w-full items-center mobile:mx-[auto]  tablet:mx-[auto] tablet:px-[10px] tablet:py-[12px] ${className}`}
    >
      <Image
        className="absolute left-[18px] cursor-pointer"
        width={36}
        height={36}
        src={searchIcon}
        alt="search"
        onClick={handleIconClick}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="h-[64px] w-full rounded-[16px] border-none bg-color-background-200 pl-[60px] pr-[24px] text-[16px] font-normal leading-[32px] text-color-gray-400"
      />
    </div>
  );
};

export default SearchBar;
