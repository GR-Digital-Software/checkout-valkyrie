"use client";
import { MoveRight, Truck } from "lucide-react";
import Input from "../../Input";
import Button from "../../Button";
import { InfoCard } from "./Card";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
} from "../../Select";

export default function DeliveryAddress({
    isFormVisible,
    onContinue,
}: {
    isFormVisible: boolean;
    onContinue: () => void;
}) {
    const [cep, setCep] = useState("");

    return (
        <div className="flex flex-col shadow-xl">
            <InfoCard
                icon={<Truck className="w-8 h-8 text-zinc-950" />}
                title="ENDEREÇO DE ENTREGA"
                description="Para calcular o frete é necessário preencher todos os campos acima."
                isFormVisible={isFormVisible}
            />
            {isFormVisible && (
                <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
                    <Input
                        id="cep"
                        label="CEP"
                        type="cep"
                        placeholder="Ex.: 00000-000"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        helpText="Preencha suas informações de entrega corretamente para continuar."
                    />
                    {cep && (
                        <>
                            <Input id="address" label="Endereço" placeholder="Digite seu endereço" />
                            <Input id="bairro" label="Bairro" placeholder="Digite seu bairro" />
                            <div className="flex flex-row gap-2 justify-between">
                                <Input id="number" label="Número" placeholder="Digite o número" />
                                <Input id="complement" label="Complemento" placeholder="Digite o complemento" />
                            </div>
                        </>
                    )}
                    <Button
                        text="Continuar"
                        icon={<MoveRight />}
                        iconPosition="right"
                        onClick={onContinue}
                    />
                </div>
            )}
        </div>
    );
}

