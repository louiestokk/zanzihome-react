"use client";

import React, { useState } from "react";
import { villages } from "../../utils/data";
import { BiSearch, BiMap, BiBuilding } from "react-icons/bi";
import { useRouter } from "next/navigation";

const types = ["House", "Apartment", "Land", "Business"];

const NewFilter = () => {
  const router = useRouter();
  
  // Selection states
  const [offerType, setOfferType] = useState("Sale"); // default to Buy/Sale
  const [propertyType, setPropertyType] = useState("All"); // default to All Types
  const [selectedLocation, setSelectedLocation] = useState(""); // Input text for autocomplete
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredVillages = villages.filter((village) =>
    village.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();

    // 1. Slugify the village name if selected
    if (selectedLocation && selectedLocation !== "Whole Zanzibar") {
      const slug = selectedLocation.toLowerCase().replace(/[-\s]+/g, "-");
      router.push(`/properties/area/${slug}?offer=${offerType}&type=${propertyType}`);
    } else {
      // 2. Otherwise navigate to the general properties search page
      router.push(`/properties-zanzibar?offer=${offerType}&type=${propertyType}&area=Whole Zanzibar`);
    }
  };

  return (
    <div className="filter-filter-holder">
      <div className="home-search-panel">
        

        {/* Tabs */}
        <div className="home-search-tabs">
          <button
            type="button"
            className={`home-search-tab ${offerType === "Sale" ? "active" : ""}`}
            onClick={() => setOfferType("Sale")}
          >
            Buy Properties
          </button>
          <button
            type="button"
            className={`home-search-tab ${offerType === "Rent" ? "active" : ""}`}
            onClick={() => setOfferType("Rent")}
          >
            Rent Properties
          </button>
        </div>

        {/* Inputs Form */}
        <form onSubmit={handleSearch} className="home-search-row">
          
          {/* Location field */}
          <div className="search-field-box">
            <BiMap className="search-field-icon" />
            <div className="search-input-inner">
              <input
                className="search-input-field"
                type="text"
                value={selectedLocation}
                placeholder="Search location (e.g. Paje, Nungwi...)"
                onChange={(e) => setSelectedLocation(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                aria-label="Search location"
                autoComplete="off"
              />
              {showSuggestions && (
                <ul className="search-suggestions-dropdown">
                  {filteredVillages.slice(0, 15).map((village) => (
                    <li
                      key={village}
                      className="search-suggestion-item"
                      onMouseDown={() => {
                        setSelectedLocation(village);
                        setShowSuggestions(false);
                      }}
                    >
                      <BiMap style={{ marginRight: "8px", color: "#013a17", fontSize: "15px" }} />
                      {village}
                    </li>
                  ))}
                  {filteredVillages.length === 0 && (
                    <li className="search-suggestion-no-results">
                      No locations found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Property Category Select dropdown */}
          <div className="search-field-box">
            <BiBuilding className="search-field-icon" />
            <div className="search-input-inner">
              <select
                className="search-select-field"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="All">All Property Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Search Button */}
          <button type="submit" className="home-search-submit">
            <BiSearch style={{ fontSize: "16px" }} />
            <span>Search</span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default NewFilter;
