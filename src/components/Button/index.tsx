import React from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "center";
  variant?: "default" | "outline" | "green" | "red";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  wFull?: boolean;
  type?: "submit" | "button";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPosition = "left",
  variant = "default",
  onClick,
  className,
  disabled = false,
  wFull = false,
  type = "button",
  loading,
}) => {
  const baseClasses =
    "px-4 py-3 flex items-center justify-center rounded-md uppercase";

  const variantClasses =
    variant === "outline"
      ? "border border-zinc-200 bg-white text-black"
      : variant === "green"
      ? "bg-green-600 text-white text-sm font-medium"
      : variant === "red"
      ? "bg-red-600 text-white"
      : "bg-black text-white";

  const disabledClasses = "opacity-50 cursor-not-allowed";

  const renderIcon = () => {
    if (icon) {
      const spacing =
        iconPosition === "left"
          ? "mr-2"
          : iconPosition === "right"
          ? "ml-2"
          : "";
      return <span className={spacing}>{icon}</span>;
    }
    return null;
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses} ${className} ${
        disabled ? disabledClasses : ""
      } ${wFull ? "w-full" : ""}`}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {iconPosition === "left" && renderIcon()}
          {text && <span>{text}</span>}
          {iconPosition === "right" && renderIcon()}
          {iconPosition === "center" && renderIcon()}
        </>
      )}
    </button>
  );
};

export default Button;
