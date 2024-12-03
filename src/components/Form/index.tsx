"use client";
import { useState } from "react";
import DeliveryAddress from "./components/DeliveryAddress";
import PaymentMethod from "./components/PaymentMethod";
import PersonalInformation from "./components/PersonalInformation";

export default function Form() {
    const [currentStep, setCurrentStep] = useState<"personal" | "delivery" | "payment">("personal");

    const handleNextStep = (step: "personal" | "delivery" | "payment") => {
        setCurrentStep(step);
    };

    return (
        <div className="flex flex-col w-full h-fit px-6 gap-8">
            <PersonalInformation
                isFormVisible={currentStep === "personal"}
                onContinue={() => handleNextStep("delivery")}
            />
            <DeliveryAddress
                isFormVisible={currentStep === "delivery"}
                onContinue={() => handleNextStep("payment")}
            />
            <PaymentMethod
                isFormVisible={currentStep === "payment"}
            />
        </div>
    );
}
