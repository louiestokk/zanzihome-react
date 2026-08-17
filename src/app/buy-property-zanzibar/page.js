import React from "react";
import Link from "next/link";
import AdBanner from "../../components/AdBanner";

export const metadata = {
  title: "Buy Property Zanzibar Guide | Real Estate Zanzibar",
  description: "Comprehensive guide on how to buy real estate in Zanzibar, leasehold structures, and approved investments.",
  alternates: {
    canonical: "https://www.zanzihome.com/buy-property-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/buy-property-zanzibar",
    title: "Buy property Zanzibar - ZanziHome",
    description: "Comprehensive guide on how to buy real estate in Zanzibar, leasehold structures, and approved investments.",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
};

const pageData = {
  pageTitel: "Guide: Buy property in Zanzibar",
  whitebannerText: "Find Your Perfect Slice of Paradise",
  btntext: "Explore properties",
  underImgText:
    "If you are considering buying property in Zanzibar, you have come to the right place. We will summarize everything you need to know to make an informed decision about purchasing real estate on the island Zanzibar. From understanding the buying process to navigating local regulations, we have got you covered. Read on to learn more.",
  titleOne: "Can foreigners own property in Zanzibar?",
  textOne:
    "Foreigners can own property in Zanzibar under certain conditions. The Tanzanian government allows foreign nationals to purchase and own property in the country, including Zanzibar, as long as they comply with the applicable laws and regulations. The process of purchasing property in Zanzibar as a foreigner involves several steps. Firstly, you will need to obtain a Residence Permit from the Immigration Department, which is required for any foreigner seeking to own property in the country. Additionally, you will need to secure a Land Alienation Certificate from the Ministry of Lands, Housing, and Human Settlements Development.Once you have obtained these necessary permits, you can then proceed with purchasing the property of your choice in Zanzibar. It is worth noting that there are restrictions on the type of land that foreigners can own in Zanzibar, and some areas may be restricted to Tanzanian nationals only. Overall, owning property in Zanzibar as a foreigner is possible with the appropriate permits and compliance with the applicable laws and regulations. If you are interested in owning property in Zanzibar contact us and we will help you with the whole process",
  titleTwo: "This is what you need to do to buy property in Zanzibar",
  textTwo:
    "If you considering buying property in Zanzibar as a foreigner, there are a few key things to keep in mind. While the process of purchasing real estate on the island is generally straightforward, there are some specific regulations and requirements that apply to non-residents.First and foremost, it is important to work with a reputable local real estate agent or lawyer who is familiar with the buying process and can guide you through the necessary steps. They can help you identify suitable properties, negotiate with sellers, and ensure that all legal requirements are met. As a foreigner, you will need to obtain a certificate of no objection from the Zanzibar Investment Promotion Authority (ZIPA) before purchasing any property. This certificate confirms that the property does not pose any security or other concerns, and is typically obtained through your lawyer or agent. Additionally, non-residents are generally required to pay a 5% stamp duty fee on the purchase price of the property. This fee is payable to the Zanzibar Revenue Board and is typically collected by the seller on behalf of the buyer. It is also important to note that non-residents are not permitted to own property in certain areas of Zanzibar, such as those designated for agricultural use or located near military installations. Your lawyer or agent can advise you on any specific restrictions that may apply to your desired property. Finally, it is a good idea to have a thorough understanding of the local real estate market and property values before making an offer on a property. This can help you ensure that you are getting a fair price and can also help you identify potential investment opportunities. In conclusion, buying property in Zanzibar as a foreigner involves some specific regulations and requirements. Working with a local real estate agent or lawyer, obtaining a certificate of no objection, paying stamp duty fees, and being aware of any restrictions on property ownership are all important factors to consider. With careful research and guidance, however, purchasing real estate in Zanzibar can be a rewarding investment opportunity."
};

const topAreas = ["Paje", "Nungwi", "Jambiani", "Stone Town", "Kendwa"];
const topTypes = ["house", "villa", "apartment", "land", "beachfront", "plot"];

const internalLinks = [];
topAreas.forEach((area) =>
  topTypes.forEach((type) => {
    internalLinks.push({
      href: `/buy/${type.toLowerCase()}/${area.toLowerCase().replace(/\s+/g, "-")}`,
      label: `${type} in ${area}`
    });
  })
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "ZanziHome",
      "url": "https://www.zanzihome.com",
      "logo": "https://www.zanzihome.com/logo.png"
    },
    {
      "@type": "WebPage",
      "name": "Buy Property Zanzibar Guide | ZanziHome",
      "url": "https://www.zanzihome.com/buy-property-zanzibar",
      "description": pageData.underImgText,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zanzihome.com" },
          { "@type": "ListItem", "position": 2, "name": "Buy Property Zanzibar", "item": "https://www.zanzihome.com/buy-property-zanzibar" }
        ]
      }
    },
    {
      "@type": "Article",
      "headline": "Guide: Buy property in Zanzibar",
      "description": pageData.underImgText,
      "author": { "@type": "Person", "name": "Louie Stokk" },
      "datePublished": "2023-04-04T09:25:01.340Z",
      "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.zanzihome.com/buy-property-zanzibar"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.zanzihome.com/buy-property-zanzibar"
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can foreigners buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, foreigners can buy property in Zanzibar, typically through leasehold agreements approved by ZIPA."
          }
        },
        {
          "@type": "Question",
          "name": "What is the property buying process in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The process includes finding a property, working with an agent or lawyer, obtaining a certificate of no objection, paying fees, and signing a sales agreement."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Costs vary depending on property type and location, but buyers should also budget for stamp duty (around 5%), legal fees, and valuation costs."
          }
        },
        {
          "@type": "Question",
          "name": "Is Zanzibar a good place to invest in property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Zanzibar is a growing real estate market with increasing tourism, making it attractive for both rental income and long-term investment."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a lawyer to buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is highly recommended to work with a local lawyer to ensure all legal requirements are followed and documents are verified."
          }
        },
        {
          "@type": "Question",
          "name": "What taxes do I pay when buying property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Buyers typically pay stamp duty of around 5%, along with legal and registration fees."
          }
        },
        {
          "@type": "Question",
          "name": "Can I rent out my property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, many property owners rent out their homes to tourists or long-term tenants, especially in popular areas like Paje, Nungwi, and Jambiani."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to complete a property purchase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The process can take a few weeks to a few months depending on approvals, paperwork, and negotiations."
          }
        },
        {
          "@type": "Question",
          "name": "What is a certificate of no objection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a required approval from the government that allows foreigners to legally acquire property in Zanzibar."
          }
        },
        {
          "@type": "Question",
          "name": "Which areas are best to buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Popular areas include Paje, Nungwi, Kendwa, Jambiani, and Stone Town depending on whether you want beach property, investment potential, or city living."
          }
        }
      ]
    }
  ]
};

export default function BuyersGuidePage() {
  return (
    <main className="poppins" style={{ margin: "2rem auto", maxWidth: "1100px", padding: "0 1rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{pageData.pageTitel}</h1>
      <p style={{ lineHeight: 1.4, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Buying property in Zanzibar is becoming increasingly popular among international investors.
        With growing tourism, strong rental demand, and beautiful coastal locations,
        Zanzibar offers excellent opportunities for both lifestyle buyers and investors.
      </p>
      
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
          alt="buy property in Zanzibar"
          style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
        />
        <article style={{ position: "absolute", top: "20%", left: "2%" }}>
          <h4 style={{ background: "white", padding: "0.5rem 1rem", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            {pageData.whitebannerText}
          </h4>
          <Link href="/">
            <button style={{ marginTop: "0.5rem", background: "black", color: "white", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer", border: "none" }}>
              {pageData.btntext}
            </button>
          </Link>
        </article>
      </div>

      <p style={{ fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>{pageData.underImgText}</p>
      
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>{pageData.titleOne}</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{pageData.textOne}</p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h3>{pageData.titleTwo}</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{pageData.textTwo}</p>
      </div>

      <AdBanner />
      
      <div style={{ marginBottom: "2rem" }}>
        <h3>Step-by-step guide to purchasing property in Zanzibar</h3>
        <ol style={{ lineHeight: "1.7", marginLeft: "1rem" }}>
          <li>Identify a reputable local real estate agent or lawyer.</li>
          <li>Research the local real estate market for suitable properties.</li>
          <li>Contact the seller and negotiate terms.</li>
          <li>Obtain a certificate of no objection from ZIPA.</li>
          <li>Sign a Sales Agreement and pay deposit (10%).</li>
          <li>Hire a surveyor to verify property boundaries.</li>
          <li>Get an official valuation report from a licensed valuer.</li>
          <li>Apply for a Land Lease.</li>
          <li>Pay 5% stamp duty to Zanzibar Revenue Board.</li>
          <li>Complete the purchase by transferring ownership.</li>
        </ol>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
          Following these steps ensures a safe and legal purchase for foreigners.
        </p>
      </div>

      {/* Internal Links to 99 Pages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem", marginBottom: "3rem" }}>
        {internalLinks.map((link, i) => (
          <Link key={i} href={link.href} style={{ padding: "0.5rem 0.75rem", background: "#22c55e", color: "white", borderRadius: "6px", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}>
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{
        marginTop: "60px",
        padding: "30px",
        background: "#f8fafc",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
      }}>
        <h2 style={{
          fontSize: "28px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Frequently Asked Questions
        </h2>

        {[
          {
            q: "Can foreigners buy property in Zanzibar?",
            a: "Yes, foreigners can buy property in Zanzibar, typically through leasehold agreements approved by ZIPA."
          },
          {
            q: "What is the property buying process in Zanzibar?",
            a: "The process includes finding a property, working with an agent or lawyer, obtaining a certificate of no objection, paying fees, and signing a sales agreement."
          },
          {
            q: "How much does it cost to buy property in Zanzibar?",
            a: "Costs vary depending on property type and location, but buyers should also budget for stamp duty (around 5%), legal fees, and valuation costs."
          },
          {
            q: "Is Zanzibar a good place to invest in property?",
            a: "Yes, Zanzibar is a growing real estate market with increasing tourism, making it attractive for both rental income and long-term investment."
          },
          {
            q: "Do I need a lawyer to buy property in Zanzibar?",
            a: "Yes, it is highly recommended to work with a local lawyer to ensure all legal requirements are followed and documents are verified."
          },
          {
            q: "What taxes do I pay when buying property?",
            a: "Buyers typically pay stamp duty of around 5%, along with legal and registration fees."
          },
          {
            q: "Can I rent out my property in Zanzibar?",
            a: "Yes, many property owners rent out their homes to tourists or long-term tenants, especially in popular areas like Paje, Nungwi, and Jambiani."
          },
          {
            q: "How long does it take to complete a property purchase?",
            a: "The process can take a few weeks to a few months depending on approvals, paperwork, and negotiations."
          },
          {
            q: "What is a certificate of no objection?",
            a: "It is a required approval from the government that allows foreigners to legally acquire property in Zanzibar."
          },
          {
            q: "Which areas are best to buy property in Zanzibar?",
            a: "Popular areas include Paje, Nungwi, Kendwa, Jambiani, and Stone Town depending on whether you want beach property, investment potential, or city living."
          }
        ].map((item, i) => (
          <details key={i} style={{
            marginBottom: "12px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#ffffff",
            border: "1px solid #e5e7eb"
          }}>
            <summary style={{
              padding: "16px 18px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              listStyle: "none"
            }}>
              {item.q}
            </summary>
            <div style={{
              padding: "0 18px 16px 18px",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#555"
            }}>
              {item.a}
            </div>
          </details>
        ))}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/checkout" style={{ display: "inline-block", padding: "1rem 2rem", backgroundColor: "#22c55e", color: "#fff", fontWeight: "700", borderRadius: "9999px", textDecoration: "none" }}>
            List your property
          </Link>
        </div>
      </div>

      <div style={{ margin: "2rem 0", padding: '1rem', textAlign: 'center', maxWidth: '1000px' }}>
        <h2 className="best-airmax-text">Trusted by Our Clients</h2>
        <p style={{ lineHeight: '26px', marginTop: '0.5rem' }}>
          Join over <strong>1,540 satisfied clients</strong> who have found their ideal property in Zanzibar with ZanziHome. Our platform is your ultimate guide to <strong>Zanzibar real estate</strong>, offering both local and international buyers a reliable, user-friendly marketplace.
        </p>
        <img
          src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
          alt="Trustpilot reviews ZanziHome – properties for sale and rent in Zanzibar"
          style={{ height: "120px", width: "300px", objectFit: "cover" }}
        />
      </div>
    </main>
  );
}
