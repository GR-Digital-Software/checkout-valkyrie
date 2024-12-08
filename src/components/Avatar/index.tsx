import React from "react";
import Image from "next/image";

interface AvatarProps {
  name?: string;
  size?: "small" | "medium" | "large";
  bgColor?: "primary" | "zinc";
  onClick?: () => void;
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name = "Usuário",
  size = "medium",
  bgColor = "primary",
  imageUrl,
}) => {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

  const sizeClasses = {
    small: "w-6 h-6 text-[10px] font-medium",
    medium: "w-10 h-10 text-lg text-sm font-medium",
    large: "w-16 h-16 text-xl",
  };

  const backgroundColorClass =
    bgColor === "zinc" ? "bg-zinc-100" : "bg-primary-500";
  const textColorClass = bgColor === "zinc" ? "text-zinc-900" : "text-white";

  return (
    <div
      className={`flex items-center justify-center rounded-full ${
        sizeClasses[size]
      } ${imageUrl ? "" : `${backgroundColorClass} ${textColorClass}`}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          className="rounded-full"
          width={size === "small" ? 24 : size === "medium" ? 40 : 64}
          height={size === "small" ? 24 : size === "medium" ? 40 : 64}
          layout="fixed"
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
