import React from "react";
import ZanzipalmsDetailsPage from "../../../../../views/ZanzipalmsDetailsPage";
import { zanzipalmsStaticData } from "../../../../../utils/zanzipalmsData";

const siteUrl = "https://www.zanzihome.com";
const fallbackImage = "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getLocation(classList = []) {
  const locationClass = classList.find((item) => item.startsWith("property_city-"));

  if (!locationClass) return "Zanzibar";

  return locationClass
    .replace("property_city-", "")
    .replace(/-2$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getPropertyType(item) {
  const classes = item.class_list || [];
  const type = classes.find((className) => className.startsWith("property_type-")) || "";
  const title = item.title?.rendered?.toLowerCase() || "";

  if (type.includes("land") || type.includes("beachfront") || type.includes("farmland")) return "Land";
  if (type.includes("hotel") || type.includes("business")) return "CommercialProperty";
  if (title.includes("villa")) return "SingleFamilyResidence";
  if (title.includes("apartment") || title.includes("condo") || type.includes("condominium")) return "Apartment";

  return "SingleFamilyResidence";
}

async function getZanzipalmsProperty(id) {
  try {
    const response = await fetch(`https://zanzipalms.com/wp-json/wp/v2/property/${id}?_embed`, {
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const [wpProperty, staticProperty] = await Promise.all([
    getZanzipalmsProperty(id),
    Promise.resolve(zanzipalmsStaticData[id]),
  ]);

  const property = wpProperty || staticProperty;

  if (!property) {
    return {
      title: "Zanzipalms Partner Property | ZanziHome",
      description: "Explore luxury partner properties in Zanzibar.",
    };
  }

  const title = wpProperty?.title?.rendered || property.title || "Zanzipalms Partner Property";
  const location = wpProperty ? getLocation(wpProperty.class_list) : property.Area || "Zanzibar";
  const price = staticProperty?.price || "Price on Request";
  const size = staticProperty?.size;
  const bedrooms = staticProperty?.bedrooms;
  const detail = [
    price !== "Price on Request" ? `priced at ${price}` : null,
    bedrooms ? `${bedrooms} bedrooms` : null,
    size ? `${size} m2` : null,
  ].filter(Boolean).join(", ");
  const description = `${stripHtml(wpProperty?.excerpt?.rendered || wpProperty?.content?.rendered).slice(0, 130) || `Explore ${title}, a Zanzipalms property in ${location}, Zanzibar`}${detail ? `. ${detail}` : ""}.`;
  const canonical = `${siteUrl}/partners/zanzipalms/property/${id}`;
  const image = wpProperty?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallbackImage;

  return {
    title: `${title} in ${location}, Zanzibar | ZanziHome`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      title: `${title} in ${location}, Zanzibar | ZanziHome`,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} in ${location}, Zanzibar | ZanziHome`,
      description,
      images: [image],
    },
  };
}

export default async function ZanzipalmsDetailsPageRoute({ params }) {
  const { id } = params;
  const [wpProperty, staticProperty] = await Promise.all([
    getZanzipalmsProperty(id),
    Promise.resolve(zanzipalmsStaticData[id]),
  ]);
  const title = wpProperty?.title?.rendered || "Zanzipalms Partner Property";
  const location = wpProperty ? getLocation(wpProperty.class_list) : "Zanzibar";
  const image = wpProperty?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallbackImage;
  const description = stripHtml(wpProperty?.excerpt?.rendered || wpProperty?.content?.rendered) || `Explore ${title} in ${location}, Zanzibar.`;
  const price = staticProperty?.price?.replace(/[^\d.]/g, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/partners/zanzipalms/property/${id}#webpage`,
        url: `${siteUrl}/partners/zanzipalms/property/${id}`,
        name: `${title} in ${location}, Zanzibar`,
        description,
        mainEntity: { "@id": `${siteUrl}/partners/zanzipalms/property/${id}#property` },
      },
      {
        "@type": getPropertyType(wpProperty || {}),
        "@id": `${siteUrl}/partners/zanzipalms/property/${id}#property`,
        name: title,
        description,
        url: `${siteUrl}/partners/zanzipalms/property/${id}`,
        image,
        address: {
          "@type": "PostalAddress",
          addressLocality: location,
          addressRegion: "Zanzibar",
          addressCountry: "TZ",
        },
        ...(staticProperty?.bedrooms ? { numberOfRooms: staticProperty.bedrooms } : {}),
        ...(staticProperty?.size ? { floorSize: { "@type": "QuantitativeValue", value: staticProperty.size, unitCode: "MTK" } } : {}),
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/partners/zanzipalms/property/${id}`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "RealEstateAgent", name: "Zanzipalms" },
          ...(price ? { price } : {}),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ZanzipalmsDetailsPage />
    </>
  );
}
