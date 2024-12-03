"use client";
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
import { useState } from "react";

interface PaymentMethodProps {
  isFormVisible: boolean;
  onContinue?: () => void;
}

export default function PaymentMethod({
  isFormVisible,
  onContinue,
}: PaymentMethodProps) {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <div className="flex flex-col shadow-xl">
      <InfoCard
        icon={<CreditCard className="w-8 h-8 text-zinc-950" />}
        title="FORMAS DE PAGAMENTO"
        description="Para finalizar seu pedido escolha uma forma de pagamento."
        isFormVisible={isFormVisible}
      />
      {isFormVisible && (
        <form>
          <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
            <div>
              <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
              >
                <div
                  className={`flex items-center ${
                    selectedValue === "option1" ? "bg-zinc-50" : ""
                  } border border-zinc-200 rounded-lg p-4`}
                >
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between w-full items-center gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <RadioGroupItem value="option1" id="option1" />
                        <label className="text-xs font-bold" htmlFor="option1">
                          CARTÃO DE CRÉDITO
                        </label>
                      </div>
                      <div className="bg-black w-fit rounded px-3 py-1">
                        <p className="text-xs font-medium text-white text-center">
                          Aprovação Imediata
                        </p>
                      </div>
                    </div>
                    {selectedValue === "option1" && (
                      <form className="flex flex-col gap-4">
                        <div className="relative flex w-full justify-center">
                          <Image
                            src="/checkout/credit-card.svg"
                            alt="Cartão de Crédito"
                            width={250}
                            height={100}
                            className="relative z-10"
                          />
                          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white/30 backdrop-blur-md rounded-b-md pointer-events-none"></div>
                        </div>
                        <Input
                          label="Nome igual consta no cartão"
                          placeholder="Ex.: John Doe"
                          type="text"
                          id="nameOnCard"
                        />
                        <Input
                          label="CPF"
                          placeholder="Ex.: 000.000.000-00"
                          type="cpf"
                          id="cpf"
                        />
                        <Input
                          label="Número do Cartão"
                          placeholder="0000 0000 0000 0000"
                          type="text"
                          id="cardNumber"
                        />
                        <div className="flex justify-center items-end gap-2">
                          <Select>
                            <SelectTrigger labelText="Validade (Mês/Ano):">
                              Mês
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="01">Janeiro</SelectItem>
                                <SelectItem value="02">Fevereiro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger>Ano</SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <Input
                          label="CVV:"
                          placeholder="000"
                          type="text"
                          id="cvv"
                          iconRight={<Info />}
                        />
                        <Select>
                          <SelectTrigger labelText="Parcelas">
                            Selecione a quantidade de parcelas
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">1x R$ 289,90</SelectItem>
                              <SelectItem value="12">12x R$ 19,11</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <OrderBump />
                        <Button
                          text="PAGAR - 12x R$ 289,90"
                          variant="green"
                          onClick={onContinue}
                        />
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
