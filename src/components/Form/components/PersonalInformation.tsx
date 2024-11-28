"use client";
import { useState } from "react";
import { CircleUser, MoveRight, PenLine } from "lucide-react";
import Input from "../../Input";
import Button from "../../Button";
import { InfoCard } from "./Card";

export default function PersonalInformation() {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const handleContinue = () => {
        setIsFormVisible(false);
        setIsFormSubmitted(true);
    };


    const handleEditClick = () => {
        setIsFormVisible(true);
        setIsFormSubmitted(false);
    };

    return (
        <div className="flex flex-col shadow-xl">
            <InfoCard
                icon={<CircleUser className="w-8 h-8 text-zinc-950" />}
                title="Informações Pessoais"
                description="Utilizaremos seu e-mail para: Identificar seu perfil, histórico de compra, notificação de pedidos e carrinho de compras."
                isFormVisible={isFormVisible}
                onEditClick={handleEditClick}
                showEditButton={!isFormVisible && isFormSubmitted}

            />
            {isFormVisible && (
                <form>
                    <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
                        <Input id="email" label="E-mail" type="email" placeholder="Ex.: johndoe@example.com" />
                        <Input id="name" label="Nome Completo" placeholder="Ex.: John Doe" />
                        <Input id="cpf" label="CPF" placeholder="Ex.: 000.000.000-00" />
                        <Input id="phone" label="Celular" placeholder="Ex.: (00) 00000-0000" />
                        <Button
                            text="Continuar"
                            icon={<MoveRight />}
                            iconPosition="right"
                            onClick={handleContinue}
                        />

                    </div>
                </form>
            )}
        </div>
    );
}