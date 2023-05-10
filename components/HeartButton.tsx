"use client";

import { SafeUser } from "../../types/index";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorites from "../hooks/useFavorites";

interface IHeartButtonProps {
  listingId: number;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<IHeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorite, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-70 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white -top-[2px] -right-[2px] absolute"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
