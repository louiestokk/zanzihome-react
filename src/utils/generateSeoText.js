// src/utils/generateSeoText.js

import { getAreaSeoProfile } from "./areaSeoContent";

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

export function matchesSeoPropertyType(property, type) {
  const normalizedType = normalizePropertyType(type);
  const category = normalizePropertyType(property?.category);

  if (normalizedType === "beachfront" || normalizedType === "villa") {
    const searchableText = [
      property?.Title,
      property?.description,
      property?.desc,
      property?.info,
      property?.typeClass,
    ].filter(Boolean).join(" ").toLowerCase();
    return searchableText.includes(normalizedType === "beachfront" ? "beach" : "villa");
  }

  return category === normalizedType;
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
  const areaProfile = getAreaSeoProfile(area);
  const areaName = areaProfile.name;
  const propertyLabel = formatPropertyLabel(type);
  const propertyKey = propertyLabel.toLowerCase();

  return {
    title: `Buy ${propertyLabel} in ${areaName}, Zanzibar | ${areaProfile.focus}`,
    description: `Explore ${propertyKey} listings for sale in ${areaName}, Zanzibar. ${areaProfile.overview}`,
    keywords: buildKeywords(propertyLabel, areaName, "for sale"),
    h1: `Buy ${propertyLabel} in ${areaName}, Zanzibar`,
    content: `Looking to buy a ${propertyKey} in ${areaName}, Zanzibar? ${areaProfile.overview}`
  };
};

export const generateSeoRentText = (type, area) => {
  const areaProfile = getAreaSeoProfile(area);
  const areaName = areaProfile.name;
  const propertyLabel = formatPropertyLabel(type);
  const propertyKey = propertyLabel.toLowerCase();

  return {
    title: `Rent ${propertyLabel} in ${areaName}, Zanzibar | ${areaProfile.focus}`,
    description: `Find ${propertyKey} listings for rent in ${areaName}, Zanzibar. ${areaProfile.overview}`,
    keywords: buildKeywords(propertyLabel, areaName, "rentals"),
    h1: `Rent ${propertyLabel} in ${areaName}, Zanzibar`,
    content: `Searching for a ${propertyKey} to rent in ${areaName}, Zanzibar? ${areaProfile.overview}`
  };
};

export const generateSeoInvestText = (area) => {
  const areaProfile = getAreaSeoProfile(area);
  const areaName = areaProfile.name;

  return {
    title: `Invest in ${areaName}, Zanzibar | ${areaProfile.focus}`,
    description: `Explore property and land investment opportunities in ${areaName}, Zanzibar. ${areaProfile.overview}`,
    keywords: `real estate investment in ${areaName}, property investment zanzibar, buy land in ${areaName}, ${areaName} investment property, zanzibar rental yields`,
    h1: `Invest in ${areaName}, Zanzibar`,
    content: `Interested in property investment in ${areaName}, Zanzibar? ${areaProfile.overview}`
  };
};