import React from "react";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiBriefcase, FiCheck, FiEdit3, FiGlobe, FiHome, FiMapPin, FiSend, FiTrendingUp, FiUpload, FiUsers } from "react-icons/fi";

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
      <section style={{ background: "linear-gradient(120deg, #17332b 0%, #0c281f 100%)", color: "#fff", padding: "78px 0" }}>
        <div style={{ ...shell, alignItems: "center", display: "grid", gap: "40px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div>
            <p style={{ ...eyebrow, alignItems: "center", display: "flex", gap: "8px" }}>✨ Reach Zanzibar's largest audience</p>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 50px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 18px" }}>Publish your listing for free!</h2>
            <p style={{ color: "#d8ded9", fontFamily: "Arial, sans-serif", fontSize: "17px", lineHeight: "1.75", maxWidth: "540px" }}>Get maximum visibility on Zanzibar's leading real estate platform. Showcase your villa, apartment or plot to thousands of active buyers and renters.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "26px" }}>
              <div style={{ alignItems: "center", display: "flex", fontFamily: "Arial, sans-serif", fontSize: "14px", gap: "8px" }}><FiCheck color="#d6a756" /> Free tier</div>
              <div style={{ alignItems: "center", display: "flex", fontFamily: "Arial, sans-serif", fontSize: "14px", gap: "8px" }}><FiCheck color="#d6a756" /> Instant live</div>
            </div>
            <div style={{ marginTop: "28px" }}><Link href="/checkout" style={button}>List your property now <FiArrowRight /></Link></div>
          </div>
          <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(214,167,86,.4)", borderRadius: "10px", padding: "40px 30px", textAlign: "center" }}>
            <p style={{ color: "#d6a756", fontSize: "clamp(44px, 6vw, 64px)", fontWeight: "700", lineHeight: "1", margin: 0 }}>10,000+</p>
            <p style={{ color: "#c7cec8", fontFamily: "Arial, sans-serif", fontSize: "15px", letterSpacing: "0.04em", margin: "10px 0 0", textTransform: "uppercase" }}>Active monthly users</p>
          </div>
        </div>
      </section>
      <section style={{ ...shell, paddingBottom: "74px", paddingTop: "86px" }}>
        <div style={{ maxWidth: "720px" }}><p style={eyebrow}>One island. Many opportunities.</p><h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "500", lineHeight: "1.08", margin: "14px 0 20px" }}>Give your Zanzibar property the context it deserves.</h2><p style={{ color: "#52635c", fontFamily: "Arial, sans-serif", fontSize: "17px", lineHeight: "1.8" }}>Buyers are looking beyond generic property adverts. They want to understand the beach, village, road access, development potential and lifestyle around an opportunity. Explain what makes your property valuable, whether it is a ready-to-move-in home in Stone Town, a rental villa in Paje, or land suited to a boutique hotel near the coast.</p></div>
        <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "42px" }}>{[[FiGlobe, "Reach a wider audience", "Present your opportunity to local and international buyers, tenants, investors and agencies exploring Zanzibar."], [FiMapPin, "Show the opportunity clearly", "Use the area, property type, size, price, photos and description to help serious prospects make an informed enquiry."], [FiTrendingUp, "Turn interest into enquiries", "A complete listing gives people the information they need to contact you about a home, rental, sale or development project."]].map(([Icon, title, text]) => <article key={title} style={{ background: "#fffdf8", borderTop: "3px solid #d6a756", padding: "26px 22px" }}><Icon color="#b7832e" size={25} /><h3 style={{ fontSize: "21px", fontWeight: "500", margin: "18px 0 9px" }}>{title}</h3><p style={{ color: "#596a63", fontFamily: "Arial, sans-serif", lineHeight: "1.65", margin: 0 }}>{text}</p></article>)}</div>
        <div style={{ marginTop: "38px" }}><Link href="/checkout" style={button}>Publish my listing <FiArrowRight /></Link></div>
      </section>
      <section style={{ background: "#17332b", color: "#fff", padding: "80px 0" }}>
        <div style={shell}>
          <div style={{ maxWidth: "720px" }}><p style={eyebrow}>As easy as it looks</p><h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "500", lineHeight: "1.08", margin: "14px 0 20px" }}>Publishing your property on ZanziHome takes minutes.</h2><p style={{ color: "#d8ded9", fontFamily: "Arial, sans-serif", fontSize: "17px", lineHeight: "1.8" }}>No agency required and no complicated forms. Fill in your details, add a few photos and your property is live for buyers and tenants across Zanzibar to discover.</p></div>
          <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "44px" }}>{[[FiEdit3, "1. Add your details", "Tell us the property type, location, size and price so buyers understand the opportunity."], [FiUpload, "2. Add photos & description", "Upload clear photos and describe the home, land or business to bring the listing to life."], [FiSend, "3. Publish for free", "Submit your listing and it becomes visible to people actively searching in Zanzibar."], [FiUsers, "4. Get contacted directly", "Interested buyers and tenants reach out to you, and you manage everything from your account."]].map(([Icon, title, text]) => <div key={title} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "8px", padding: "24px 20px" }}><Icon color="#d6a756" size={24} /><h3 style={{ fontSize: "18px", fontWeight: "500", margin: "16px 0 8px" }}>{title}</h3><p style={{ color: "#c7cec8", fontFamily: "Arial, sans-serif", fontSize: "14.5px", lineHeight: "1.6", margin: 0 }}>{text}</p></div>)}</div>
          <div style={{ marginTop: "38px" }}><Link href="/checkout" style={{ ...button, background: "#d6a756" }}>Get started now <FiArrowRight /></Link></div>
        </div>
      </section>
      <section style={{ background: "#e9eee7", padding: "78px 0" }}><div style={shell}><div style={{ alignItems: "center", display: "grid", gap: "44px", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}><div><p style={eyebrow}>Built for the Zanzibar market</p><h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 22px" }}>From a single home to a complete property portfolio.</h2><p style={{ color: "#52635c", fontFamily: "Arial, sans-serif", lineHeight: "1.75" }}>Whether you are a first-time landlord, a local owner, an estate agent or a developer with several plots, your listing can be structured around the details your audience needs.</p><Link href="/checkout" style={{ ...button, marginTop: "14px" }}>Start your listing <FiArrowRight /></Link></div><div style={{ display: "grid", gap: "14px" }}>{[[FiHome, "Homes and rentals", "Apartments, houses, villas, beachfront homes and long-term rentals."], [FiUsers, "Agencies and partners", "Bring visibility to agency inventory, new projects and managed properties."], [FiTrendingUp, "Land and hospitality projects", "Showcase land for sale, resort sites, hotel plots and investment opportunities."]].map(([Icon, title, text]) => <div key={title} style={{ background: "#fffdf8", display: "flex", gap: "16px", padding: "20px" }}><Icon color="#b7832e" size={24} /><div><h3 style={{ fontSize: "19px", fontWeight: "500", margin: "0 0 7px" }}>{title}</h3><p style={{ color: "#65746d", fontFamily: "Arial, sans-serif", lineHeight: "1.55", margin: 0 }}>{text}</p></div></div>)}</div></div></div></section>
      <section style={{ ...shell, paddingBottom: "78px", paddingTop: "78px" }}>
        <div style={{ alignItems: "center", display: "grid", gap: "44px", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>
          <div>
            <p style={eyebrow}>For real estate agencies & developers</p>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 22px" }}>Manage a full portfolio, not just one listing.</h2>
            <p style={{ color: "#52635c", fontFamily: "Arial, sans-serif", lineHeight: "1.75" }}>Agencies and developers can publish their entire inventory, from move-in ready apartments to large development plots, and keep every listing up to date under one account. Explore what is selling and renting across the island before you decide what to publish next.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "22px" }}>
              <Link href="/checkout" style={button}>List your portfolio <FiArrowRight /></Link>
              <Link href="/statistics" style={{ ...button, background: "transparent", border: "1px solid #17332b" }}>See market statistics <FiBarChart2 /></Link>
            </div>
          </div>
          <div style={{ display: "grid", gap: "14px" }}>{[[FiBriefcase, "Multiple listings, one account", "Publish and manage every property your agency or company represents in a single dashboard."], [FiTrendingUp, "Development & investment land", "Present hotel plots, resort sites and large land parcels with the detail serious investors expect."], [FiBarChart2, "Data to guide your next listing", "Check demand, pricing trends and popular areas on our statistics page before you publish."]].map(([Icon, title, text]) => <div key={title} style={{ background: "#fffdf8", border: "1px solid #e4e9e0", display: "flex", gap: "16px", padding: "20px" }}><Icon color="#b7832e" size={24} /><div><h3 style={{ fontSize: "19px", fontWeight: "500", margin: "0 0 7px" }}>{title}</h3><p style={{ color: "#65746d", fontFamily: "Arial, sans-serif", lineHeight: "1.55", margin: 0 }}>{text}</p></div></div>)}</div>
        </div>
      </section>
      <section style={{ ...shell, paddingBottom: "78px", paddingTop: "78px" }}><div style={{ maxWidth: "760px" }}><p style={eyebrow}>Questions from property owners</p><h2 style={{ fontSize: "clamp(31px, 4vw, 48px)", fontWeight: "500", lineHeight: "1.1", margin: "14px 0 30px" }}>List with clarity. Manage with confidence.</h2></div><div style={{ display: "grid", gap: "10px" }}>{faqs.map(([question, answer]) => <details key={question} style={{ background: "#fffdf8", borderBottom: "1px solid #d9ded8", fontFamily: "Arial, sans-serif", padding: "19px 20px" }}><summary style={{ cursor: "pointer", fontSize: "16px", fontWeight: "700" }}>{question}</summary><p style={{ color: "#596a63", lineHeight: "1.7", margin: "14px 26px 3px 0" }}>{answer}</p></details>)}</div></section>
      <section style={{ background: "#d6a756", color: "#17332b", padding: "64px 0" }}><div style={{ ...shell, alignItems: "center", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between" }}><div><p style={{ ...eyebrow, color: "#17332b" }}>Your next client may already be searching.</p><h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "500", margin: "12px 0 0" }}>Publish your Zanzibar property today.</h2></div><Link href="/checkout" style={{ ...button, background: "#17332b", color: "#fff" }}>List your property <FiArrowRight /></Link></div></section>
    </main>
  );
}
