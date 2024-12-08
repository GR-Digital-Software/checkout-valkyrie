import TemplatePage from "@/components/TemplatePage";
import { cookies } from "next/headers";

export default async function Checkout() {
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
    <TemplatePage
      data={{ checkoutTemplate, salesPlan, store, shippingOptions }}
    />
  );
}
