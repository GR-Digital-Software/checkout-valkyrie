import Divider from "../Divider";
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <div className="flex flex-col w-full mb-4 px-6">
        <Divider />
        <div className="flex flex-wrap justify-center gap-2 p-6 mt-3">
          <h1 className="flex w-full justify-center text-zinc-900">
            Formas de pagamento
          </h1>
          <Image
            src={"/checkout/mastercard.svg"}
            alt="Mastercard"
            width={39}
            height={26}
          />
          <Image src={"/checkout/visa.svg"} alt="Visa" width={39} height={26} />
          <Image src={"/checkout/elo.svg"} alt="Elo" width={39} height={26} />
          <Image src={"/checkout/amex.svg"} alt="Amex" width={39} height={26} />
          <Image
            src={"/checkout/discover.svg"}
            alt="Discover"
            width={39}
            height={26}
          />
          <div className="w-full"></div>
          <Image
            src={"/checkout/dinersclub.svg"}
            alt="Diners"
            width={39}
            height={26}
          />
          <Image src={"/checkout/aura.svg"} alt="Aura" width={39} height={26} />
          <Image
            src={"/checkout/hipercard.svg"}
            alt="Hipercard"
            width={39}
            height={26}
          />
          <Image src={"/checkout/pix.svg"} alt="Pix" width={39} height={26} />
          <Image
            src={"/checkout/boleto.svg"}
            alt="Boleto"
            width={39}
            height={26}
          />
        </div>
        <div className="flex flex-col w-full justify-center items-center px-6">
          <p className="uppercase text-sm font-normal text-zinc-700">
            [NOME DA LOJA]  -  CNPJ: 00.000.000/0000-00
          </p>
          <p className="uppercase text-sm font-normal text-zinc-700">
            Av. Juscelino Almeida, 192
          </p>
          <p className="uppercase text-sm font-normal text-zinc-700">
            contato@suporte.com
          </p>
          <p className="uppercase text-sm font-normal text-zinc-700">
            Whatsapp: (00) 0000-0000
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
    </>
  );
}
