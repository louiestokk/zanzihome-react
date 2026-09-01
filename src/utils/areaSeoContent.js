const siteUrl = "https://www.zanzihome.com";

const areaProfiles = {
  paje: { focus: "the southeast coast's beach and watersport community", overview: "Paje is a southeast-coast village known for its long beach, lagoon and active hospitality scene. Buyers commonly compare homes, plots and accommodation opportunities close to the village and coastline." },
  nungwi: { focus: "Zanzibar's established northern beach destination", overview: "Nungwi sits on Zanzibar's northern tip, with a busy beach, village services and a well-developed visitor economy. Property searches here often focus on access to the coast, local amenities and established accommodation areas." },
  jambiani: { focus: "a relaxed southeast-coast village by the lagoon", overview: "Jambiani is a long-established village on Zanzibar's southeast coast, with a residential community alongside guesthouses and beach businesses. When comparing property, consider the exact beach access, village location and available utilities." },
  "stone-town": { focus: "Zanzibar's historic urban centre", overview: "Stone Town is Zanzibar's historic urban centre, recognised for its dense streets, heritage buildings and commercial activity. Buyers should assess building condition, permitted use and conservation requirements alongside location." },
  kendwa: { focus: "the north-west coast's beach and hospitality area", overview: "Kendwa is a north-west coast destination with a broad beach and a mix of tourism and residential development. Searches often centre on proximity to the shore, road access and the character of the immediate neighbourhood." },
  bwejuu: { focus: "a quieter southeast-coast setting near Paje", overview: "Bwejuu is a southeast-coast area south of Paje, known for its palm-lined shoreline and lower-key village setting. Compare plot boundaries, access roads and distance from the beach when reviewing listings." },
  michamvi: { focus: "the peninsula between Chwaka and Menai bays", overview: "Michamvi occupies a peninsula on Zanzibar's east coast, with villages, beaches and views across the surrounding bays. Property decisions here benefit from checking the exact side of the peninsula, road access and services." },
  bububu: { focus: "a residential coastal area north of Stone Town", overview: "Bububu is a coastal residential area north of Stone Town, convenient for buyers who want access to the capital and the west coast. Compare the property's local road connection, utilities and proximity to daily services." },
  fumba: { focus: "the south-west peninsula close to Stone Town", overview: "Fumba is on Zanzibar's south-west peninsula and combines established residential areas with coastal surroundings. Buyers should review the precise development, access and lease or title documentation for each listing." },
  kizimkazi: { focus: "the island's southern coastal villages", overview: "Kizimkazi refers to coastal villages in southern Zanzibar, where property searches tend to be driven by space, coastline and a quieter pace. Confirm the location, services and permitted use before committing to a property." },
  makunduchi: { focus: "a traditional village on Zanzibar's south-east coast", overview: "Makunduchi is a south-east coast village with a local community and open coastal surroundings. Listings can vary greatly in access and infrastructure, so site visits and document checks are especially valuable." },
  zanzibar: { focus: "property opportunities across Zanzibar", overview: "Zanzibar offers different property settings, from historic urban neighbourhoods to east-coast villages and north-coast beach destinations. Use the listing details to compare tenure, location, access and property condition." },
  kidoti: { focus: "the north coast near Nungwi and Kendwa", overview: "Kidoti is a north-coast area near the Nungwi and Kendwa region. It can suit buyers looking for a less central setting while remaining connected to the northern coast's services and beaches." },
  chwaka: { focus: "an east-coast community by Chwaka Bay", overview: "Chwaka is an east-coast community beside Chwaka Bay, with a different setting from Zanzibar's open-ocean beach areas. Review the property's exact position, transport links and local services when comparing options." },
  uroa: { focus: "a village on Zanzibar's central east coast", overview: "Uroa is a central east-coast village with beach frontage, local residences and accommodation activity. Buyers should compare coastal exposure, access roads and the distance to village facilities for each property." },
  pongwe: { focus: "a quieter beach area on Zanzibar's east coast", overview: "Pongwe is an east-coast beach area with a quieter, lower-density character than some neighbouring destinations. Listings should be assessed for direct access, utility connections and the surrounding development pattern." },
  matemwe: { focus: "a north-east coast village facing Mnemba Island", overview: "Matemwe is a north-east coast village with a long beach and views toward Mnemba Island. Property searches often focus on beach proximity, village access and whether the site suits residential or hospitality use." },
  pemba: { focus: "the greener island of the Zanzibar archipelago", overview: "Pemba is part of the Zanzibar archipelago and has distinct towns, rural areas and coastal settings. Property due diligence should cover the exact island location, transport, local infrastructure and the applicable tenure documents." },
};

function formatAreaName(area = "") {
  return area
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getAreaSeoProfile(area) {
  const slug = area.toLowerCase().trim().replace(/\s+/g, "-");
  const name = formatAreaName(area);
  const fallback = {
    focus: `property in ${name}, Zanzibar`,
    overview: `Explore property listings in ${name}, Zanzibar and compare the exact location, access, utilities and tenure information for each opportunity.`,
  };

  return { slug, name, image: `${siteUrl}/images/filterBackground.jpg`, ...(areaProfiles[slug] || fallback) };
}

export function getListingImage(properties, area) {
  const profile = getAreaSeoProfile(area);
  const property = properties.find((item) => item?.uri || item?.imagesArray?.[0]);
  return property?.uri || property?.imagesArray?.[0] || profile.image;
}