"use client";
import { useState } from "react";
import { CreditCard, Info } from "lucide-react";
import { InfoCard } from "./Card";
import { RadioGroup, RadioGroupItem } from "../../Radio";
import Input from "../../Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
} from "../../Select";
import Image from "next/image";
import OrderBump from "../../OrderBump";
import Button from "../../Button";
export default function PaymentMethod() {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [selectedValue, setSelectedValue] = useState('option1');

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
                icon={<CreditCard className="w-8 h-8 text-zinc-950" />}
                title="FORMAS DE PAGAMENTO"
                description="Para finalizar seu pedido escolha uma forma de pagamento."
                isFormVisible={isFormVisible}
                onEditClick={handleEditClick}
                showEditButton={!isFormVisible && isFormSubmitted}
            />
            {isFormVisible && (
                <form>
                    <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
                        <div>
                            <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                                <div
                                    className={`flex items-center  ${selectedValue === 'option1' ? 'bg-zinc-50' : ''
                                        } border border-zinc-200 rounded-lg p-4 `}
                                >
                                    <div className="flex flex-col gap-5 w-full">
                                        <div className="flex justify-between w-full items-center gap-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <RadioGroupItem value="option1" id="option1" />
                                                <label className="text-xs font-bold" htmlFor="option1">CARTÃO DE CRÉDITO</label>
                                            </div>
                                            <div className="bg-black w-fit rounded px-3 py-1">
                                                <p className="text-xs font-medium text-white text-center">Aprovação Imediata</p>
                                            </div>
                                        </div>
                                        {selectedValue === 'option1' && (
                                            <form className="flex flex-col gap-4">
                                                <div className="relative flex w-full justify-center">
                                                    <Image
                                                        src="/checkout/credit-card.svg"
                                                        alt="Cartão de Crédito"
                                                        width={250}
                                                        height={100}
                                                        className="relative z-10"
                                                    />
                                                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white/30 backdrop-blur-md rounded-b-md pointer-events-none"></div>                                                </div>
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    <Image className="shadow-sm" src={'/checkout/mastercard.svg'} alt='Mastercard' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/visa.svg'} alt='Visa' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/elo.svg'} alt='Elo' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/amex.svg'} alt='Amex' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/discover.svg'} alt='Discover' width={39} height={26} />
                                                    <div className="w-full"></div>
                                                    <Image className="shadow-sm" src={'/checkout/dinersclub.svg'} alt='Diners' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/aura.svg'} alt='Aura' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/hipercard.svg'} alt='Hipercard' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/pix.svg'} alt='Pix' width={39} height={26} />
                                                    <Image className="shadow-sm" src={'/checkout/boleto.svg'} alt='Boleto' width={39} height={26} />
                                                </div>
                                                <Input label="Nome igual consta no cartão" placeholder="Ex.: John Doe" type="text" id={""} />
                                                <Input label="CPF" placeholder="Ex.: 000.000.000-00" type="cpf" id={""} />
                                                <Input
                                                    label="Número do Cartão"
                                                    placeholder="0000 0000 0000 0000"
                                                    type="text" id={""}
                                                />
                                                <div className="flex justify-center items-end gap-2">
                                                    <Select>
                                                        <SelectTrigger labelText="Validade (Mês/Ano):">Mês</SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="opcao1">Opção 1</SelectItem>
                                                                <SelectItem value="opcao2">Opção 2</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select>
                                                        <SelectTrigger>Ano</SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="opcao1">Opção 1</SelectItem>
                                                                <SelectItem value="opcao2">Opção 2</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <Input label="CVV:" placeholder="000" type="text" id={""} iconRight={<Info />} />
                                                <Select>
                                                    <SelectTrigger labelText="Parcelas">Selecione a quantidade de parcelas</SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="opcao1">12x de R$ 19,11</SelectItem>
                                                            <SelectItem value="opcao2">12x de R$ 19,11</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <OrderBump />
                                                <Button text="PAGAR - 12x R$ 289,90" variant="green" />
                                            </form>
                                        )}
                                    </div>
                                </div>



                                <div
                                    className={`flex items-center  ${selectedValue === 'option2' ? 'bg-zinc-50' : ''
                                        } border border-zinc-200 rounded-lg p-4 `}
                                >
                                    <div className="flex flex-col gap-5 w-full">
                                        <div className="flex items-center w-full justify-between gap-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <RadioGroupItem value="option2" id="option2" />
                                                <label className="text-xs font-bold" htmlFor="option2">PIX</label>
                                            </div>
                                            <div className="bg-black w-fit rounded px-3 py-1">
                                                <p className="text-xs font-medium text-white text-center">Aprovação Imediata</p>
                                            </div>
                                        </div>
                                        {selectedValue === 'option2' && (
                                            <form className="flex flex-col gap-4">

                                                <div className="bg-white h-fit border border-zinc-200 flex flex-col justify-start items-center p-5 gap-4">
                                                    <div className="flex flex-row w-full gap-3">
                                                        <div className="h-full">
                                                            <Info size={16} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <h1 className="text-sm font-semibold text-start text-zinc-950">
                                                                Atente-se aos detalhes:
                                                            </h1>
                                                            <p className="font-normal text-sm text-start">
                                                                Pagamentos via pix são confirmados imediatamente. Você não precisa ter uma chave pix para efetuar o pagamento, basta ter o app do seu banco em seu celular.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <OrderBump />
                                                <Button text="PAGAR - 12x R$ 289,90" variant="green" />
                                            </form>
                                        )}
                                    </div>
                                </div>





                                <div
                                    className={`flex items-center  ${selectedValue === 'option3' ? 'bg-zinc-50' : ''
                                        } border border-zinc-200 rounded-lg p-4 `}
                                >
                                    <div className="flex flex-col gap-5 w-full">
                                        <div className="flex justify-between w-full items-center gap-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <RadioGroupItem value="option3" id="option3" />
                                                <label className="text-xs font-bold" htmlFor="option3">BOLETO BANCÁRIO</label>
                                            </div>
                                            <div className="bg-black rounded px-3 py-1 w-fit">
                                                <p className="text-xs font-medium text-white text-center">Aprovação Imediata</p>
                                            </div>
                                        </div>
                                        {selectedValue === 'option3' && (
                                            <form className="flex flex-col gap-4">

                                                <div className="bg-white h-fit border border-zinc-200 flex flex-col justify-start items-center p-5 gap-4">
                                                    <div className="flex flex-row w-full gap-3">
                                                        <div className="h-full">
                                                            <Info size={16} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <h1 className="text-sm font-semibold text-start text-zinc-950">
                                                                Atente-se aos detalhes:
                                                            </h1>
                                                            <p className="font-normal text-sm text-start">
                                                                - Boleto (somente à vista).
                                                                <br />
                                                                - Pagamentos com Boleto Bancário levam até 3 dias úteis para serem compensados e então terem os produtos liberados.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <OrderBump />
                                                <Button text="PAGAR - 12x R$ 289,90" variant="green" />
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
