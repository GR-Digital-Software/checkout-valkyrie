import Button from "@/components/Button";
import Header from "@/components/Header";
import { Separator } from "@radix-ui/react-select";
import { cookies } from "next/headers";
import PaymentCard from "./components/paymentCard";
import Footer from "@/components/Footer";

export default async function Payment() {
  const cookieStore = await cookies();
  const checkoutTemplateString = cookieStore.get("checkoutTemplate")?.value;
  const salesPlanString = cookieStore.get("salesPlan")?.value;
  const storeString = cookieStore.get("store")?.value;
  const shippingOptionsString = cookieStore.get("shippingOptions")?.value;
  if (
    !checkoutTemplateString ||
    !shippingOptionsString ||
    !salesPlanString ||
    !storeString
  )
    return null;
  const checkoutTemplate = JSON.parse(checkoutTemplateString);
  const store = JSON.parse(storeString);
  const salesPlan = JSON.parse(salesPlanString);
  const shippingOptions = JSON.parse(shippingOptionsString);
  return (
    <div className="flex flex-col gap-4 bg-zinc-200 flex-[1] h-screen">
      <Header logo={checkoutTemplate.logoUrl} />
      <div className="px-6 md:px-28">
        <div className="border-b-zinc-300 border-b w-full px-6 md:px-28 pb-11">
          <div className="flex flex-col w-full max-w-[500px] mx-auto gap-4 border-b ">
            <PaymentCard />
            <div className="flex flex-col gap-4 text-center items-center jutify-center text-2xl">
              <h3 className="font-bold">Seu pedido está quase garantido...</h3>
              <p className="text-xl">
                Reservamos seu pedido, mas é por pouco tempo. Para garanti-lo
                você precisa efetuar o pagamento do pix em até <b>20:00</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer store={store} />
    </div>
  );
}
