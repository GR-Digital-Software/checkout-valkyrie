"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { CircleUser, MoveRight } from "lucide-react";
import { z } from "zod";
import Input from "../../Input";
import Button from "../../Button";
import { InfoCard } from "./Card";

const personalInfoSchema = z.object({
  email: z.string().email("Insira um e-mail válido."),
  name: z.string().min(1, "O nome é obrigatório."),
  cpf: z.string(),
  phone: z.string(),
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

export default function PersonalInformation({
  isFormVisible,
  onContinue,
  setCurrentStep,
}: {
  isFormVisible: boolean;
  onContinue: (data: any) => void;
  setCurrentStep: Dispatch<SetStateAction<"personal" | "delivery" | "payment">>;
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit = (data: PersonalInfoForm) => {
    setIsFormSubmitted(true);
    onContinue(data);
  };

  return (
    <div className="flex flex-col shadow-xl">
      <InfoCard
        icon={<CircleUser className="w-8 h-8 text-zinc-950" />}
        title="Informações Pessoais"
        description="Utilizaremos seu e-mail para: Identificar seu perfil, histórico de compra, notificação de pedidos e carrinho de compras."
        isFormVisible={isFormVisible}
        onEditClick={() => setCurrentStep("personal")}
        showEditButton={!isFormVisible && isFormSubmitted}
      />
      {isFormVisible && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white flex flex-col border-t border-zinc-200 p-6 gap-4 rounded-b-lg">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  label="Nome Completo"
                  placeholder="Ex.: John Doe"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="Ex.: johndoe@example.com"
                  {...field}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <Input
                  id="cpf"
                  label="CPF"
                  placeholder="Ex.: 000.000.000-00"
                  {...field}
                  error={errors.cpf?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  id="phone"
                  label="Celular"
                  placeholder="Ex.: (00) 00000-0000"
                  {...field}
                  error={errors.phone?.message}
                />
              )}
            />
            <Button
              text="Continuar"
              icon={<MoveRight />}
              iconPosition="right"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
}
