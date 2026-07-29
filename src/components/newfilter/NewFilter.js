import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { villages } from "../../utils/data";
import { BiSearch, BiMap, BiBuilding } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const types = ["House", "Apartment", "Land", "Business"];

const NewFilter = () => {
  const history = useHistory();
  
  // Selection states
  const [offerType, setOfferType] = useState("Sale"); // default to Buy/Sale
  const [propertyType, setPropertyType] = useState("All"); // default to All Types
  const [selectedLocation, setSelectedLocation] = useState(""); // Input text for autocomplete

  const handleSearch = (e) => {
    e.preventDefault();

    // 1. Slugify the village name if selected
    if (selectedLocation && selectedLocation !== "Whole Zanzibar") {
      const slug = selectedLocation.toLowerCase().replace(/[-\s]+/g, "-");
      history.push(`/properties/area/${slug}?offer=${offerType}&type=${propertyType}`);
    } else {
      // 2. Otherwise navigate to the general properties search page
      history.push(`/properties-zanzibar?offer=${offerType}&type=${propertyType}&area=Whole Zanzibar`);
    }
  };

  return (
    <div className="filter-filter-holder">
      <div className="home-search-panel">
        <style>{`
          .home-search-panel {
            width: 94%;
            max-width: 700px;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(16px);
            border-radius: 16px;
            padding: 18px 24px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.5);
            font-family: 'Poppins', sans-serif;
          }

          /* Tabs bar */
          .home-search-tabs {
            display: flex;
            gap: 12px;
            margin-bottom: 14px;
            border-bottom: 1px solid #f3f4f6;
            padding-bottom: 6px;
          }

          .home-search-tab {
            border: none;
            background: transparent;
            font-size: 13px;
            font-weight: 600;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px 8px 6px 8px;
            position: relative;
            transition: color 0.3s;
          }

          .home-search-tab:hover {
            color: #013a17;
          }

          .home-search-tab.active {
            color: #013a17;
          }

          .home-search-tab.active::after {
            content: "";
            position: absolute;
            bottom: -7px;
            left: 0;
            right: 0;
            height: 3px;
            background: #013a17;
            border-radius: 3px;
          }

          /* Flex inputs row */
          .home-search-row {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          /* Inputs wrapper */
          .search-field-box {
            flex: 1;
            display: flex;
            align-items: center;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 2px 14px;
            transition: all 0.3s ease;
          }

          .search-field-box:focus-within {
            border-color: #013a17;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(1, 58, 23, 0.06);
          }

          .search-field-icon {
            font-size: 18px;
            color: #013a17;
            margin-right: 10px;
          }

          .search-input-inner {
            width: 100%;
          }

          /* Select custom styling */
          .search-select-field {
            width: 100%;
            border: none;
            background: transparent;
            color: #1f2937;
            font-size: 13.5px;
            font-weight: 500;
            padding: 8px 0;
            cursor: pointer;
            outline: none;
          }

          /* Search action button */
          .home-search-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: #013a17;
            color: #ffffff;
            border: none;
            padding: 10px 22px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(1, 58, 23, 0.15);
          }

          .home-search-submit:hover {
            background: #0d2818;
            box-shadow: 0 6px 16px rgba(1, 58, 23, 0.25);
          }

          /* Autocomplete customizations to override Material-UI */
          .home-search-panel .MuiInput-underline:before,
          .home-search-panel .MuiInput-underline:after {
            display: none !important;
          }

          .home-search-panel .MuiInput-root {
            font-family: 'Poppins', sans-serif !important;
            font-size: 13.5px !important;
            font-weight: 500 !important;
            color: #1f2937 !important;
          }

          @media (min-width: 768px) {
            .home-search-row {
              flex-direction: row;
              align-items: center;
            }
            .search-field-box {
              margin-bottom: 0;
            }
            .home-search-submit {
              height: 44px;
            }
          }
        `}</style>

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
          
          {/* Autocomplete Location Field (Controlled inputValue for correct autosuggest filtering) */}
          <div className="search-field-box">
            <BiMap className="search-field-icon" />
            <div className="search-input-inner">
              <Autocomplete
                id="location-autocomplete"
                freeSolo
                disableClearable
                options={villages}
                inputValue={selectedLocation}
                onInputChange={(event, newInputValue) => {
                  setSelectedLocation(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search location (e.g. Paje, Nungwi...)"
                    margin="none"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      disableUnderline: true,
                    }}
                    style={{ width: "100%" }}
                  />
                )}
              />
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
