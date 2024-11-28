import { Trash2, X } from "lucide-react";
import Button from "../Button";
import NumberInput from "../NumberInput";
import { useState } from "react";

export default function ProductCard() {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleTrashClick = () => {
        setShowConfirm(true);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const handleConfirmDelete = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div className="flex flex-row gap-4">
                <div className="rounded-lg border border-zinc-200 bg-cover bg-center w-[133px] h-[148px] flex flex-col" style={{ backgroundImage: "url('/checkout/product.png')" }}>
                    <div className="flex justify-end items-center p-2">
                        <Button
                            icon={<Trash2 size={14} color="#A1A1AA" />}
                            variant="outline"
                            className="w-7 h-7"
                            onClick={handleTrashClick} 
                        />
                    </div>
                    <div className="flex-grow" />
                    <div className="bg-black w-full py-2 px-5 rounded-lg">
                        <p className="flex flex-col w-full justify-center items-center">
                            <span className="text-white font-normal text-xs">Restam apenas</span>
                            <span className="text-white font-normal text-xs">4 unidades</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-zinc-950 text-sm font-medium">Hugo Boss Bottled Eau De Toilette</p>
                    <p className="text-zinc-700 text-sm font-normal">Perfume Masculino - 100ml</p>
                    <p className="text-zinc-700 text-sm font-normal">R$ 289,90</p>
                    <NumberInput />
                </div>
            </div>

            {showConfirm && ( 
                <div className="flex flex-row justify-start w-full gap-1 mt-2">
                    <div className="bg-zinc-50 border border-zinc-200 p-3 justify-start rounded-lg w-full">
                        <p className="text-xs font-medium text-black">Deseja realmente excluir?</p>
                    </div>
                    <div className="flex gap-1">
                        <Button icon={<X size={16} />} variant="outline" className="w-10 h-10" onClick={handleCancel} /> 
                        <Button icon={<Trash2 size={16} />} variant="red" className="w-10 h-10" onClick={handleConfirmDelete} /> 
                    </div>
                </div>
            )}
        </>
    );
}
