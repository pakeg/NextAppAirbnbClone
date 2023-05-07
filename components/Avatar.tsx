"use client";

import Image from "next/image";

interface IAvatarProps {
  image: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
      src={image ? image : "/images/avatar.jpg"}
    />
  );
};

export default Avatar;
