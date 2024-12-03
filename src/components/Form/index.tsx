import DeliveryAddress from "./components/DeliveryAddress";
import PaymentMethod from "./components/PaymentMethod";
import PersonalInformation from "./components/PersonalInformation";

export default function Form() {
  return (
    <div className="flex flex-col w-full h-fit px-6 gap-8 ">
      <PersonalInformation />
      <DeliveryAddress />
      <PaymentMethod />
    </div>
  );
}
