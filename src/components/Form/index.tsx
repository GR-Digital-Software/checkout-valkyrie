"use client";
import { useState } from "react";
import DeliveryAddress, {
  DeliveryAddressForm,
} from "./components/DeliveryAddress";
import PaymentMethod, { PaymentFormData } from "./components/PaymentMethod";
import PersonalInformation, {
  PersonalInfoForm,
} from "./components/PersonalInformation";
import { createOrder, getOrderInfo } from "@/services/orderService";
import { PlanProductsType } from "@/types/planProducts";
import { useRouter } from "next/navigation";

export default function Form({
  shippingOptions,
  planProducts,
  storeId,
  requiresShipping,
}: {
  shippingOptions: any[];
  planProducts: PlanProductsType[];
  storeId: string;
  requiresShipping: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "personal" | "delivery" | "payment"
  >("personal");
  const [formData, setFormData] = useState<{
    personalInformation?: PersonalInfoForm;
    deliveryAddress?: DeliveryAddressForm;
  }>({});
  const handleNextStep = (step: "personal" | "delivery" | "payment") => {
    setCurrentStep(step);
  };

  async function handleSubmit(data: PaymentFormData) {
    setLoading(true);
    try {
      const orderId = await createOrder(
        {
          paymentMethod: data.paymentMethod as "credit_card" | "pix" | "boleto",
          card:
            data.paymentMethod === "creditCard"
              ? {
                  billingAddress: {
                    city: formData.deliveryAddress!.city,
                    complement:
                      formData.deliveryAddress!.complement !== ""
                        ? formData.deliveryAddress!.complement
                        : undefined,
                    country: "BR",
                    district: formData.deliveryAddress!.bairro,
                    state: "CE",
                    street: formData.deliveryAddress!.address,
                    streetNumber: formData.deliveryAddress!.number,
                    zipCode: formData.deliveryAddress!.cep.replace("-", ""),
                  },
                  cvv: data.cvv!,
                  expMonth: Number(data.expirationMonth!),
                  expYear: Number(data.expirationYear!),
                  holderDocument: formData.personalInformation?.cpf
                    .replaceAll("-", "")
                    .replaceAll(".", "")!,
                  holderName: data.cardName!,
                  number: data.cardNumber!,
                }
              : undefined,
          customer: {
            cpf: formData
              .personalInformation!.cpf.replaceAll("-", "")
              .replaceAll(".", "")!,
            email: formData.personalInformation!.email,
            name: formData.personalInformation!.name,
            phone: formData
              .personalInformation!.phone!.replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("-", "")
              .replaceAll(" ", ""),
          },
          installments: data.installments
            ? Number(data.installments)
            : undefined,
          shipping: {
            fee: Number(formData.deliveryAddress!.shippingOptionValue),
            address: {
              city: formData.deliveryAddress!.city,
              complement:
                formData.deliveryAddress!.complement !== ""
                  ? formData.deliveryAddress!.complement
                  : undefined,
              country: "BR",
              district: formData.deliveryAddress!.bairro,
              state: "CE",
              street: formData.deliveryAddress!.address,
              streetNumber: formData.deliveryAddress!.number,
              zipCode: formData.deliveryAddress!.cep.replace("-", ""),
            },
          },
          value:
            planProducts.reduce(
              (total, product) => total + product.unitPrice,
              0
            ) / 100,
          items: planProducts.map((planProduct) => ({
            name: planProduct.product.name,
            quantity: planProduct.amount,
            unitPrice: planProduct.unitPrice,
            salesPlanProductId: planProduct.id,
          })),
        },
        storeId
      );
      const orderData = await getOrderInfo(orderId);
      sessionStorage.setItem("orderData", JSON.stringify(orderData));
      router.push("/payment");
    } catch (e) {
      return "error";
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col w-full h-fit px-6 md:px-0 md:pl-28 gap-8">
      <PersonalInformation
        isFormVisible={currentStep === "personal"}
        setCurrentStep={setCurrentStep}
        onContinue={(data: any) => {
          handleNextStep(requiresShipping ? "delivery" : "payment");
          setFormData((prev) => ({ ...prev, personalInformation: data }));
        }}
      />
      {requiresShipping && (
        <DeliveryAddress
          shippingOptions={shippingOptions}
          setCurrentStep={setCurrentStep}
          isFormVisible={currentStep === "delivery"}
          onContinue={(data: any) => {
            handleNextStep("payment");
            setFormData((prev) => ({ ...prev, deliveryAddress: data }));
          }}
        />
      )}
      <PaymentMethod
        loading={loading}
        isFormVisible={currentStep === "payment"}
        onContinue={handleSubmit}
      />
    </div>
  );
}
