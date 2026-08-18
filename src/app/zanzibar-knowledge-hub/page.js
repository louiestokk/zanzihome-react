import React from "react";
import Link from "next/link";
import Abovefooter from "../../components/Abovefooter";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import { BiBookOpen, BiGlobe, BiHomeHeart, BiTrendingUp, BiFile, BiMapPin, BiWrench, BiUserCheck } from "react-icons/bi";

export const metadata = {
  title: "Zanzibar Real Estate Knowledge Hub | Investment Guides & Laws",
  description: "Access our complete library of Zanzibar property guides. Learn about foreign property ownership laws, Airbnb rental yields, residency permits, and top areas to invest.",
  keywords: "zanzibar real estate guides, buy property zanzibar guides, fumba town paje, property laws zanzibar, zanzibar investment wiki",
  alternates: {
    canonical: "https://www.zanzihome.com/zanzibar-knowledge-hub",
  },
  openGraph: {
    url: "https://www.zanzihome.com/zanzibar-knowledge-hub",
    title: "Zanzibar Real Estate Knowledge Hub | Investment Guides & Laws",
    description: "The ultimate resource center for buying, renting, and investing in property in Zanzibar. Understand taxes, 99-year leaseholds, and ROI metrics.",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Real Estate Resource Center | ZanziHome Hub",
    description: "Explore step-by-step guides on foreign ownership, residency permits, area comparisons, and construction guidelines.",
    images: ["https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"],
  },
};

const guides = [
  {
    title: "Foreign Property Ownership Laws",
    desc: "Understand the Condominium Act, 99-year leasehold structures, and how foreigners can legally and safely buy property.",
    url: "/foreign-property-ownership-zanzibar",
    icon: <BiFile />,
    tag: "Legal"
  },
  {
    title: "Zanzibar vs Bali vs Mauritius",
    desc: "Compare paradise island investment ROI, average entry prices, residency permits, and property tax frameworks side-by-side.",
    url: "/zanzibar-vs-bali-vs-mauritius-real-estate",
    icon: <BiGlobe />,
    tag: "Comparison"
  },
  {
    title: "Fumba Town & Paje Hotspots",
    desc: "An in-depth comparison of Zanzibar's top hubs: the pre-planned eco-city Fumba Town versus the beach tourism magnet Paje.",
    url: "/fumba-town-paje-real-estate",
    icon: <BiMapPin />,
    tag: "Location"
  },
  {
    title: "Rental Yields & Airbnb ROI",
    desc: "Analyze Zanzibar's high holiday rental yields, short-term vs long-term rentals, occupancy, and professional management models.",
    url: "/zanzibar-rental-yields-airbnb-investment",
    icon: <BiTrendingUp />,
    tag: "Finance"
  },
  {
    title: "Residency & Tax Incentives",
    desc: "Learn about the ZIPA Golden Visa program, tax exemptions, and how to get residence permits through property purchases.",
    url: "/residency-by-investment-zanzibar",
    icon: <BiUserCheck />,
    tag: "Government"
  },
  {
    title: "Zanzibar Buyer's Guide",
    desc: "Your step-by-step roadmap from property selection and legal due diligence to title registration at the Ministry of Lands.",
    url: "/buy-property-zanzibar",
    icon: <BiBookOpen />,
    tag: "Guide"
  },
  {
    title: "Best Areas to Buy Property",
    desc: "A geographic guide comparing beach quality, rental occupancy, infrastructure, and investment growth across Zanzibar.",
    url: "/best-areas-buy-property-zanzibar",
    icon: <BiHomeHeart />,
    tag: "Location"
  },
  {
    title: "Building & Construction Guide",
    desc: "Understand local building costs, finding architects, securing permits, and structural engineering advice for build projects.",
    url: "/build-house-zanzibar",
    icon: <BiWrench />,
    tag: "Construction"
  }
];

export default function KnowledgeHubPage() {
  return (
    <div className="seo-page-layout">
      {/* Hero Header */}
      <section className="seo-hero">
        <h1 className="seo-hero-title">ZanziHome Knowledge Hub</h1>
        <p className="seo-hero-subtitle">
          Your comprehensive resource center for buying, renting, investing, and living in Zanzibar.
        </p>
      </section>

      {/* Main Container */}
      <div className="seo-container">
        <main className="seo-main-content" style={{ maxWidth: "100%", width: "100%" }}>
          <article className="content-card" style={{ marginBottom: "30px", padding: "30px" }}>
            <h2>Information & Investment Resources</h2>
            <p>
              Navigating an international real estate market can be challenging. Whether you are a first-time holiday home buyer, 
              an experienced institutional investor, or planning to relocate to the Spice Island, our collection of expert guides 
              provides the clear, accurate, and legally verified data you need to proceed with confidence.
            </p>
          </article>

          {/* Cards Grid */}
          <div className="hub-grid">
            {guides.map((guide) => (
              <div className="hub-card" key={guide.title}>
                <div className="hub-card-header">
                  <span className="hub-card-icon">{guide.icon}</span>
                  <span className="hub-card-tag">{guide.tag}</span>
                </div>
                <h3 className="hub-card-title">{guide.title}</h3>
                <p className="hub-card-desc">{guide.desc}</p>
                <Link href={guide.url} className="hub-card-link">
                  Read Guide &rarr;
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div style={{ padding: "30px 15px 40px 15px" }}>
        <MatchRequestStepper />
      </div>
      <Abovefooter />
    </div>
  );
}
