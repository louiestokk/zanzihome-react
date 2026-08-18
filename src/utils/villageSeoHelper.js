// src/utils/villageSeoHelper.js

import { villages } from "./data";

/**
 * Normalizes a string by converting it to lowercase and removing spaces/dashes.
 */
export const normalizeName = (str) => {
  return str ? str.toLowerCase().replace(/[-\s]/g, "") : "";
};

/**
 * Converts a village name to a clean URL slug.
 */
export const getSlug = (name) => {
  return name
    ? name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : "";
};

const customProfiles = {
  paje: {
    displayName: "Paje",
    introduction: "Paje is located on the southeast coast of Zanzibar, famous for its world-class kite-surfing, powdery white sand beach, and vibrant tourist scene. Known as the kite-surfing capital of the island, Paje has transformed into a highly dynamic real estate hub. It is popular with younger travellers, digital nomads, and investors seeking high rental yields from active vacationers.",
    marketOverview: "The property market in Paje is highly active, with land values appreciating rapidly over the last five years. Beachfront plots are scarce and command premium prices, while inland plots within walking distance to the sea offer great development potential for guest houses, hostels, or rental villas. High rental demand guarantees exceptional occupancy rates.",
    priceTable: [
      { category: "Beachfront Plots", priceRange: "$120,000 - $350,000", notes: "High demand, limited supply" },
      { category: "Residential Land (walk to beach)", priceRange: "$15,000 - $60,000", notes: "Ideal for boutique villas" },
      { category: "Luxury Villas", priceRange: "$180,000 - $450,000", notes: "ROI up to 15% on holiday rentals" },
      { category: "Long-term Rentals (2BR)", priceRange: "$800 - $1,800 / month", notes: "Popular with expat residents" }
    ],
    localHighlights: [
      "Zanzibar's premier kitesurfing and water sports destination",
      "Vibrant nightlife, beach clubs, and diverse international restaurants",
      "Approximately 1 hour drive to Stone Town & Abeid Amani Karume International Airport",
      "High rental yields with strong year-round tourist presence"
    ],
    faqs: [
      {
        q: "Why is Paje so popular for real estate investment?",
        a: "Paje is the tourism engine of the southeast coast. Its popularity with active holidaymakers keeps rental occupancy rates consistently high (up to 75-80% in peak seasons), making it ideal for Airbnb/holiday villa rentals."
      },
      {
        q: "How far is Paje from the airport?",
        a: "Paje is about 50 km from Abeid Amani Karume International Airport, which takes approximately 55 to 65 minutes by taxi or car along well-maintained paved roads."
      },
      {
        q: "Can foreigners buy property in Paje?",
        a: "Yes, foreigners can purchase properties and land in Paje using long-term leaseholds (typically up to 99 years) or through ZIPA (Zanzibar Investment Promotion Authority) approved condominium developments."
      }
    ]
  },
  nungwi: {
    displayName: "Nungwi",
    introduction: "Nungwi, situated at the northernmost tip of Zanzibar, is widely considered the crown jewel of the island's tourism industry. Unlike the East Coast, Nungwi's beaches are largely non-tidal, allowing visitors to swim in the crystal-clear turquoise waters at any time of day. This unique feature has made Nungwi the prime hub for premium beach resorts, luxury villas, and commercial real estate.",
    marketOverview: "Nungwi commands some of the highest real estate prices in Zanzibar, driven by premium tourism. Beachfront commercial plots are highly sought after by hotel operators. Residential options range from luxury oceanfront villas to modern holiday apartments, all benefiting from excellent capital appreciation and a steady flow of high-spending international tourists.",
    priceTable: [
      { category: "Beachfront Plots", priceRange: "$150,000 - $500,000+", notes: "Best for commercial hotels/resorts" },
      { category: "Residential Land", priceRange: "$20,000 - $80,000", notes: "Located slightly inland" },
      { category: "Luxury Villas & Homes", priceRange: "$250,000 - $650,000", notes: "Premium finishes, private pools" },
      { category: "Short-term Villa Rentals", priceRange: "$100 - $500 / night", notes: "High luxury tourist demand" }
    ],
    localHighlights: [
      "Prisitine beaches unaffected by tides, offering 24/7 swimming",
      "Home to the famous Baraka Natural Aquarium (sea turtles sanctuary)",
      "Excellent deep-sea fishing and scuba diving excursions",
      "Bustling village atmosphere with local crafts, markets, and premium dining"
    ],
    faqs: [
      {
        q: "Is Nungwi a safe area to invest in?",
        a: "Nungwi is highly secure and is Zanzibar's most established tourism hotspot. It has a well-developed infrastructure, tourist police presence, and reliable services, making it extremely low-risk for property buyers."
      },
      {
        q: "What makes Nungwi unique compared to other Zanzibar beaches?",
        a: "Most beaches in Zanzibar experience drastic low tides where the sea recedes by hundreds of meters. Nungwi is one of the few areas where the beach is completely swimmable all day long."
      }
    ]
  },
  jambiani: {
    displayName: "Jambiani",
    introduction: "Jambiani is a stunning, traditional fishing village on the southeast coast of Zanzibar, stretching over several kilometers of pristine white sands. Offering a quieter, more authentic, and environmentally-conscious alternative to nearby Paje, Jambiani is highly popular among visitors seeking natural peace, boutique eco-resorts, and deep cultural experiences.",
    marketOverview: "Real estate in Jambiani has seen a steady rise in popularity, particularly for boutique hotel projects and private holiday villas. Prices are slightly more affordable than in Paje, but the area is catching up quickly. Investors choose Jambiani for its serene environment, beautiful coral-reef lagoons, and authentic Zanzibar aesthetic.",
    priceTable: [
      { category: "Beachfront Plots", priceRange: "$100,000 - $280,000", notes: "Beautiful views, sandy shoreline" },
      { category: "Residential Land", priceRange: "$12,000 - $45,000", notes: "Slightly setback, quiet surroundings" },
      { category: "Boutique Villas", priceRange: "$150,000 - $350,000", notes: "Excellent rental appeal" },
      { category: "Short-term Rentals", priceRange: "$40 - $200 / night", notes: "Boutique hotels and Airbnb villas" }
    ],
    localHighlights: [
      "Tranquil, authentic atmosphere with local fishing and seaweed farms",
      "Home to Kuza Cave, a famous prehistoric limestone cave and pool",
      "Beautiful coral reef offering excellent snorkeling and sandbank walks at low tide",
      "Just 10 minutes south of Paje, giving access to kitesurfing and restaurants"
    ],
    faqs: [
      {
        q: "Who is Jambiani suited for?",
        a: "Jambiani is perfect for investors looking to build quiet holiday retreats, retirement homes, or boutique hotels targeting eco-travelers and tourists who value local Swahili culture."
      },
      {
        q: "What attraction is Jambiani famous for?",
        a: "Jambiani is famous for the stunning Kuza Cave, a fresh-water subterranean pool surrounded by lush jungle, as well as its historic village walks and local seaweed farming cooperatives."
      }
    ]
  },
  kendwa: {
    displayName: "Kendwa",
    introduction: "Kendwa is situated on the northwest coast of Zanzibar, just south of Nungwi. Known for its broad, powdery white beach and deep, swimmable non-tidal lagoon, Kendwa offers a premium beach club lifestyle. It hosts the island's legendary Full Moon Parties and attracts upscale travelers looking for top-tier beach resorts and luxury real estate.",
    marketOverview: "Real estate in Kendwa is premium and highly exclusive. Land plots near the beach are highly valued due to the superior quality of the beach and constant swimmability. Luxury villas, commercial beach clubs, and premium resort developments represent the majority of real estate activity here.",
    priceTable: [
      { category: "Beachfront Plots", priceRange: "$200,000 - $550,000", notes: "Ultra-premium location" },
      { category: "Residential Land", priceRange: "$25,000 - $100,000", notes: "Highly sought after for luxury builds" },
      { category: "Premium Villas", priceRange: "$300,000 - $800,000", notes: "Top-tier design and amenities" },
      { category: "Rentals (Luxury)", priceRange: "$120 - $600 / night", notes: "Excellent daily rates" }
    ],
    localHighlights: [
      "Broad, stunning beach with no tide changes—swim 24 hours a day",
      "Zanzibar's hotspot for premium beach entertainment and luxury resort living",
      "Excellent watersports, catamaran cruises, and parasailing",
      "High property demand with strong resale capital gains"
    ],
    faqs: [
      {
        q: "How does Kendwa compare to Nungwi?",
        a: "Both have non-tidal swimmable beaches, but Kendwa's beach is broader and tends to host larger luxury resorts and exclusive events, while Nungwi has a denser, busier village structure."
      }
    ]
  },
  "stone-town": {
    displayName: "Stone Town",
    introduction: "Stone Town is the historic, cultural, and administrative capital of Zanzibar, recognized as a UNESCO World Heritage site. Characterized by a labyrinth of narrow alleys, historic Arab-style architecture, and bustling spice markets, Stone Town offers a unique city living experience rooted in rich Indian Ocean history.",
    marketOverview: "Real estate in Stone Town is unique, focusing on the renovation and restoration of historical buildings rather than new construction. Heritage apartments, boutique guest houses, and commercial spaces (shops, cafes, offices) dominate the market. Restored properties hold high value for Airbnb rentals and cultural tourism.",
    priceTable: [
      { category: "Heritage Apartments", priceRange: "$60,000 - $180,000", notes: "Historical charm, central location" },
      { category: "Historical Buildings (to restore)", priceRange: "$120,000 - $350,000+", notes: "Requires government restoration permits" },
      { category: "Commercial Spaces", priceRange: "$150,000 - $500,000", notes: "High foot traffic areas" },
      { category: "Boutique Rentals", priceRange: "$35 - $150 / night", notes: "Popular with cultural tourists" }
    ],
    localHighlights: [
      "UNESCO World Heritage site with rich historic architecture",
      "Heart of Zanzibar's culture, including Forodhani Gardens night market",
      "Close proximity to the main ferry port and Abeid Amani Karume Airport (10 mins)",
      "Steady demand for long-term rentals from international expats and NGO staff"
    ],
    faqs: [
      {
        q: "Are there restrictions on renovating property in Stone Town?",
        a: "Yes, because Stone Town is a UNESCO site, all renovations must comply with conservation guidelines. Structural alterations require approval from the Stone Town Conservation and Development Authority (STCDA)."
      }
    ]
  },
  fumba: {
    displayName: "Fumba",
    introduction: "Fumba, located on the southwest peninsula of Zanzibar, has quickly become the focal point of modern, sustainable living on the island. It is the site of Fumba Town, an award-winning eco-friendly master-planned city offering secure residential options, reliable infrastructure, and a modern lifestyle tailored for families and expats.",
    marketOverview: "Fumba's real estate market consists of modern apartments, townhouses, and luxury villas built with international standards. Buying a condominium in Fumba Town grants foreigners official residency status in Zanzibar, driving massive demand from international buyers looking for long-term relocations or stable investments.",
    priceTable: [
      { category: "Condominium Apartments", priceRange: "$50,000 - $180,000", notes: "Includes pool and garden access" },
      { category: "Modern Townhouses", priceRange: "$120,000 - $280,000", notes: "Spacious family layout" },
      { category: "Seafront Villas", priceRange: "$250,000 - $550,000", notes: "Premium ocean views" },
      { category: "Monthly Rental (2BR)", priceRange: "$700 - $1,500 / month", notes: "Popular with expat families" }
    ],
    localHighlights: [
      "Sustainable master-planned city with complete infrastructure and 24/7 security",
      "Official path to Zanzibar residency for foreign property owners",
      "Peaceful peninsula location with coastal views, parks, and schools",
      "Just 20 minutes from the airport and Stone Town"
    ],
    faqs: [
      {
        q: "Can I get a residency permit by buying property in Fumba?",
        a: "Yes, foreign investors purchasing approved residential units in Fumba Town are eligible for a renewable Zanzibar residency permit, making it highly popular for expats."
      }
    ]
  },
  michamvi: {
    displayName: "Michamvi",
    introduction: "Michamvi is a spectacular, secluded peninsula on the east coast of Zanzibar, unique for being the only place on the east coast where you can witness breathtaking sunsets over the ocean. It features tranquil white beaches, lush mangrove forests, and an exclusive, bohemian atmosphere perfect for premium boutique retreats and eco-villas.",
    marketOverview: "Michamvi is highly popular for premium eco-tourism developments. The real estate market offers beach-view plots, mangrove-side land, and upscale private villas. Investors are attracted to its quiet nature, protected bay, and the famous Rock Restaurant located nearby, ensuring a constant flow of high-quality visitors.",
    priceTable: [
      { category: "Sunset Bay Plots", priceRange: "$120,000 - $320,000", notes: "Stunning sunset views, rare" },
      { category: "Residential Land", priceRange: "$15,000 - $50,000", notes: "Quiet, surrounded by nature" },
      { category: "Luxury Eco-Villas", priceRange: "$200,000 - $450,000", notes: "Focus on sustainable luxury" },
      { category: "Boutique Rentals", priceRange: "$80 - $350 / night", notes: "Upscale tourist demand" }
    ],
    localHighlights: [
      "Spectacular sunsets over the sea from the east coast (Michamvi Kae)",
      "Proximity to the world-famous Rock Restaurant in Pingwe",
      "Quiet, peaceful mangroves, ideal for paddle boarding and kayaking",
      "Exclusive boutique hotel market catering to luxury travelers"
    ],
    faqs: [
      {
        q: "What makes Michamvi unique?",
        a: "Its geography. Michamvi forms a large, protected bay, creating a west-facing shoreline on the eastern side of the island. This allows visitors to enjoy calm, lagoon-like swimming and amazing sunsets, which is impossible elsewhere on the east coast."
      }
    ]
  },
  matemwe: {
    displayName: "Matemwe",
    introduction: "Matemwe, located on the northeast coast of Zanzibar, overlooks the famous Mnemba Island Atoll, a world-renowned marine reserve. Famous for its long, quiet, palm-fringed beaches and traditional seaweed farming, Matemwe is a prime hub for snorkeling, scuba diving, and exclusive beachfront estates.",
    marketOverview: "Real estate in Matemwe is highly focused on oceanfront locations. Plots facing Mnemba Island command premium prices and are highly sought after for luxury diving lodges and private residential villas. Matemwe offers a peaceful escape, making it ideal for investors who prioritize nature, privacy, and active ocean activities.",
    priceTable: [
      { category: "Mnemba-View Plots", priceRange: "$110,000 - $300,000", notes: "Prime beachfront facing the atoll" },
      { category: "Residential Land", priceRange: "$12,000 - $40,000", notes: "Setback from the beach, quiet" },
      { category: "Boutique Villas", priceRange: "$160,000 - $380,000", notes: "High demand from dive tourists" },
      { category: "Short-term Rentals", priceRange: "$50 - $250 / night", notes: "Popular with divers and families" }
    ],
    localHighlights: [
      "Direct views and quick boat access to the Mnemba Island marine reserve",
      "Zanzibar's premier scuba diving and snorkeling launch site",
      "Authentic Swahili village culture, fresh fish market, and local crafts",
      "Long, wide beach, perfect for quiet walks and relaxation"
    ],
    faqs: [
      {
        q: "Why is Matemwe popular for dive resorts?",
        a: "Matemwe is the closest village to Mnemba Island, which is Zanzibar's top marine conservation area, drawing thousands of scuba divers and snorkelers every month."
      }
    ]
  },
  kizimkazi: {
    displayName: "Kizimkazi",
    introduction: "Kizimkazi is a peaceful fishing village on the southern tip of Zanzibar, historically famous as the main location for wild dolphin boat excursions. Characterized by dramatic coral cliffs, sandy coves, and the oldest mosque in East Africa, Kizimkazi is becoming highly popular for upscale eco-lodges and quiet oceanfront homes.",
    marketOverview: "Real estate in Kizimkazi offers incredible cliffside locations with panoramic ocean views, often at more accessible prices than northern beaches. Investors choose Kizimkazi for boutique wellness retreats, eco-villas, and private residential estates that prioritize natural beauty, whale watching, and dolphin conservation.",
    priceTable: [
      { category: "Cliffside Oceanfront Plots", priceRange: "$80,000 - $220,000", notes: "Panoramic ocean views from elevated ground" },
      { category: "Inland Land", priceRange: "$8,000 - $30,000", notes: "Authentic, quiet forest settings" },
      { category: "Eco-Villas", priceRange: "$130,000 - $280,000", notes: "Designed with local materials" },
      { category: "Short-term Rentals", priceRange: "$40 - $180 / night", notes: "Appeals to nature lovers and eco-tourists" }
    ],
    localHighlights: [
      "Home to the famous Kizimkazi Dimbani Mosque (12th century)",
      "Main starting point for dolphin tours and seasonal whale watching",
      "Stunning cliffside topography and secret sandy coves",
      "Peaceful, quiet southern lifestyle, far from commercial crowds"
    ],
    faqs: [
      {
        q: "What makes Kizimkazi different from other coastlines?",
        a: "Kizimkazi features elevated coral cliffs instead of flat sandy shores, offering dramatic panoramic views, natural sea breezes, and unique privacy, alongside small private sandy coves."
      }
    ]
  }
};

/**
 * Returns dynamic SEO data, content, price table, highlights, and FAQs for any village.
 */
export const getVillageSeoData = (villageName) => {
  if (!villageName) return null;

  const normalized = normalizeName(villageName);
  const slug = getSlug(villageName);

  // If a custom profile exists, use it
  if (customProfiles[normalized]) {
    const profile = customProfiles[normalized];
    return {
      ...profile,
      slug,
      metaTitle: `Real Estate in ${profile.displayName}, Zanzibar | Properties for Sale & Rent`,
      metaDescription: `Discover houses, beachfront villas, apartments, and land plots for sale or rent in ${profile.displayName}, Zanzibar. Explore top investment opportunities in the area today.`,
      h1: `Real Estate & Properties in ${profile.displayName}, Zanzibar`
    };
  }

  // Otherwise, generate a high-quality fallback profile dynamically
  const displayName = villageName.replace(/-/g, " ").trim().replace(/\b\w/g, c => c.toUpperCase());
  
  return {
    displayName,
    slug,
    metaTitle: `Real Estate in ${displayName}, Zanzibar | Properties for Sale & Rent`,
    metaDescription: `Browse houses, beachfront land plots, apartments, and commercial projects for sale or rent in ${displayName}, Zanzibar. Find your next property or investment today.`,
    h1: `Real Estate & Properties in ${displayName}, Zanzibar`,
    introduction: `Discover the real estate market in ${displayName}, Zanzibar. As Zanzibar continues to rise as a global tourism and investment destination, areas like ${displayName} are attracting interest from buyers looking for beachfront plots, holiday homes, and commercial opportunities in East Africa.`,
    marketOverview: `The property market in ${displayName} is emerging, offering a range of land and building options. From affordable inland residential plots suitable for private homes to beachfront land ideal for commercial resorts, ${displayName} provides investors with a chance to enter the market at competitive price points with strong growth potential.`,
    priceTable: [
      { category: "Oceanfront Land Plots", priceRange: "$80,000 - $250,000", notes: "Depending on beach frontage" },
      { category: "Residential Land (inland)", priceRange: "$8,000 - $35,000", notes: "Excellent value for holiday homes" },
      { category: "Houses & Villas", priceRange: "$120,000 - $280,000", notes: "Under construction or newly completed" },
      { category: "Short-term Rentals", priceRange: "$30 - $150 / night", notes: "Airbnb and boutique resort options" }
    ],
    localHighlights: [
      `Located in the beautiful Zanzibar archipelago with access to pristine shorelines`,
      `Growing tourism interest offering potential for holiday rental businesses`,
      `Great entry-level property prices compared to major hubs like Paje or Nungwi`,
      `Accessible to local amenities, transport routes, and Stone Town`
    ],
    faqs: [
      {
        q: `Is it a good time to buy real estate in ${displayName}?`,
        a: `Yes, buying in emerging areas like ${displayName} offers excellent capital appreciation potential as infrastructure and tourism developments expand across Zanzibar.`
      },
      {
        q: `Can foreigners own property in ${displayName}?`,
        a: `Foreigners can legally acquire property in ${displayName} through long-term leasehold contracts (typically 33, 66, or 99 years) or by investing in ZIPA-approved real estate projects.`
      },
      {
        q: `What is the typical distance from ${displayName} to the airport?`,
        a: `Most villages in Unguja, Zanzibar are within a 30 to 80-minute drive from Abeid Amani Karume International Airport via tarmac roads.`
      }
    ]
  };
};
