import { Info } from "lucide-react";

export default function ReminderBox() {
    return (
        <div className="flex flex-row bg-white shadow-xl border-l-4 border-red-600 gap-3 py-4 px-2">
            <Info size={20} color="#DC2626" />
            <div className="flex flex-col gap-1">
                <p className="text-red-600 text-sm font-semibold">
                    PRODUTO COM ALTA PROCURA
                </p>
                <p>
                    você tem <span className="bg-red-600 px-3 py-1 rounded-md text-white text-sm mr-1">
                        20:00
                    </span>
                    para finalizar seu pedido
                </p>
            </div>
        </div>
    )
}