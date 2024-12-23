import Divider from "../Divider";
import Image from "next/image";
interface FooterProps {
  phone?: string;
  showPayment?: boolean;
  name?: string;
  email?: string;
  address?: string;
  document?: string;
  termsOfUse?: string;
  privacyPolicy?: string;
  tradesAndReturns?: string;
  backgroundColor: string;
  color: string;
}
export default function Footer({
  backgroundColor,
  color,
  address,
  email,
  name,
  document,
  phone,
  privacyPolicy,
  showPayment,
  termsOfUse,
  tradesAndReturns,
}: FooterProps) {
  return (
    <div
      className="mt-10"
      style={{
        color,
        backgroundColor,
      }}
    >
      <div className="flex flex-col w-full mb-4 px-6 md:px-28">
        <Divider className="w-full h-3" />
        <div className="flex flex-col items-center">
          {showPayment && (
            <div className="flex flex-col items-center gap-2 p-6 mt-3">
              <h1
                className="w-full text-center text-sm font-normal"
                style={{
                  color,
                }}
              >
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
          )}
        </div>
        {(name || document) && (
          <p
            className="flex uppercase w-full justify-center items-center text-sm font-normal"
            style={{
              color,
            }}
          >
            {name && name}  {name && document && "-"}  
            {document && `CNPJ: ${document}`}
          </p>
        )}
        <div className="flex flex-col w-full justify-center items-center px-6">
          {address && (
            <p
              className="uppercase text-sm font-normal "
              style={{
                color,
              }}
            >
              {address}
            </p>
          )}
          {email && (
            <p
              className="uppercase text-sm font-normal style={{
            color
          }}"
            >
              {email}
            </p>
          )}
          {phone && (
            <p
              className="uppercase text-sm font-normal "
              style={{
                color,
              }}
            >
              Whatsapp: {phone}
            </p>
          )}
          {(termsOfUse || tradesAndReturns) && (
            <div className="flex justify-center items-center gap-4 text-sm font-normal ">
              {termsOfUse && (
                <a href={termsOfUse} target="_blank" rel="noreferrer">
                  Termos de Uso
                </a>
              )}
              {termsOfUse && tradesAndReturns && <span>|</span>}
              {tradesAndReturns && (
                <a href={tradesAndReturns} target="_blank" rel="noreferrer">
                  Trocas e Devoluções
                </a>
              )}
            </div>
          )}
          {privacyPolicy && (
            <div className="flex justify-center items-center gap-4 text-sm font-normal ">
              <a href={privacyPolicy} target="_blank" rel="noreferrer">
                Política de Privacidade
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
