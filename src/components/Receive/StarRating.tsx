import { useState } from "react";
import Image from "next/image";
import star_filled from "@public/assets/icon_star.svg";
import star_empty from "@public/assets/icon_star_empty.svg";
import star_filled_md from "@public/assets/icon_star_md.svg";
import star_empty_md from "@public/assets/icon_star_empty_md.svg";

interface StarRatingProps {
  type?: boolean;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export default function StarRating({
  type = false,
  initialRating = 0,
  onRatingChange,
  readonly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    if (!readonly) {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
          className={` ${!readonly && "hover:scale-110 transition-transform"}`}
        >
          {type ? (
            <Image
              src={(hover || rating) >= star ? star_filled_md : star_empty_md}
              alt={`별점 ${star}점`}
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={(hover || rating) >= star ? star_filled : star_empty}
              alt={`별점 ${star}점`}
              width={28}
              height={28}
            />
          )}
        </button>
      ))}
    </div>
  );
}
