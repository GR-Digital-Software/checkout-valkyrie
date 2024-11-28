
import { PenLine } from "lucide-react";
import Button from "../../../Button";
import { ReactNode } from "react";

interface InfoCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    isFormVisible?: boolean;
    onEditClick?: () => void; 
    showEditButton?: boolean;
}

export function InfoCard({ icon, title, description, isFormVisible, onEditClick, showEditButton }: InfoCardProps) {
    return (
        <div className={`flex p-6 bg-zinc-50 ${isFormVisible ? 'rounded-t-lg' : 'rounded-lg'}`}>
            <div className="flex flex-row w-full gap-3">
                <div className="w-fit">
                    {icon}
                </div>
                <div>
                    <h1 className="text-sm font-bold uppercase text-zinc-950">{title}</h1>
                    <p className="text-zinc-500 text-sm font-normal">{description}</p>
                </div>
            </div>
            {showEditButton && ( 
                <Button
                    variant="outline"
                    icon={<PenLine size={14} color="#A1A1AA" />}
                    iconPosition="center"
                    className="w-7 h-7 p-[7px]"
                    onClick={onEditClick}
                />
            )}
        </div>
    );
}