"use client";
import { Trash2, X } from "lucide-react";
import Button from "../Button";
import { Dispatch, useEffect, useState } from "react";

interface ProductCardProps {
  setFullPrice: Dispatch<React.SetStateAction<number>>;
  planProduct: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    amount: number;
    unitPrice: number;
    currency: string;
    productId: number;
    planId: number;
    product: {
      id: number;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      name: string;
      image: string | null;
      description: string | null;
      amount: number;
      type: "physical" | "digital" | "raffle";
      status: "active" | "inactive";
      storeId: number;
      externalId: string;
      physicalProductId: number | null;
      digitalProductId: number | null;
      raffleProductId: number | null;
    };
  };
}
export default function ProductCard({
  setFullPrice,
  planProduct,
}: ProductCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [amount, setAmount] = useState(planProduct.amount);

  const handleIncrement = () => {
    setAmount((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setAmount((prevValue) => Math.max(prevValue - 1, 1));
  };

  const handleTrashClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
  };
  useEffect(() => {
    setFullPrice((amount * planProduct.unitPrice) / 100);
  }, [planProduct, setFullPrice, amount]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div
          className="rounded-lg border border-zinc-200 bg-cover bg-center w-[133px] h-[148px] flex flex-col"
          style={{
            backgroundImage: `url(${
              planProduct.product.image ?? "/checkout/product.png"
            })`,
          }}
        >
          {/* <div className="flex justify-end items-center p-2">
            <Button
              icon={<Trash2 size={14} color="#A1A1AA" />}
              variant="outline"
              className="w-7 h-7"
              onClick={handleTrashClick}
            />
          </div> */}
          {/* <div className="flex-grow" />
          <div className="bg-black w-full py-2 px-2 rounded-lg">
            <p className="text-center text-white font-normal text-xs">
              Restam apenas 4 unidades
            </p>
          </div> */}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-950 text-sm font-medium">
            {planProduct.product.name}
          </p>
          <p className="text-zinc-700 text-sm font-normal">
            {planProduct.product.description}
          </p>
          <p className="text-zinc-700 text-sm font-normal">
            R${" "}
            {(planProduct.unitPrice / 100).toLocaleString("pt-br", {
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <div className="flex flex-row w-fit rounded-lg">
            {/* <button
              className="w-7 h-7 text-zinc-400 flex items-center justify-center rounded-r-lg"
              onClick={handleIncrement}
            >
              +
            </button> */}
            <p className="w-7 h-7 text-zinc-950 font-medium text-center border-0 rounded-none">
              {amount} ×
            </p>
            {/* <button
              className="w-7 h-7 text-zinc-400 flex items-center justify-center rounded-l-lg"
              onClick={handleDecrement}
            >
              -
            </button> */}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="flex flex-row justify-start w-full gap-1 mt-2">
          <div className="bg-zinc-50 border border-zinc-200 p-3 justify-start rounded-lg w-full">
            <p className="text-xs font-medium text-black">
              Deseja realmente excluir?
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              icon={<X size={16} />}
              variant="outline"
              className="w-10 h-10"
              iconPosition="center"
              onClick={handleCancel}
            />
            <Button
              icon={<Trash2 size={16} />}
              variant="red"
              className="w-10 h-10"
              iconPosition="center"
              onClick={handleConfirmDelete}
            />
          </div>
        </div>
      )}
    </>
  );
}
