import React, { Suspense } from "react";
import AllPropertiesPage from "../../views/AllPropertiesPage";
import { getProperties } from "../../lib/db";

export const metadata = {
  title: "Properties for Sale & Rent in Zanzibar | ZanziHome",
  description: "Discover houses, villas, apartments, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility.",
  alternates: {
    canonical: "https://www.zanzihome.com/properties-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/properties-zanzibar",
    title: "Properties for Sale & Rent in Zanzibar | ZanziHome",
    description: "Browse Zanzibar real estate including beachfront villas, apartments, land and commercial properties. Featured listings available.",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
};

export default async function PropertiesZanzibarPage() {
  const properties = await getProperties();
  const listedProperties = properties.filter((property) => property && property.paid && !property.removed);
  
  // Generate JSON-LD Schema on server
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zanzihome.com/properties?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/zanzihome",
          "https://www.instagram.com/zanzihome"
        ]
      },
      {
        "@type": "RealEstateListing",
        "name": "ZanziHome Properties - Sale & Rent in Zanzibar",
        "url": "https://www.zanzihome.com/properties-zanzibar",
        "description": "Browse and find houses, apartments, villas, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility with ZanziHome.",
        "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "author": {
          "@type": "Organization",
          "name": "ZanziHome"
        }
      },
      {
        "@type": "CollectionPage",
        "name": "All Properties for Sale & Rent in Zanzibar",
        "description": "Discover houses, villas, apartments, land and commercial properties for sale or rent in Zanzibar.",
        "url": "https://www.zanzihome.com/properties-zanzibar",
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": listedProperties.length,
          "itemListElement": listedProperties.slice(0, 20).map((property, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": property.Title || "Property in Zanzibar",
            "url": `https://www.zanzihome.com/propertys/property/${property.adId}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zanzihome.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "All Properties",
            "item": "https://www.zanzihome.com/properties-zanzibar"
          }
        ]
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I search for properties in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the search filters on ZanziHome to browse properties by type (houses, apartments, land), location, price range, and offer type (sale or rent). You can also browse featured listings by area."
        }
      },
      {
        "@type": "Question",
        "name": "Can foreigners buy property in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreigners can buy property in Zanzibar through secure leasehold structures (typically 33-99 years). The government actively encourages foreign investment through ZIPA regulations."
        }
      },
      {
        "@type": "Question",
        "name": "What are typical property prices in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prices vary significantly by location and property type. Beachfront villas range from $250,000-$1M+, apartments from $80,000-$220,000, and land plots from $15,000 depending on location."
        }
      },
      {
        "@type": "Question",
        "name": "What rental yields can I expect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rental yields in Zanzibar typically range from 10-18% annually for tourist-oriented properties, driven by strong vacation rental demand and tourism."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning={true}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning={true}
      />
      <Suspense fallback={<div>Loading properties...</div>}>
        <AllPropertiesPage initialProperties={properties} />
      </Suspense>
    </>
  );
}
