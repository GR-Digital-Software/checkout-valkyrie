import TemplatePage from "@/components/TemplatePage";
import { cookies } from "next/headers";

export default async function Checkout() {
  const cookieStore = await cookies();
  const cartString = cookieStore.get("cart")?.value;
  const shippingOptionsString = cookieStore.get("shippingOptions")?.value;
  if (!cartString || !shippingOptionsString) return null;
  const cart = JSON.parse(cartString);
  const shippingOptions = JSON.parse(shippingOptionsString);
  return <TemplatePage data={{ ...cart, shippingOptions }} />;
}
