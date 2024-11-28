import React from 'react';
import { Info } from 'lucide-react';

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    helpText?: string;
    iconLeft?: React.ReactNode; 
    iconRight?: React.ReactNode; 
    value?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    placeholder,
    className,
    onChange,
    helpText,
    iconLeft,
    iconRight
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={id} className="text-sm font-medium text-zinc-900">{label}</label>
            <div className="relative">
                {iconLeft && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        {iconLeft}
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`w-full p-2 border border-zinc-200 placeholder:text-sm placeholder:font-normal placeholder:text-zinc-500 rounded-md ${iconLeft ? 'pl-8' : ''} ${iconRight ? 'pr-8' : ''}`}
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
        </div>
    );
};

export default Input;
