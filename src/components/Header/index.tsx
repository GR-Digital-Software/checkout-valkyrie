"use client";
import React, { useState } from "react";
import Button from "../Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import OrderCart from "../OrderCart";
import { PlanProductsType } from "@/types/planProducts";
import { cn } from "@/lib/utils";
interface HeaderProps {
  logo: string;
  planProducts?: PlanProductsType[];
  logoAlignment: "left" | "middle" | "right";
}

const ALIGNMENT_DIC = {
  left: "md:justify-start",
  middle: "md:justify-center",
  right: "md:justify-end",
};
export default function Header({
  logo,
  planProducts,
  logoAlignment,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "bg-white flex w-full items-center justify-between px-6 py-5 h-20",
        ALIGNMENT_DIC[logoAlignment]
      )}
    >
      <Image
        src={logo}
        alt="Logo"
        width={50}
        height={50}
        className="aspect-square"
      />
      <Button
        className="block sm:hidden"
        variant="outline"
        icon={<ShoppingCart size={16} />}
        iconPosition="center"
        onClick={() => setIsOpen(true)}
      />
      {planProducts && (
        <OrderCart
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          planProducts={planProducts}
        />
      )}
    </header>
  );
}
