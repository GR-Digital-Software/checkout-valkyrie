"use client";
import React, { useState } from "react";
import Button from "../Button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import OrderCart from "../OrderCart";
interface HeaderProps {
  logo: string;
}
export default function Header({ logo }: HeaderProps) {
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

      <OrderCart setIsOpen={setIsOpen} isOpen={isOpen} />
    </header>
  );
}
