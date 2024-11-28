import { useState } from "react";
import Image from "next/image";
import Divider from "../Divider";
import Badge from "../Badge";

export default function OrderBump() {
    const [isSelected, setIsSelected] = useState(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSelected(!isSelected);
    };

    return (
        <div>
            <div className={`h-fit border ${isSelected ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-zinc-200 bg-white'} flex flex-col justify-start items-center p-5 gap-4 rounded-t-md shadow-sm`}>
                <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold text-center text-zinc-950">
                        Você acaba de ganhar um super desconto!
                    </h1>
                    <p className="font-normal text-sm text-center">
                        Adquira agora a nossa Pochete exclusiva com 50% de desconto!
                    </p>
                </div>
                <Divider className={isSelected ? 'border-blue-500' : ''} />
                <div className="w-[133px] h-fit border border-zinc-200 bg-white rounded-lg px-5 flex justify-center items-center shadow-sm">
                    <Image src={'/checkout/product2.png'} alt='Pochete' width={150} height={150} />
                </div>
                <div className="flex flex-col justify-center items-center h-fit gap-1">
                    <h1 className="text-sm font-medium text-zinc-950">Pochete Boss</h1>
                    <p className="text-xs font-normal text-zinc-950">A Pochete Boss é o acessório ideal para quem busca praticidade e estilo...</p>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <p className="text-xs font-normal text-zinc-950 line-through">R$ 99,90 </p>
                        <Badge text="50%" color={isSelected ? 'blue' : 'green'} />
                    </div>
                    <p className="text-xs font-bold text-zinc-950">R$ 289,90 </p>
                </div>
            </div>
            <button
                className={`py-4 px-9 w-full rounded-b flex justify-center items-center ${isSelected ? 'bg-blue-500' : 'bg-zinc-950'}`}
                onClick={handleButtonClick}
            >
                <h1 className="text-sm text-white text-center font-medium">APROVEITAR DESCONTO</h1>
            </button>
        </div>
    );
}
