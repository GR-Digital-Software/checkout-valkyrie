"use client";

import Button from "@/components/Button";
import { Separator } from "@radix-ui/react-select";

export default function PaymentCard() {
  const orderData = sessionStorage.getItem("orderData");

  if (!orderData) return null;
  const order = JSON.parse(orderData);
  return (
    <div className="bg-white rounded-lg gap-2 max-w-[500px] shadow-md py-6 px-8 flex flex-col justify-center items-center mx-auto">
      <div className="bg-yellow-300 py-4 rounded-md w-full">
        <p className="text-yellow-700 w-full text-center">
          Aguardando pagamento...
        </p>
      </div>
      <p className="text-center">
        Leia o QRCode abaixo para efetuar seu pagamento
      </p>
      <img src={order.payment.pixQrCode} className="w-[200px] h-[200px]" />
      <p>Valor do Pix:</p>
      <b>
        R${" "}
        {(order.totalValue / 100).toLocaleString("pt-br", {
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </b>
      <Separator />
      <p className="text-center">
        Você também pode pagar escolhendo a opção Pix Copia e Cola no seu
        aplicativo de pagamento ou Internet Banking (banco online). Neste caso,
        copie o código clicando no botão abaixo:
      </p>
      <Button text="Cópiar código" />
    </div>
  );
}
