import React from "react";
import Vehicle from "../../views/Vehicle";

export const metadata = {
  title: "Rent Cars and Motorcycles in Zanzibar",
  description: "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs",
  alternates: {
    canonical: "https://www.zanzihome.com/car-rental-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/car-rental-zanzibar",
    title: "Rent Cars and Motorcycles in Zanzibar",
    description: "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs",
    images: [
      {
        url: "https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
  },
};

export default function CarRentalPage() {
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
          "target": "https://www.zanzihome.com/cars?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome Car Rental",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/zanzihome",
          "https://www.instagram.com/zanzihome"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "ZanziHome Car Rental Zanzibar",
        "url": "https://www.zanzihome.com/car-rental-zanzibar",
        "description": "Affordable car and motorcycle rentals in Zanzibar. Browse scooters, SUVs, and vehicles for daily or long-term rental.",
        "image": "https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-6.1667",
          "longitude": "39.2"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Zanzibar"
        }
      },
      {
        "@type": "CollectionPage",
        "name": "Car and Motorcycle Rentals in Zanzibar",
        "description": "Rent cars, SUVs, scooters and motorcycles in Zanzibar with affordable daily rates.",
        "url": "https://www.zanzihome.com/car-rental-zanzibar"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does it cost to rent a car in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Car rental prices in Zanzibar vary based on vehicle type and rental duration. Daily rates typically range from $30-$100+ depending on the vehicle category."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum age to rent a car in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most rental companies require renters to be at least 21-25 years old with a valid international or local driving license."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need insurance to rent a car in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, comprehensive insurance is recommended. Most rental companies offer insurance options. International driving licenses and vehicle insurance are highly recommended."
        }
      },
      {
        "@type": "Question",
        "name": "Can I rent a scooter or motorcycle in Zanzibar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, scooters and motorcycles are available for rent on ZanziHome at affordable daily rates, perfect for exploring the island."
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
      <Vehicle />
    </>
  );
}
