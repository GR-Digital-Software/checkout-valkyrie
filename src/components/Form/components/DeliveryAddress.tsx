"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight, Truck } from "lucide-react";
import { z } from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Input from "../../Input";
import Button from "../../Button";
import { InfoCard } from "./Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import { RadioGroup, RadioGroupItem } from "@/components/Radio";
import { Label } from "@/components/ui/label";

import states from "./states";
import { PlanProductsType } from "@/types/planProducts";

// Helper dictionaries for region and shipping types
const REGION_DIC = {
  Nordeste: "northeastRegionDeliveryPrice",
  Norte: "northRegionDeliveryPrice",
  "Centro-Oeste": "centerwestRegionDeliveryPrice",
  Sul: "southRegionDeliveryPrice",
  Sudeste: "southeastRegionDeliveryPrice",
};

const TYPE_DIC = {
  ranges: "rangesShipping",
  fixed: "fixedShipping",
  dynamic: "dynamicShipping",
};

// Validation schema for the form
const deliveryAddressSchema = z.object({
  cep: z.string(),
  address: z.string().min(1, "Endereço é obrigatório."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatória."),
  estado: z.string().min(1, "Estado é obrigatório."),
  number: z.string().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  shippingOptionValue: z.string().min(1, "Selecione uma opção de envio."),
});

export type DeliveryAddressForm = z.infer<typeof deliveryAddressSchema>;

// Fetch address data based on CEP
async function fetchAddress(cep: string) {
  const response = await fetch(`/api/cep?cep=${cep}`);
  if (!response.ok) throw new Error("Erro ao buscar dados do CEP.");
  return response.json();
}

// Delivery Address Component
export default function DeliveryAddress({
  isFormVisible,
  onContinue,
  shippingOptions,
  setCurrentStep,
  products,
  storeId,
}: {
  storeId: string;
  products: PlanProductsType[];
  isFormVisible: boolean;
  onContinue: (data: DeliveryAddressForm) => void;
  shippingOptions: any[];
  setCurrentStep: Dispatch<SetStateAction<"personal" | "delivery" | "payment">>;
}) {
  const [cep, setCep] = useState("");
  const [prices, setPrices] = useState<any>();
  const [regiao, setRegiao] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DeliveryAddressForm>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: {
      address: "",
      bairro: "",
      city: "",
      estado: "",
      number: "",
      complement: "",
      shippingOptionValue: shippingOptions[0]?.id?.toString() ?? "",
    },
  });

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchAddress"],
    queryFn: () => fetchAddress(cep.replace("-", "")),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const calculateShippingPrice = async (option: any, currentCep: string) => {
    console.log(option);
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shipping/calculate-shipping-price`,
      {
        method: "POST",
        headers: {
          "X-Store-Id": storeId,
        },
        body: JSON.stringify({
          shippingOptionId: option.shippingOptionId,
          to: currentCep,
          products: products.map((planProduct) => ({
            id: planProduct.product.id,
            weight: planProduct.product.physicalProduct?.weight ?? 10,
            height: planProduct.product.physicalProduct?.height ?? 10,
            length: planProduct.product.physicalProduct?.length ?? 10,
            width: planProduct.product.physicalProduct?.width ?? 10,
            amount: planProduct.amount,
          })),
        }),
      }
    );
    return (await res).json();
  };

  useEffect(() => {
    if (cep.length === 9) {
      refetch();
      setValue("cep", cep);
    } else {
      resetAddressFields();
    }
  }, [cep, refetch, setValue]);

  function getDeliveryPriceByCep(currentCep: string, option: any) {
    console.log(option);
    // Converte o CEP para número para facilitar comparações
    const numericCep = parseInt(currentCep.replace("-", ""), 10);
    console.log(numericCep);
    // Verifica se o CEP está em uma das faixas
    const shippingOption = option.shippingOption.rangesShipping.ranges.find(
      (option: any) =>
        numericCep >= parseInt(option.start.replace("-", ""), 10) &&
        numericCep <= parseInt(option.end.replace("-", ""), 10)
    );

    if (shippingOption) {
      return shippingOption.deliveryPrice / 100;
    } else {
      return -1;
    }
  }
  useEffect(() => {
    if (data) {
      setValue("address", data.logradouro || "");
      setValue("bairro", data.bairro || "");
      setValue("city", data.localidade || "");
      setValue("estado", data.estado || "");
      setRegiao(data.regiao ?? "");
      // const getPrices = () => {
      //   const prices = shippingOptions.map((option: any) => {
      //     const type =
      //       TYPE_DIC[option.shippingOption.type as keyof typeof TYPE_DIC];
      //     if (type === "fixedShipping") {
      //       return (
      //         option.shippingOption[type]?.[
      //           REGION_DIC[regiao as keyof typeof REGION_DIC]
      //         ] / 100 || 0
      //       );
      //     } else if (type === "rangesShipping") {
      //       return getDeliveryPriceByCep(cep, option);
      //     }
      //   });
      //   return prices;
      // };
    }
  }, [data, setValue]);

  const onSubmit = (formData: any) => {
    setIsFormSubmitted(true);
    onContinue(formData);
  };

  const resetAddressFields = () => {
    setValue("address", "");
    setValue("bairro", "");
    setValue("city", "");
    setValue("estado", "");
    setRegiao("");
  };

  const renderShippingOptions = () => {
    return (
      <RadioGroup
        onValueChange={(value) => setValue("shippingOptionValue", value)}
      >
        {shippingOptions.map((option) => {
          const type =
            TYPE_DIC[option.shippingOption.type as keyof typeof TYPE_DIC];
          const price =
            type === "fixedShipping"
              ? option.shippingOption.fixedShipping?.[
                  REGION_DIC[regiao as keyof typeof REGION_DIC]
                ] / 100 || 0
              : getDeliveryPriceByCep(cep, option);
          return price < 0 ? null : (
            <div
              key={option.id}
              className="bg-zinc-200 rounded-lg items-center w-full flex px-6"
            >
              <RadioGroupItem
                className="mr-2"
                value={price.toString()}
                id={option.id}
              />
              <Label htmlFor={option.id} className="flex w-full py-4">
                <div className="flex justify-between w-full">
                  <span>{option.shippingOption.description}</span>
                  <p>
                    {price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    );
  };

  return (
    <div className="flex flex-col shadow-xl">
      <InfoCard
        icon={<Truck className="w-8 h-8 text-zinc-950" />}
        title="ENDEREÇO DE ENTREGA"
        description="Para calcular o frete é necessário preencher todos os campos acima."
        isFormVisible={isFormVisible}
        onEditClick={() => setCurrentStep("personal")}
        showEditButton={!isFormVisible && isFormSubmitted}
      />

      {isFormVisible && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white border-t p-6 gap-4 rounded-b-lg">
            <Input
              id="cep"
              label="CEP"
              placeholder="Ex.: 00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maskType="cep"
            />
            {isFetching && <p>Buscando endereço...</p>}
            {error && <p className="text-red-500">Erro ao buscar o CEP.</p>}

            {data && regiao && (
              <div className="flex flex-col gap-4 pt-4">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="address"
                      label="Endereço"
                      placeholder="Digite seu endereço"
                      {...field}
                      error={errors.address?.message}
                    />
                  )}
                />

                <Controller
                  name="bairro"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="bairro"
                      label="Bairro"
                      placeholder="Digite seu bairro"
                      {...field}
                      error={errors.bairro?.message}
                    />
                  )}
                />

                <div className="flex gap-2">
                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="w-full"
                        id="number"
                        label="Número"
                        placeholder="Digite o número"
                        {...field}
                        error={errors.number?.message}
                      />
                    )}
                  />

                  <Controller
                    name="complement"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="w-full"
                        id="complement"
                        label="Complemento"
                        placeholder="Digite o complemento"
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="estado"
                      className="text-sm font-medium text-zinc-900"
                    >
                      Estado
                    </label>
                    <Controller
                      name="estado"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Estados do Brasil</SelectLabel>
                              {states.map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.label}
                                >
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="w-full"
                        id="city"
                        label="Cidade"
                        placeholder="Digite a cidade"
                        {...field}
                        error={errors.city?.message}
                      />
                    )}
                  />
                </div>

                {renderShippingOptions()}
              </div>
            )}

            <Button
              className="mt-4"
              text="Continuar"
              icon={<MoveRight />}
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
}
