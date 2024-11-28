import { ArrowDown } from "lucide-react";

interface BadgeProps {
    className?: string;
    text?: string;
    color?: "green" | "blue"; 
}

export default function Badge({ className, text, color = "green" }: BadgeProps) {
    const colorClasses = color === "blue" ? "bg-[#3B82F61A] text-blue-500 border-blue-500" : "bg-[#22C55E1A] text-green-500 border-green-500";

    return (
        <div className={`flex opacity-90 items-center w-fit gap-2 rounded-md border px-3 py-0.5 ${colorClasses} ${className}`}>
            <ArrowDown className={`w-3 h-3 ${color === "blue" ? "text-blue-500" : "text-green-500"}`} />
            {text && <span className="text-xs font-semibold">{text}</span>}
        </div>
    )
}
