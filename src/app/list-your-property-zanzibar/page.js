import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiGlobe, FiHome, FiMapPin, FiTrendingUp, FiUsers } from "react-icons/fi";

const pageUrl = "https://www.zanzihome.com/list-your-property-zanzibar";
const heroImage = "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1800&q=85";

export const metadata = {
  title: "List Your Property in Zanzibar for Sale or Rent | ZanziHome",
  description: "List your Zanzibar property for sale or rent and reach buyers, tenants, investors, and hospitality developers searching for homes, land, villas, apartments, hotels, and resort opportunities.",
  keywords: "list property Zanzibar, advertise property for sale Zanzibar, rent out house Zanzibar, sell land Zanzibar, list villa for rent Zanzibar, hotel plot for sale Zanzibar, resort development land Zanzibar, real estate agency listings Zanzibar",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "List Your Property in Zanzibar for Sale or Rent",
    description: "Put your Zanzibar property in front of serious buyers, tenants, investors, and hospitality developers on ZanziHome.",
    url: pageUrl,
    type: "website",
    images: [{ url: heroImage, width: 1800, height: 1200, alt: "Zanzibar beachfront property opportunity" }],
  },
};

const faqs = [
  ["Can I list a house, apartment, villa, land or business in Zanzibar?", "Yes. ZanziHome accepts homes, apartments, villas, beachfront plots, agricultural land, commercial buildings, hotels, guesthouses, businesses and other property opportunities for sale or rent across Zanzibar."],
  ["Can a private owner advertise a property without an agency?", "Yes. Private owners and landlords can publish their own listing and share accurate contact details so interested buyers or tenants can reach them directly."],
  ["Is ZanziHome useful for resort and hotel development land?", "Yes. Development land and hospitality opportunities can be presented with the location, land size, asking price, access information and development details that investors need before making an enquiry."],
  ["How do I edit my property after publishing it?", "Create an account with the same email address used for your listing, choose a password, log in, open your Account and select Manage Ads. From there you can update details, pricing and photos."],
  ["How quickly will my listing reach interested people?", "Your listing becomes available after publication. Clear photos, an accurate Zanzibar location, a complete description and a realistic price help the right audience understand and enquire about the opportunity."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: metadata.title, description: metadata.description, inLanguage: "en" },
    { "@type": "Service", "@id": `${pageUrl}#service`, name: "Zanzibar property listing service", serviceType: "Property advertising for sale and rent", provider: { "@type": "Organization", name: "ZanziHome", url: "https://www.zanzihome.com" }, areaServed: { "@type": "Place", name: "Zanzibar, Tanzania" }, url: pageUrl },
    { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const shell = { maxWidth: "1180px", margin: "0 auto", padding: "0 22px" };
const eyebrow = { color: "#d6a756", fontFamily: "Arial, sans-serif", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: "700" };
const button = { alignItems: "center", background: "#d6a756", borderRadius: "5px", color: "#17332b", display: "inline-flex", fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: "700", gap: "9px", padding: "15px 20px", textDecoration: "none" };

export default function ListYourPropertyPage() {
  return (
    <main style={{ background: "#f7f5ef", color: "#17332b", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header style={{ alignItems: "center", background: `linear-gradient(90deg, rgba(12, 40, 31, .94), rgba(12, 40, 31, .53)), url('${heroImage}') center/cover`, display: "flex", minHeight: "590px" }}>
        <div style={shell}><div style={{ color: "#fff", maxWidth: "700px" }}>
          <p style={eyebrow}>For owners, landlords, agents and developers</p>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 78px)", fontWeight: "500", lineHeight: "1.02", margin: "18px 0" }}>List your property in Zanzibar.</h1>
          <p style={{ color: "#f5f0e6", fontFamily: "Arial, sans-serif", fontSize: "19px", lineHeight: "1.65", maxWidth: "610px" }}>Put your house, apartment, villa, land, hotel or resort opportunity in front of people actively searching for property to buy, rent and invest in Zanzibar.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}><Link href="/checkout" style={button}>List your property now <FiArrowRight /></Link><Link href="/contact" style={{ ...button, background: "transparent", border: "1px solid rgba(255,255,255,.65)", color: "#fff" }}>Talk to our team</Link></div>
        </div></div>
      </header>
      <section style={{ background: "#17332b", color: "#fff", padding: "24px 0" }}><div style={{ ...shell, display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>{["Zanzibar-focused audience", "Sale and rental listings", "Homes to development land", "Simple listing management"].map((item) => <div key={item} style={{ alignItems: "center", display: "flex", fontFamily: "Arial, sans-serif", fontSize: "14px", gap: "9px" }}><FiCheck color="#d6a756" />{item}</div>)}</div></section>
      <section style={{ ...shell, paddingBottom: "74px", paddingTop: "86px" }}>
        <div style={{ maxWidth: "720px" }}><p style={eyebrow}>One island. Many opportunities.</p><h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "500", lineHeight: "1.08", margin: "14px 0 20px" }}>Give your Zanzibar property the context it deserves.</h2><p style={{ color: "#52635c", fontFamily: "Arial, sans-serif", fontSize: "17px", lineHeight: "1.8" }}>Buyers are looking beyond generic property adverts. They want to understand the beach, village, road access, development potential and lifestyle around an opportunity. Explain what makes your property valuable, whether it is a ready-to-move-in home in Stone Town, a rental villa in Paje, or land suited to a boutique hotel near the coast.</p></div>
        <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "42px" }}>{[[FiGlobe, "Reach a wider audience", "Present your opportunity to local and international buyers, tenants, investors and agencies exploring Zanzibar."], [FiMapPin, "Show the opportunity clearly", "Use the area, property type, size, price, photos and description to help serious prospects make an informed enquiry."], [FiTrendingUp, "Turn interest into enquiries", "A complete listing gives people the information they need to contact you about a home, rental, sale or development project."]].map(([Icon, title, text]) => <article key={title} style={{ background: "#fffdf8", borderTop: "3px solid #d6a756", padding: "26px 22px" }}><Icon color="#b7832e" size={25} /><h3 style={{ fontSize: "21px", fontWeight: "500", margin: "18px 0 9px" }}>{title}</h3><p style={{ color: "#596a63", fontFamily: "Arial, sans-serif", lineHeight: "1.65", margin: 0 }}>{text}</p></article>)}</div>
      </section>
      <section style={{ background: "#e9eee7", padding: "78px 0" }}><div style={shell}><div style={{ alignItems: "center", display: "grid", gap: "44px", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}><div><p style={eyebrow}>Built for the Zanzibar market</p><h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 22px" }}>From a single home to a complete property portfolio.</h2><p style={{ color: "#52635c", fontFamily: "Arial, sans-serif", lineHeight: "1.75" }}>Whether you are a first-time landlord, a local owner, an estate agent or a developer with several plots, your listing can be structured around the details your audience needs.</p><Link href="/checkout" style={{ ...button, marginTop: "14px" }}>Start your listing <FiArrowRight /></Link></div><div style={{ display: "grid", gap: "14px" }}>{[[FiHome, "Homes and rentals", "Apartments, houses, villas, beachfront homes and long-term rentals."], [FiUsers, "Agencies and partners", "Bring visibility to agency inventory, new projects and managed properties."], [FiTrendingUp, "Land and hospitality projects", "Showcase land for sale, resort sites, hotel plots and investment opportunities."]].map(([Icon, title, text]) => <div key={title} style={{ background: "#fffdf8", display: "flex", gap: "16px", padding: "20px" }}><Icon color="#b7832e" size={24} /><div><h3 style={{ fontSize: "19px", fontWeight: "500", margin: "0 0 7px" }}>{title}</h3><p style={{ color: "#65746d", fontFamily: "Arial, sans-serif", lineHeight: "1.55", margin: 0 }}>{text}</p></div></div>)}</div></div></div></section>
      <section style={{ ...shell, paddingBottom: "78px", paddingTop: "78px" }}><div style={{ maxWidth: "760px" }}><p style={eyebrow}>Questions from property owners</p><h2 style={{ fontSize: "clamp(31px, 4vw, 48px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 30px" }}>List with clarity. Manage with confidence.</h2></div><div style={{ display: "grid", gap: "10px" }}>{faqs.map(([question, answer]) => <details key={question} style={{ background: "#fffdf8", borderBottom: "1px solid #d9ded8", fontFamily: "Arial, sans-serif", padding: "19px 20px" }}><summary style={{ cursor: "pointer", fontSize: "16px", fontWeight: "700" }}>{question}</summary><p style={{ color: "#596a63", lineHeight: "1.7", margin: "14px 26px 3px 0" }}>{answer}</p></details>)}</div></section>
      <section style={{ background: "#d6a756", color: "#17332b", padding: "64px 0" }}><div style={{ ...shell, alignItems: "center", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between" }}><div><p style={{ ...eyebrow, color: "#17332b" }}>Your next client may already be searching.</p><h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "500", margin: "12px 0 0" }}>Publish your Zanzibar property today.</h2></div><Link href="/checkout" style={{ ...button, background: "#17332b", color: "#fff" }}>List your property <FiArrowRight /></Link></div></section>
    </main>
  );
}
