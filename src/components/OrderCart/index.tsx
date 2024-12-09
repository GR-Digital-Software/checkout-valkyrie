import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerBody,
  DrawerContent,
} from "../Drawer";
import { Check, Info, ShoppingCartIcon, Ticket } from "lucide-react";
import CountdownTimer from "../CountdownTimer";
import Button from "../Button";
import ProductCard from "../ProductCard";
import Divider from "../Divider";
import Input from "../Input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlanProductsType } from "@/types/planProducts";
interface OrderCartProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  planProducts: PlanProductsType[];
}
const OrderCart: React.FC<OrderCartProps> = ({
  isOpen,
  setIsOpen,
  planProducts,
}) => {
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
      if (coupon.code === appliedCoupon) return;
      setAppliedCoupon(coupon.code);
      if (coupon.discountType === "percentage") {
        setPrice((prev) => prev - (prev * coupon.discount) / (100 * 100));
      } else {
        setPrice((prev) => prev - coupon.discount / 100);
      }
    }
  }, [data, hasAppliedCoupon, appliedCoupon]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerClose />
        {/* <DrawerHeader className="flex flex-col justify-start w-full border-b-2 border-dashed border-zinc-300">
          <DrawerTitle className="">
            <div className="flex flex-col">
              <div className="flex flex-row w-full justify-center items-end gap-3 text-red-600 text-sm font-bold">
                <Info size={24} />
                PRODUTO COM ALTA PROCURA
              </div>
              <p className="flex flex-row text-sm font-medium justify-center items-end text-zinc-950">
                Você tem <CountdownTimer /> para finalizar seu pedido
              </p>
            </div>
          </DrawerTitle>
        </DrawerHeader> */}
        <DrawerBody className="flex flex-col w-full p-6 gap-6 border-b-2 border-dashed">
          <Button
            icon={<ShoppingCartIcon size={18} />}
            iconPosition="left"
            text="SEU CARRINHO"
            wFull
          />
          {planProducts.map((planProduct, i) => (
            <ProductCard
              key={i}
              planProduct={planProduct}
              setFullPrice={setPrice}
            />
          ))}
        </DrawerBody>
        <DrawerFooter className="flex flex-col gap-4">
          <div className="flex justify-between items-end gap-2 h-10">
            <Input
              id="code"
              placeholder="Código do desconto"
              iconLeft={<Ticket size={18} color="#09090B" />}
              className="w-full"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              icon={<Check size={18} />}
              variant="default"
              className="w-10 h-full"
            />
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between w-full">
              <p className="text-zinc-950 text-sm font-semibold">Produtos</p>
              <p className="text-zinc-500 text-sm font-normal">
                R${" "}
                {(price / 12).toLocaleString("pt-br", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
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
          <div className="bg-[#22C55E33] rounded-md h-fit py-2 px-[10px]">
            <div className="flex flex-row justify-between w-full">
              <p className="text-green-500 text-sm font-semibold">Total</p>
              <p className="text-green-500 text-sm font-bold">
                R${" "}
                {(price / 12).toLocaleString("pt-br", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderCart;
