"use client";

import Button from "@/components/Button";
import { Separator } from "@radix-ui/react-select";
import { Copy, CopyCheck, Link } from "lucide-react";
import { useState } from "react";

export default function PaymentCard() {
  const orderData = sessionStorage.getItem("orderData");
  const [isCopied, setIsCopied] = useState(false);

  if (!orderData) return null;
  const order = JSON.parse(orderData);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-lg gap-2 max-w-[500px] shadow-md py-6 px-8 flex flex-col justify-center items-center mx-auto">
      {order.payment.paymentMethod === "pix" && (
        <>
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
            aplicativo de pagamento ou Internet Banking (banco online). Neste
            caso, copie o código clicando no botão abaixo:
          </p>
          <Button text="Cópiar código" />
        </>
      )}
      {order.payment.paymentMethod === "boleto" && (
        <>
          <div className="bg-blue-100 py-3 rounded-md w-full mb-4">
            <p className="text-blue-800 font-medium text-center">
              Aguardando pagamento via Boleto...
            </p>
          </div>
          <p className="text-gray-700 text-center text-lg font-semibold mb-2">
            Detalhes do Boleto
          </p>
          <div className="bg-white shadow-sm rounded-md p-4 w-full border border-gray-300">
            <div className="flex items-center mb-2">
              <p className="font-medium">Código de Barras:</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={order.payment.boletoBarcode}
                readOnly
                className="w-full text-gray-700 text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleCopy(order.payment.boletoBarcode)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition"
              >
                {isCopied ? <CopyCheck size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="flex items-center mt-4 mb-2">
              <p className="font-medium">Data de Vencimento:</p>
            </div>
            <p className="text-gray-700">
              {new Date(order.payment.boletoExpiresAt).toLocaleDateString(
                "pt-BR"
              )}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={order.payment.boletoUrl}
                readOnly
                className="w-full text-gray-700 text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleOpenLink(order.payment.boletoUrl)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition flex items-center gap-1"
              >
                <Link size={16} />
              </button>
            </div>
          </div>
        </>
      )}
      {order.payment.paymentMethod === "credit_card" && (
        <>
          <div className="bg-green-100 py-3 rounded-md w-full mb-4">
            <p className="text-green-800 font-medium text-center">
              Pagamento aprovado!
            </p>
          </div>
          <p className="text-gray-700 text-center text-lg font-semibold mb-2">
            Detalhes do Pagamento
          </p>
          <div className="bg-white shadow-sm rounded-md p-4 w-full border border-gray-300">
            <div className="flex items-center mb-2">
              <p className="font-medium">Número do Pedido:</p>
            </div>
            <p className="text-gray-700 mb-4">{order.orderId}</p>
            <div className="flex items-center mb-2">
              <p className="font-medium">Total Pago:</p>
            </div>
            <p className="text-gray-700">
              R${" "}
              {(order.totalValue / 100).toLocaleString("pt-br", {
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <Separator className="my-4" />
            <p className="text-gray-700 text-center">
              Obrigado por sua compra! Você receberá um e-mail de confirmação
              com os detalhes do pedido.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
