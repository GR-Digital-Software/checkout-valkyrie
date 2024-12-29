import React, { InputHTMLAttributes, useState } from "react";
import { Info } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
  helpText?: string;
  maskType?: "none" | "cpf" | "phone" | "creditCard" | "cep";
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  className,
  helpText,
  iconLeft,
  iconRight,
  error,
  maskType = "none",
  ...props
}) => {
  const [value, setValue] = useState("");
  // Função para aplicar a máscara com base no tipo
  const applyMask = (inputValue: string, maskType: string): string => {
    const numericValue = inputValue.replace(/\D/g, ""); // Remove tudo que não é número
    switch (maskType) {
      case "cpf":
        return numericValue
          .slice(0, 11)
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      case "phone":
        return numericValue
          .slice(0, 11)
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      case "creditCard":
        return numericValue.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
      case "cep":
        return numericValue.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, "$1-$2");
      case "none":
      default:
        return inputValue;
    }
  };

  // Manipula a mudança no input e aplica a máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyMask(e.target.value, maskType);
    setValue(maskedValue);
    if (props.onChange) {
      e.target.value = maskedValue;
      props.onChange(e);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-900">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {iconLeft}
          </div>
        )}
        <input
          {...props}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full p-2 border border-zinc-200 placeholder:text-sm placeholder:font-normal placeholder:text-zinc-500 rounded-md ${
            iconLeft ? "pl-8" : ""
          } ${iconRight ? "pr-8" : ""}`}
          onChange={handleChange}
          value={props.value ?? value}
        />
        {iconRight && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {iconRight}
          </div>
        )}
      </div>
      {helpText && (
        <div className="flex items-start gap-1 text-zinc-500 text-xs font-normal mt-1">
          <Info className="w-3 h-3" />
          <span>{helpText}</span>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
