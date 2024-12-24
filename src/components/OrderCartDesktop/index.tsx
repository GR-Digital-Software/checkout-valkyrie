"use client";
import { Check, Info, ShoppingCartIcon, Ticket } from "lucide-react";
import Button from "../Button";
import ProductCard from "../ProductCard";
import Divider from "../Divider";
import Input from "../Input";
import { useEffect, useState } from "react";
import { PlanProductsType } from "@/types/planProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import ReminderBox from "../ReminderBox";

interface OrderCartDesktopProps {
  planProducts: PlanProductsType[];
}
export default function OrderCartDesktop({
  planProducts,
}: OrderCartDesktopProps) {
  const [code, setCode] = useState("");
  const [price, setPrice] = useState(0);
  const [hasAppliedCoupon, setHasAppliedCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  }>({
    code: "",
    discount: 0,
  });
  const { refetch, data } = useQuery({
    queryKey: ["coupon", code],
    queryFn: () => {
      setHasAppliedCoupon(false);
      return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons/validate?code=` + code
      );
    },
    enabled: false,
  });
  useEffect(() => {
    if (data && !hasAppliedCoupon) {
      const coupon = data.data;
      if (coupon.code === appliedCoupon.code) return;
      setAppliedCoupon(coupon);
      if (coupon.discountType === "percentage") {
        setPrice((prev) => prev - (prev * coupon.discount) / (100 * 100));
      } else {
        setPrice((prev) => prev - coupon.discount / 100);
      }
    }
  }, [data, hasAppliedCoupon, appliedCoupon]);
  return (
    <div className="flex flex-col gap-6 px-6 md:px-0 md:pr-28">
      <div className="flex flex-col flex-[1] bg-white shadow-xl gap-6 w-96 rounded-b-md">
        <div className="bg-black h-2"></div>
        <div className="w-full flex flex-col px-6 gap-2 h-fit">
          <Button
            icon={<ShoppingCartIcon size={18} />}
            iconPosition="left"
            text="SEU CARRINHO"
            wFull
          />
          <div className="border-b-2 pb-2 gap-4 flex flex-col border-dashed">
            {planProducts.map((planProduct, i) => (
              <ProductCard
                key={i}
                planProduct={planProduct}
                setFullPrice={setPrice}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between items-end gap-2 pb-2">
            <div className="flex flex-row gap-2 w-full justify-center items-end">
              <Input
                id="code"
                placeholder="Código do desconto"
                iconLeft={<Ticket size={18} color="#09090B" />}
                className="w-full"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                iconPosition="center"
                icon={<Check size={18} />}
                variant="default"
                onClick={() => refetch()}
              />
            </div>
            <Divider />
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-row justify-between w-full">
                <p className="text-zinc-950 text-sm font-semibold">Produtos</p>
                <p className="text-zinc-500 text-sm font-normal">
                  R${" "}
                  {price.toLocaleString("pt-br", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-zinc-950 text-sm font-semibold">Desconto</p>
                <p className="text-zinc-500 text-sm font-normal">
                  R${" "}
                  {(appliedCoupon.discount / 100).toLocaleString("pt-br", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="bg-[#22C55E33] rounded-md h-fit py-2 px-[10px] w-full">
              <div className="flex flex-row justify-between w-full">
                <p className="text-green-500 text-sm font-semibold">Total</p>
                <p className="text-green-500 text-sm font-bold">
                  R${" "}
                  {price.toLocaleString("pt-br", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-1">
              <Info size={12} color="black" />
              <span className="text-zinc-500 text-xs font-normal">
                ou em até 12 x
              </span>
              <span className="text-zinc-950 text-sm font-semibold">
                {" "}
                R${" "}
                {(price / 12).toLocaleString("pt-br", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <ReminderBox /> */}
    </div>
  );
}
