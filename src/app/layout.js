import React from "react";
import StyledComponentsRegistry from "../utils/registry";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";
import "leaflet/dist/leaflet.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://www.zanzihome.com"),
  title: "Real Estate Zanzibar | Properties for Sale & Rent",
  description: "Find real estate in Zanzibar – houses, villas, apartments, land and plots for sale or rent. Discover beachfront homes and top investment opportunities today.",
  keywords: "real estate zanzibar, zanzibar property for sale, zanzibar villas, zanzibar apartments, zanzibar land for sale",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://www.zanzihome.com/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  other: {
    "geo.region": "TZ",
    "geo.placename": "Zanzibar",
  },
};

/*
const staticSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZanziHome",
    "url": "https://www.zanzihome.com/",
    "logo": "https://www.zanzihome.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/zanzihome",
      "https://www.instagram.com/zanzihome"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Zanzibar"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ZanziHome",
    "url": "https://www.zanzihome.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.zanzihome.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "ZanziHome Real Estate",
    "url": "https://www.zanzihome.com/",
    "description": "Find houses, villas, apartments, land and plots for sale or rent in Zanzibar.",
    "areaServed": {
      "@type": "Place",
      "name": "Zanzibar"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZanziHome",
    "areaServed": "Zanzibar",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TZ"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Real Estate Zanzibar",
    "description": "Browse properties for sale and rent in Zanzibar including houses, villas, apartments, land and plots.",
    "url": "https://www.zanzihome.com/",
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ZanziHome",
      "url": "https://www.zanzihome.com/"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Properties in Zanzibar",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": 100,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Villa in Paje",
        "url": "https://www.zanzihome.com/buy/villa/paje"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Apartment in Nungwi",
        "url": "https://www.zanzihome.com/buy/apartment/nungwi"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Properties for Sale in Zanzibar",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "House",
          "name": "Villa in Paje"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Land",
          "name": "Plot in Jambiani"
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zanzihome.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Buy Property",
        "item": "https://www.zanzihome.com/buy"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Zanzibar",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.1659,
      "longitude": 39.2026
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can foreigners buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreigners can buy property in Zanzibar through long-term leasehold agreements, typically up to 99 years, but cannot own land outright."
        }
      },
      {
        "@type": "Question",
        "name": "Can foreigners own land in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all land in Zanzibar is owned by the government. Foreigners can only access land through leasehold structures or approved investment projects."
        }
      },
      {
        "@type": "Question",
        "name": "What is leasehold property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leasehold property means you have the right to use and own a property for a long period, usually 33, 66, or 99 years, with renewal options."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zanzibar a good place to invest in real estate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Zanzibar is a growing real estate market with increasing tourism, high rental demand, and strong long-term investment potential."
        }
      },
      {
        "@type": "Question",
        "name": "What types of property can foreigners buy in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Foreigners can buy apartments, villas, resort residences, and properties within approved developments or condominium projects."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need government approval to buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreign buyers must obtain approval from the Zanzibar Investment Promotion Authority (ZIPA) before completing a property purchase."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The process typically takes between 60 to 120 days depending on approvals, documentation, and property type."
        }
      },
      {
        "@type": "Question",
        "name": "What are the costs of buying property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Buyers should expect additional costs such as legal fees, stamp duty, transfer tax, and annual ground rent on leasehold property."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get residency by buying property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreign investors who purchase approved property (typically above $100,000) may qualify for a renewable residency permit."
        }
      },
      {
        "@type": "Question",
        "name": "Can I rent out my property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, property owners can legally rent out their property for short-term or long-term stays, including Airbnb rentals."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you follow the legal process, verify ownership, and work with trusted agents and lawyers. Always ensure the property is ZIPA-approved."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best areas to buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popular areas include Paje, Nungwi, Kendwa, Jambiani, and Stone Town, known for tourism and high rental demand."
        }
      },
      {
        "@type": "Question",
        "name": "Can I buy property in Zanzibar without visiting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can complete a purchase remotely using a legal representative with power of attorney."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when the 99-year lease expires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leasehold agreements are renewable, and owners can extend their lease by applying through the Land Commission."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zanzibar real estate cheaper than other markets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, property prices in Zanzibar are generally lower compared to many international beachfront markets, making it attractive for investors."
        }
      }
    ]
  }
];
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
        
        {/* EmailJS CDN script integration for compatibility */}
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" defer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (typeof emailjs !== 'undefined') {
                  emailjs.init("CL-gbXxFWO6fGlczt");
                }
              })();
            `,
          }}
          defer
        />
      </body>
    </html>
  );
}
