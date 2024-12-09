"use client";
import React, { useState } from "react";
import Button from "../Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import OrderCart from "../OrderCart";
import { PlanProductsType } from "@/types/planProducts";
interface HeaderProps {
  logo: string;
  planProducts: PlanProductsType[];
}
export default function Header({ logo, planProducts }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white flex w-full items-center justify-between px-6 py-5 ">
      <Image src={logo} alt="Logo" width={100} height={100} />
      <Button
        className="block sm:hidden"
        variant="outline"
        icon={<ShoppingCart size={16} />}
        iconPosition="center"
        onClick={() => setIsOpen(true)}
      />

      <OrderCart
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        planProducts={planProducts}
      />
    </header>
  );
}
