import React from "react";
import { notFound } from "next/navigation";
import SeoInvestPages from "../../../views/SeoInvestPages";
import { generateSeoInvestText } from "../../../utils/generateSeoText";
import { getProperties } from "../../../lib/db";
import { areas } from "../../../utils/seoData";
import { getListingImage } from "../../../utils/areaSeoContent";

function getAreaName(area) {
  const areaSlug = area.toLowerCase();
  return areas.find((value) => value.toLowerCase().replace(/\s+/g, "-") === areaSlug);
}

export async function generateMetadata({ params }) {
  const { area } = params;
  const areaName = getAreaName(area);
  const formattedArea = areaName || area;
  
  const seo = generateSeoInvestText(formattedArea);
  const canonical = `https://www.zanzihome.com/invest/${area}`;
  const properties = await getProperties();
  const metadataImage = getListingImage(
    properties.filter((property) => (
      property &&
      property.paid &&
      !property.removed &&
      property.Area?.toLowerCase().replace(/[\s-]/g, "") === formattedArea.toLowerCase().replace(/[\s-]/g, "")
    )),
    area
  );

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "ZanziHome",
      images: [
        {
          url: metadataImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [metadataImage],
    },
  };
}

export default async function InvestAreaPageRoute({ params }) {
  const areaName = getAreaName(params.area);
  if (!areaName) notFound();
  
  const properties = await getProperties();
  const activeProperties = properties.filter(
    (property) =>
      property &&
      property.paid &&
      !property.removed &&
      property.Area?.toLowerCase().replace(/[\s-]/g, "") === areaName.toLowerCase().replace(/[\s-]/g, "")
  );
  
  const canonical = `https://www.zanzihome.com/invest/${params.area}`;

  // Generate JSON-LD Schema on server
  const mainSchema = {
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
        "@type": "RealEstateAgent",
        "name": "ZanziHome Real Estate",
        "url": canonical,
        "areaServed": {
          "@type": "Place",
          "name": areaName
        },
        "description": `Investment opportunities in ${areaName}, Zanzibar with proven rental yields.`
      },
      {
        "@type": "CollectionPage",
        "name": `Real Estate Investment in ${areaName}, Zanzibar`,
        "description": `Explore investment properties and land in ${areaName}, Zanzibar with high rental yields and capital appreciation.`,
        "url": canonical,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": activeProperties.length,
          "itemListElement": activeProperties.slice(0, 20).map((property, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": property.Title || `Property in ${areaName}`,
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
            "name": "Zanzibar Real Estate Investment",
            "item": "https://www.zanzihome.com/invest-in-zanzibar"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Invest in ${areaName}`,
            "item": canonical
          }
        ]
      }
    ]
  };

  // FAQ Schema for investment properties
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why should I invest in real estate in ${areaName}, Zanzibar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${areaName} is experiencing rapidly increasing tourism and development. Property buyers here enjoy high capital gains, strong rental occupancy rates, and stable annual rental yields between 10% and 18%.`
        }
      },
      {
        "@type": "Question",
        "name": `Can a foreign investor purchase land or houses in ${areaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreign investors can purchase properties in approved developments under secure leasehold laws. The government provides legal protections and investment visas through ZIPA."
        }
      },
      {
        "@type": "Question",
        "name": `What is the average ROI for properties in ${areaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Rental ROI in ${areaName} ranges between 10% to 18% per year, primarily fueled by vacationers and expat leasing during peak tourism seasons.`
        }
      },
      {
        "@type": "Question",
        "name": "Are there professional property management services in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, there are several reputable property management companies in Zanzibar that will handle your rental listings, cleaning, check-ins, and maintenance for a percentage of the rental income."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
        suppressHydrationWarning={true}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning={true}
      />
      <SeoInvestPages
        area={params.area}
        properties={activeProperties}
      />
    </>
  );
}
