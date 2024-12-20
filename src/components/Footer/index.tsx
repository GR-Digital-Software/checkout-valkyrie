import Divider from "../Divider";
import Image from "next/image";
interface FooterProps {
  store: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string;
    document: string | null;
    documentType: string | null;
    logo: string | null;
    address: string | null;
    email: string;
    phone: string;
    paymentProcessorId: string | null;
    userId: number;
  };
}
export default function Footer({ store }: FooterProps) {
  return (
    <div className="bg-zinc-200">
      <div className="flex flex-col w-full mb-4 px-6">
        <Divider className="w-full h-3" />
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 p-6 mt-3">
            <h1 className="w-full text-center text-zinc-900 text-sm font-normal">
              Formas de pagamento
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mt-3 md:flex-row">
              <Image
                src={"/checkout/mastercard.svg"}
                alt="Mastercard"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/visa.svg"}
                alt="Visa"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/elo.svg"}
                alt="Elo"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/amex.svg"}
                alt="Amex"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/discover.svg"}
                alt="Discover"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/dinersclub.svg"}
                alt="Diners"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/aura.svg"}
                alt="Aura"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/hipercard.svg"}
                alt="Hipercard"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/pix.svg"}
                alt="Pix"
                width={39}
                height={26}
              />
              <Image
                src={"/checkout/boleto.svg"}
                alt="Boleto"
                width={39}
                height={26}
              />
            </div>
          </div>
        </div>

        <p className="flex uppercase w-full justify-center items-center text-sm font-normal text-zinc-700">
          {store.name}  -  CNPJ: 00.000.000/0000-00
        </p>
        <div className="flex flex-col w-full justify-center items-center px-6">
          <p className="uppercase text-sm font-normal text-zinc-700">
            Av. Juscelino Almeida, 192
          </p>
          <p className="uppercase text-sm font-normal text-zinc-700">
            {store.email}
          </p>
          <p className="uppercase text-sm font-normal text-zinc-700">
            Whatsapp: {store.phone}
          </p>
          <div className="flex justify-center items-center gap-4 text-sm font-normal text-zinc-700">
            <p>Termos de Uso</p>
            <span>|</span>
            <p>Trocas e Devoluções</p>
          </div>
          <div className="flex justify-center items-center gap-4 text-sm font-normal text-zinc-700">
            <p>Política de Privacidade</p>
          </div>
        </div>
      </div>
    </div>
  );
}
