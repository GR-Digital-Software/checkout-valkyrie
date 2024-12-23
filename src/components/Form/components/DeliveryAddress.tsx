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

async function fetchAddress(cep: string) {
  const response = await fetch(`/api/cep?cep=${cep}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do CEP.");
  }
  return response.json();
}

const REGION_DIC = {
  Nordeste: "northeastRegionDeliveryPrice",
  Norte: "northRegionDeliveryPrice",
  "Centro-Oeste": "centerwestRegionDeliveryPrice",
  Sul: "southRegionDeliveryPrice",
  Sudeste: "southeastRegionDeliveryPrice",
};

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

export default function DeliveryAddress({
  isFormVisible,
  onContinue,
  shippingOptions,
  setCurrentStep,
}: {
  isFormVisible: boolean;
  onContinue: (data: any) => void;
  shippingOptions: any[];
  setCurrentStep: Dispatch<SetStateAction<"personal" | "delivery" | "payment">>;
}) {
  const [cep, setCep] = useState("");
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
      shippingOptionValue:
        shippingOptions[0]?.shippingOptionId?.toString() ??
        shippingOptions[0]?.id.toString() ??
        "",
    },
  });
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["fetchAddress"],
    queryFn: () => fetchAddress(cep.replace("-", "")),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setValue("address", data.logradouro || "");
      setValue("bairro", data.bairro || "");
      setValue("city", data.localidade || "");
      setValue("estado", data.estado || "");
      setRegiao(data.regiao ?? "");
    }
  }, [data, setValue]);

  useEffect(() => {
    if (cep.length === 9) {
      refetch(); // Buscar dados da API
      setValue("cep", cep);
    } else {
      // Limpar o endereço se o CEP for modificado
      setValue("address", "");
      setValue("bairro", "");
      setValue("city", "");
      setValue("estado", "");
      setRegiao("");
    }
  }, [cep, refetch, setValue]);
  const onSubmit = (data: DeliveryAddressForm) => {
    setIsFormSubmitted(true);
    onContinue(data);
  };
  console.log(errors);
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
          <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
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
            {data && (
              <>
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
                <div className="flex flex-row gap-2 justify-between">
                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="number"
                        label="Número"
                        className="w-full"
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
                        id="complement"
                        label="Complemento"
                        className="w-full"
                        placeholder="Digite o complemento"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-row gap-2">
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
                      render={({ field }) => {
                        return (
                          <Select
                            {...field}
                            defaultValue={field.value}
                            onValueChange={(value) => {
                              if (value) field.onChange(value);
                            }}
                          >
                            <SelectTrigger id="estado" className="w-full">
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
                        );
                      }}
                    />
                  </div>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="city"
                        label="Cidade"
                        placeholder="Digite a cidade"
                        {...field}
                        error={errors.city?.message}
                        className="w-full"
                      />
                    )}
                  />
                </div>
                <Controller
                  name="shippingOptionValue"
                  control={control}
                  render={({ field }) => {
                    return (
                      <RadioGroup {...field} onValueChange={field.onChange}>
                        {shippingOptions.map((option) => (
                          <div
                            className="bg-zinc-100 rounded-lg w-full flex flex-row px-6"
                            key={option.shippingOptionId ?? option.id}
                          >
                            <RadioGroupItem
                              value={(
                                (option.fixedShipping[
                                  REGION_DIC[regiao as keyof typeof REGION_DIC]
                                ] ??
                                  option.shippingOption?.fixedShipping[
                                    REGION_DIC[
                                      regiao as keyof typeof REGION_DIC
                                    ]
                                  ]) / 100
                              ).toString()}
                              id={option.shippingOptionId ?? option.id}
                              className="my-4 mr-2"
                            />
                            <Label
                              htmlFor={option.shippingOptionId ?? option.id}
                              className="flex w-full py-4"
                            >
                              <div className="flex flex-row justify-between w-full">
                                <span>
                                  {option.description ??
                                    option.shippingOption?.description}
                                </span>
                                <p>
                                  {(
                                    (option.fixedShipping[
                                      REGION_DIC[
                                        regiao as keyof typeof REGION_DIC
                                      ]
                                    ] ??
                                      option.shippingOption?.fixedShipping[
                                        REGION_DIC[
                                          regiao as keyof typeof REGION_DIC
                                        ]
                                      ]) / 100
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    );
                  }}
                />
              </>
            )}

            <Button text="Continuar" icon={<MoveRight />} type="submit" />
          </div>
        </form>
      )}
    </div>
  );
}
