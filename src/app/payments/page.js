import React from "react";
import Payments from "../../components/Payments";

export const metadata = {
  title: "Checkout & Payments | ZanziHome",
  description: "Secure payments for ZanziHome property listings.",
  alternates: {
    canonical: "https://www.zanzihome.com/payments",
  },
};

export default function PaymentsPage() {
  return <Payments />;
}
