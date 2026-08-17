"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const MatchRequestStepper = () => {
  const [step, setStep] = useState(1);
  const [offer, setOffer] = useState(""); // "Buy" or "Rent"
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [timeframe, setTimeframe] = useState(""); // "Immediately", "1-3 months", "3+ months"
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Autocomplete state
  const [areaInput, setAreaInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);

  const emailJsFormRef = useRef();

  const zanzibarAreas = [
    "Stone Town", "Paje", "Nungwi", "Jambiani", "Kendwa", "Bwejuu", 
    "Kiwengwa", "Matemwe", "Uroa", "Fumba", "Bububu", "Chwaka", 
    "Kizimkazi", "Michamvi", "Makunduchi", "Mbweni", "Chukwani", 
    "Pongwe", "Pwani Mchangani", "Fumba Town", "Mangapwani", 
    "Mkokotoni", "Kisauni", "Fuoni", "Mwanakwerekwe", "Mwera", "Mtoni",
    "Uzi Island", "Changuu Island", "Chumbe Island", "Kama", "Chuini"
  ].sort();

  // Close autocomplete list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update suggestions when user types
  const handleAreaChange = (e) => {
    const value = e.target.value;
    setAreaInput(value);
    setArea(""); // Reset finalized selection while typing
    
    if (value.trim().length > 0) {
      const filtered = zanzibarAreas.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (selected) => {
    setAreaInput(selected);
    setArea(selected);
    setShowSuggestions(false);
    setErrorMsg("");
  };

  const handleNext = () => {
    if (step === 1 && !offer) {
      setErrorMsg("Please select whether you want to Rent or Buy.");
      return;
    }
    if (step === 2 && !area) {
      setErrorMsg("Please select or search for an area.");
      return;
    }
    if (step === 3 && (!budget || !timeframe)) {
      setErrorMsg("Please enter your budget and timeline.");
      return;
    }
    setErrorMsg("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMsg("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !whatsapp) {
      setErrorMsg("Please fill in both email and WhatsApp number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const formEl = emailJsFormRef.current;
      if (formEl) {
        formEl.elements["from_name"].value = "ZanziHome Match Client";
        formEl.elements["from_email"].value = email;
        formEl.elements["reply_to"].value = email;
        formEl.elements["subject"].value = `🏡 ZanziHome Match Request - ${offer} in ${area}`;
        formEl.elements["wichservice"].value = `New Request: ${offer} in ${area}, budget: $${budget}`;
        formEl.elements["message"].value = `
=== NEW PROPERTY MATCH REQUEST ===
Service Type: ${offer} (Buy/Rent)
Target Area: ${area}
Max Budget: $${budget} USD
Timeframe: ${timeframe}
Client Email: ${email}
Client WhatsApp: ${whatsapp}
        `;
      }

      // Send confirmation to user (admin is CC'ed automatically via EmailJS settings)
      if (formEl) {
        formEl.elements["to_email"].value = email;
      }
      await emailjs.sendForm(
        "service_thbibzh",
        "template_xn7q61k",
        formEl,
        process.env.NEXT_PUBLIC_REACT_APP_EMAILJS || process.env.REACT_APP_EMAILJS || "yP8LTloRH-vMrxS8b"
      );

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-stepper-container">
      

      {/* Left Column - Desktop Service Info */}
      <div className="info-column">
        <h3 className="info-title">Let Us Find Your Perfect Home in Zanzibar 🏝️</h3>
        <p className="info-subtitle">
          Save time, avoid stress and negotiate better prices. Tell us your search preferences, and we will source verified matches matching your requirements.
        </p>

        <div className="benefits-list">
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="benefit-content">
              <h4 style={{color:'white'}}>Save Time & Travel Costs</h4>
              <p style={{opacity: '1', color: 'white'}}>Skip browsing hundreds of outdated listings. We only send verified options.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="benefit-content">
              <h4 style={{color:'white'}}>Access Off-Market Listings</h4>
              <p style={{opacity: '1', color: 'white'}}>Get priority access to properties that aren't advertised anywhere else online.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="benefit-content">
              <h4  style={{color:'white'}}>100% Free Service for Clients</h4>
              <p style={{opacity: '1', color: 'white'}}>We work directly with owners and agencies to help you secure properties at no extra cost.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form / Stepper */}
      <div className="form-column">
        {!submitted ? (
          <>
            <div className="stepper-header">
              <h2>Find Your Match 🚀</h2>
              <p>Fill out the preferences to start the matching process.</p>
            </div>

            <div className="progress-indicator">
              <div className={`progress-dot ${step === 1 ? "active" : ""}`} />
              <div className={`progress-dot ${step === 2 ? "active" : ""}`} />
              <div className={`progress-dot ${step === 3 ? "active" : ""}`} />
              <div className={`progress-dot ${step === 4 ? "active" : ""}`} />
            </div>

            {errorMsg && <div className="stepper-error">{errorMsg}</div>}

            <div className="step-content">
              {step === 1 && (
                <div className="input-group">
                  <label>I want to:</label>
                  <div className="pill-selection">
                    <button
                      type="button"
                      className={`pill-btn ${offer === "Rent" ? "selected" : ""}`}
                      onClick={() => {
                        setOffer("Rent");
                        setErrorMsg("");
                      }}
                    >
                      Rent Property
                    </button>
                    <button
                      type="button"
                      className={`pill-btn ${offer === "Buy" ? "selected" : ""}`}
                      onClick={() => {
                        setOffer("Buy");
                        setErrorMsg("");
                      }}
                    >
                      Buy Property
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="input-group" ref={autocompleteRef}>
                  <label htmlFor="area-search-input">Preferred Area in Zanzibar:</label>
                  <div className="autocomplete-container">
                    <input
                      type="text"
                      id="area-search-input"
                      className="stepper-input"
                      placeholder="Type area e.g. Paje, Nungwi, Stone Town..."
                      value={areaInput}
                      onChange={handleAreaChange}
                      onFocus={() => {
                        if (areaInput.trim().length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      autoComplete="off"
                    />
                    {showSuggestions && (
                      <ul className="suggestions-list">
                        {suggestions.length > 0 ? (
                          suggestions.map((item, index) => (
                            <li
                              key={index}
                              className="suggestion-item"
                              onClick={() => selectSuggestion(item)}
                            >
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="no-suggestions">No areas match search</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {area && (
                    <div className="selected-area-badge">
                      <span>✓ Area: <strong>{area}</strong></span>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <>
                  <div className="input-group">
                    <label htmlFor="budget-input">Max Budget (USD $):</label>
                    <input
                      type="number"
                      id="budget-input"
                      className="stepper-input"
                      placeholder="Enter maximum budget in USD"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>When do you plan to move?</label>
                    <div className="pill-selection">
                      {["Immediately", "1-3 Months", "3+ Months"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`pill-btn ${timeframe === time ? "selected" : ""}`}
                          onClick={() => {
                            setTimeframe(time);
                            setErrorMsg("");
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="input-group">
                    <label htmlFor="email-input">Your Email Address:</label>
                    <input
                      type="email"
                      id="email-input"
                      className="stepper-input"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="whatsapp-input">WhatsApp Number:</label>
                    <input
                      type="text"
                      id="whatsapp-input"
                      className="stepper-input"
                      placeholder="e.g. +255 773 749 776"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="stepper-footer">
              {step > 1 ? (
                <button type="button" className="btn-stepper secondary" onClick={handleBack}>
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button type="button" className="btn-stepper primary" onClick={handleNext}>
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  className="btn-stepper primary"
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting..." : "Submit Request 🚀"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="success-step">
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>📬</div>
            <h3>Request Received!</h3>
            <p>
              We have received your match request and will get back to you with the best available options within 12 hours.
            </p>
          </div>
        )}
      </div>

      {/* Hidden EmailJS form for submission */}
      <form ref={emailJsFormRef} style={{ display: "none" }}>
        <input type="text" name="to_name" defaultValue="Admin" />
        <input type="email" name="to_email" />
        <input type="text" name="from_name" />
        <input type="email" name="from_email" />
        <input type="email" name="reply_to" />
        <input type="text" name="subject" />
        <input type="text" name="wichservice" />
        <textarea name="message" />
      </form>
    </div>
  );
};

export default MatchRequestStepper;
