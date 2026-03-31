// src/utils/generateSeoText.js

export const generateSeoText = (type, area) => {
  return {
    title: `Buy ${type.charAt(0).toUpperCase() + type.slice(1)} in ${area}, Zanzibar`,
    description: `Explore available ${type}s for sale in ${area}, Zanzibar. Find your dream property, from beachfront villas to plots, perfect for investment or living.`,
    h1: `Buy ${type.charAt(0).toUpperCase() + type.slice(1)} in ${area}`,
    content: `
      Looking to buy a ${type} in ${area}, Zanzibar? Discover a wide range of properties including 
      luxury villas, cozy houses, apartments, and plots. Whether for investment, rental, or 
      permanent living, ${area} offers stunning landscapes, pristine beaches, and high ROI potential.
    `
  };
};