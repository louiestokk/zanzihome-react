import React from "react";
import PaymentInstructions from "../../views/PaymentInstructions";

export const metadata = {
  title: "Payment Instructions | ZanziHome",
  description: "Detailed bank transfer and local payment instructions for listing property on ZanziHome.",
  alternates: {
    canonical: "https://www.zanzihome.com/payments-instructions",
  },
};

export default function PaymentInstructionsPage() {
  return <PaymentInstructions />;
}
