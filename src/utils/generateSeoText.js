// src/utils/generateSeoText.js

export function normalizePropertyType(type) {
  if (!type) return "";
  const t = type.toLowerCase().trim();
  if (t === "aparment" || t === "apartment" || t === "apartments" || t === "condo" || t === "condos" || t === "condominium") {
    return "apartment";
  }
  if (t === "house" || t === "houses") {
    return "house";
  }
  if (t === "villa" || t === "villas") {
    return "villa";
  }
  if (t === "land" || t === "lands" || t === "hand" || t === "plot" || t === "plots") {
    return "hand";
  }
  if (t === "business" || t === "businesses" || t === "commercial" || t === "hotel" || t === "hotels" || t === "resort" || t === "resorts") {
    return "business";
  }
  return t;
}

export const generateSeoText = (type, area) => {
  const normalized = normalizePropertyType(type);
  const displayType = normalized === "hand" ? "land" : normalized;
  return {
    title: `Buy ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${area}, Zanzibar`,
    description: `Explore available ${displayType}s for sale in ${area}, Zanzibar. Find your dream property, from beachfront villas to plots, perfect for investment or living.`,
    h1: `Buy ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${area}`,
    content: `
      Looking to buy a ${displayType} in ${area}, Zanzibar? Discover a wide range of properties including 
      luxury villas, cozy houses, apartments, and plots. Whether for investment, rental, or 
      permanent living, ${area} offers stunning landscapes, pristine beaches, and high ROI potential.
    `
  };
};

export const generateSeoRentText = (type, area) => {
  const normalized = normalizePropertyType(type);
  const displayType = normalized === "hand" ? "land" : normalized;
  return {
    title: `Rent ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${area}, Zanzibar | Long & Short Term Rentals`,
    description: `Discover beautiful ${displayType}s for rent in ${area}, Zanzibar. Find your perfect holiday villa, long term apartment, or local home near the beach.`,
    h1: `Rent ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${area}`,
    content: `
      Searching for a ${displayType} for rent in ${area}, Zanzibar? Browse verified rental listings including 
      beachfront apartments, luxury rental villas, and cozy homes. Whether you need a short-term holiday rental 
      or a long-term home, ${area} provides amazing living options close to the turquoise water.
    `
  };
};

export const generateSeoInvestText = (area) => {
  return {
    title: `Real Estate Investment in ${area}, Zanzibar | Property & Land Investment`,
    description: `Explore investment properties, beachfront land plots, and development projects in ${area}, Zanzibar. Secure high ROI and residency through real estate.`,
    h1: `Real Estate Investment in ${area}`,
    content: `
      Interested in real estate investment in ${area}, Zanzibar? This fast-growing area offers exceptional opportunities, 
      from beach plots and commercial land to luxury vacation villas with strong rental ROI. Secure high yields, capital growth, 
      and legal tax incentives in ${area}'s popular property market.
    `
  };
};