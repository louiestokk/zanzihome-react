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

const formatAreaName = (area = "") =>
  area
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const formatPropertyLabel = (type) => {
  const normalized = normalizePropertyType(type);
  const displayType = normalized === "hand" ? "land" : normalized;
  const safeType = displayType || "property";
  return safeType.charAt(0).toUpperCase() + safeType.slice(1).toLowerCase();
};

const buildKeywords = (propertyLabel, areaName, intent) => {
  const normalizedLabel = propertyLabel.toLowerCase();
  return [
    `${normalizedLabel} ${intent} in ${areaName}`,
    `${areaName} ${normalizedLabel} ${intent}`,
    `buy ${normalizedLabel} in zanzibar`,
    `${areaName} real estate`,
    `zanzibar ${normalizedLabel} ${intent}`,
  ].join(", ");
};

export const generateSeoText = (type, area) => {
  const areaName = formatAreaName(area);
  const propertyLabel = formatPropertyLabel(type);
  const propertyKey = propertyLabel.toLowerCase();

  return {
    title: `Buy ${propertyLabel} in ${areaName}, Zanzibar | ${areaName} ${propertyLabel}s for Sale`,
    description: `Browse verified ${propertyKey}s for sale in ${areaName}, Zanzibar. Compare listings, prices, and investment opportunities for ${propertyKey}s near beaches, villas, and growing communities.`,
    keywords: buildKeywords(propertyLabel, areaName, "for sale"),
    h1: `Buy ${propertyLabel} in ${areaName}, Zanzibar`,
    content: `Looking to buy a ${propertyKey} in ${areaName}, Zanzibar? Explore a curated selection of homes, villas, apartments, and land opportunities designed for lifestyle buyers and investors. ${areaName} offers strong rental demand, beach access, and long-term value for property buyers who want a secure and attractive location in Zanzibar.`
  };
};

export const generateSeoRentText = (type, area) => {
  const areaName = formatAreaName(area);
  const propertyLabel = formatPropertyLabel(type);
  const propertyKey = propertyLabel.toLowerCase();

  return {
    title: `Rent ${propertyLabel} in ${areaName}, Zanzibar | ${areaName} Rentals`,
    description: `Find ${propertyKey}s for rent in ${areaName}, Zanzibar. Compare beach villas, apartments, and long-term homes with clear pricing, location details, and rental options for every budget.`,
    keywords: buildKeywords(propertyLabel, areaName, "rentals"),
    h1: `Rent ${propertyLabel} in ${areaName}, Zanzibar`,
    content: `Searching for a ${propertyKey} to rent in ${areaName}, Zanzibar? Discover verified rental listings for short-term stays and long-term living, from beachfront villas to practical family homes and modern apartments. ${areaName} is popular with holidaymakers, remote workers, and investors looking for solid rental demand in Zanzibar.`
  };
};

export const generateSeoInvestText = (area) => {
  const areaName = formatAreaName(area);

  return {
    title: `Real Estate Investment in ${areaName}, Zanzibar | Property & Land Investment`,
    description: `Explore real estate investment opportunities in ${areaName}, Zanzibar, including beach villas, land plots, and development projects with strong rental yields and growth potential.`,
    keywords: `real estate investment in ${areaName}, property investment zanzibar, buy land in ${areaName}, ${areaName} investment property, zanzibar rental yields`,
    h1: `Real Estate Investment in ${areaName}, Zanzibar`,
    content: `Interested in property investment in ${areaName}, Zanzibar? This growing location combines tourist demand, capital appreciation, and legal investment pathways that make it attractive for buyers seeking rental income and long-term value. Explore apartments, villas, and land opportunities designed for yield-focused investors and lifestyle buyers.`
  };
};