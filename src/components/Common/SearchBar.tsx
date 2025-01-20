import { ChangeEvent } from 'react';
import Image from 'next/image';
import searchIcon from '@public/assets/icon_search.png';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar = ({ placeholder = '어떤 고객님을 찾고 계세요?', value, onChange, className = '' }: SearchBarProps) => {
  return (
    <div className={`flex w-[955px] items-center relative tablet:w-[600px] tablet:px-[10px] tablet:py-[12px] tablet:mx-[auto] mobile:w-[327px] mobile:mx-[auto] ${className}`}>
      <Image
        className="absolute left-[18px]"
        width={36}
        height={36}
        src={searchIcon}
        alt="search"
      />
      <input 
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[64px] bg-color-background-200 pl-[60px] pr-[24px] border-none rounded-[16px] text-[16px] font-normal leading-[32px] text-color-gray-400"
      />
    </div>
  );
};

export default SearchBar;