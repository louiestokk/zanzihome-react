import React from "react";
import Contact from "../../views/contact";

export const metadata = {
  title: "Contact Us | ZanziHome Real Estate Zanzibar",
  description: "Get in touch with ZanziHome. Contact customer support, real estate agencies, or individual sellers in Zanzibar.",
  alternates: {
    canonical: "https://www.zanzihome.com/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
