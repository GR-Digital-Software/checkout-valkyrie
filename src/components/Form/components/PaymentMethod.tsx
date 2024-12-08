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
  SelectValue,
} from "../../Select";
import Image from "next/image";
import OrderBump from "../../OrderBump";
import Button from "../../Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Step 1: Define Zod schema
const paymentSchema = z.object({
  paymentMethod: z.string(),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  // .regex(/^\d{16}$/, "Número do cartão deve ter 16 dígitos")
  // .min(1, "Número do cartão é obrigatório"),
  expirationMonth: z.string().optional(),
  expirationYear: z.string().optional(),
  cvv: z.string().optional(),
  installments: z.string().optional(),
  // .min(1, "Selecione uma quantidade de parcelas"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentMethod({
  isFormVisible,
  onContinue,
}: {
  isFormVisible: boolean;
  onContinue: (data: any) => void;
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("credit_card");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit_card",
    },
  });
  const handleContinue = (data: PaymentFormData) => {
    onContinue(data);
  };

  const handleEditClick = () => {
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
        <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
          <form onSubmit={handleSubmit(handleContinue)}>
            <RadioGroup
              value={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value), setValue("paymentMethod", value);
              }}
            >
              <div
                className={`flex items-center  ${
                  selectedValue === "creditCard" ? "bg-zinc-50" : ""
                } border border-zinc-200 rounded-lg p-4 `}
              >
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex justify-between w-full items-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <RadioGroupItem value="creditCard" id="option1" />
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
                  {selectedValue === "creditCard" && (
                    <form className="flex flex-col gap-4">
                      <div className="relative flex w-full justify-center">
                        <Image
                          src="/checkout/credit-card.svg"
                          alt="Cartão de Crédito"
                          width={250}
                          height={100}
                          className="relative z-10"
                        />
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white/30 backdrop-blur-md rounded-b-md pointer-events-none"></div>{" "}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Image
                          className="shadow-sm"
                          src={"/checkout/mastercard.svg"}
                          alt="Mastercard"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/visa.svg"}
                          alt="Visa"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/elo.svg"}
                          alt="Elo"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/amex.svg"}
                          alt="Amex"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/discover.svg"}
                          alt="Discover"
                          width={39}
                          height={26}
                        />
                        <div className="w-full"></div>
                        <Image
                          className="shadow-sm"
                          src={"/checkout/dinersclub.svg"}
                          alt="Diners"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/aura.svg"}
                          alt="Aura"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/hipercard.svg"}
                          alt="Hipercard"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/pix.svg"}
                          alt="Pix"
                          width={39}
                          height={26}
                        />
                        <Image
                          className="shadow-sm"
                          src={"/checkout/boleto.svg"}
                          alt="Boleto"
                          width={39}
                          height={26}
                        />
                      </div>
                      <Controller
                        name="cardName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            label="Nome igual consta no cartão"
                            placeholder="Ex.: John Doe"
                            type="text"
                            id={""}
                            {...field}
                          />
                        )}
                      />
                      {/* <Input
                        label="CPF"
                        placeholder="Ex.: 000.000.000-00"
                        type="cpf"
                        id={""}
                      /> */}
                      <Controller
                        name="cardNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            label="Número do Cartão"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                            id={""}
                            className="w-full"
                            {...field}
                          />
                        )}
                      />
                      <div className="flex justify-center items-end gap-2">
                        <Controller
                          name="expirationMonth"
                          control={control}
                          render={({ field }) => (
                            <Input
                              label="Mês"
                              placeholder="00"
                              type="text"
                              id={""}
                              className="w-full"
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          name="expirationYear"
                          control={control}
                          render={({ field }) => (
                            <Input
                              label="Ano"
                              placeholder="00"
                              type="text"
                              id={""}
                              className="w-full"
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          name="cvv"
                          control={control}
                          render={({ field }) => (
                            <Input
                              label="CVV:"
                              placeholder="000"
                              type="text"
                              id={""}
                              iconRight={<Info />}
                              className="w-full"
                              {...field}
                            />
                          )}
                        />
                      </div>
                      <Controller
                        name="installments"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              if (value) field.onChange(value);
                            }}
                          >
                            <SelectTrigger labelText="Parcelas">
                              <SelectValue placeholder="Selecione o número de parcelas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Array.from({ length: 12 }, (_, index) => {
                                  const installmentNumber = index + 1;
                                  const installmentValue = (
                                    229.32 / installmentNumber
                                  ).toFixed(2);
                                  return (
                                    <SelectItem
                                      key={installmentNumber}
                                      value={installmentNumber.toString()}
                                    >
                                      {installmentNumber}x de R${" "}
                                      {installmentValue}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {/* <OrderBump /> */}
                    </form>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center  ${
                  selectedValue === "pix" ? "bg-zinc-50" : ""
                } border border-zinc-200 rounded-lg p-4 `}
              >
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex items-center w-full justify-between gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <RadioGroupItem value="pix" id="option2" />
                      <label className="text-xs font-bold" htmlFor="option2">
                        PIX
                      </label>
                    </div>
                    <div className="bg-black w-fit rounded px-3 py-1">
                      <p className="text-xs font-medium text-white text-center">
                        Aprovação Imediata
                      </p>
                    </div>
                  </div>
                  {selectedValue === "pix" && (
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
                              Pagamentos via pix são confirmados imediatamente.
                              Você não precisa ter uma chave pix para efetuar o
                              pagamento, basta ter o app do seu banco em seu
                              celular.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <OrderBump /> */}
                    </form>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center  ${
                  selectedValue === "boleto" ? "bg-zinc-50" : ""
                } border border-zinc-200 rounded-lg p-4 `}
              >
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex justify-between w-full items-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <label className="text-xs font-bold" htmlFor="boleto">
                        BOLETO BANCÁRIO
                      </label>
                    </div>
                    <div className="bg-black rounded px-3 py-1 w-fit">
                      <p className="text-xs font-medium text-white text-center">
                        Aprovação Imediata
                      </p>
                    </div>
                  </div>
                  {selectedValue === "boleto" && (
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
                              <br />- Pagamentos com Boleto Bancário levam até 3
                              dias úteis para serem compensados e então terem os
                              produtos liberados.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <OrderBump /> */}
                    </form>
                  )}
                </div>
              </div>
            </RadioGroup>
            <div className="mt-3 w-full">
              <Button
                text="PAGAR - 12x R$ 289,90"
                type="submit"
                variant="green"
                className="w-full"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
