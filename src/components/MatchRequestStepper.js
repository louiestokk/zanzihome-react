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

      // 1. Send request copy to admin
      if (formEl) {
        formEl.elements["to_email"].value = "louiestokk@gmail.com";
      }
      await emailjs.sendForm(
        "service_thbibzh",
        "template_xn7q61k",
        formEl,
        process.env.REACT_APP_EMAILJS
      );

      // 2. Send confirmation to user
      try {
        if (formEl) {
          formEl.elements["to_email"].value = email;
        }
        await emailjs.sendForm(
          "service_thbibzh",
          "template_xn7q61k",
          formEl,
          process.env.REACT_APP_EMAILJS
        );
      } catch (err) {
        console.error("Failed to send match confirmation copy to client:", err);
      }

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
      <style>{`
        .match-stepper-container {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          border-radius: 24px;
          padding: 24px;
          color: #ffffff;
          box-shadow: 0 12px 40px rgba(1, 58, 23, 0.3);
          max-width: 600px;
          margin: 2rem auto;
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 24px;
          box-sizing: border-box;
        }

        /* Desktop Layout (Split Columns) */
        @media (min-width: 768px) {
          .match-stepper-container {
            max-width: 1000px;
            flex-direction: row;
            align-items: stretch;
            gap: 48px;
            padding: 44px;
          }
          
          .info-column {
            flex: 1.1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: none;
            padding-right: 48px;
            padding-bottom: 0;
          }

          .form-column {
            flex: 0.9;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }

        /* Info Column on Mobile and Base */
        .info-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 24px;
        }

        .info-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 16px 0;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .info-subtitle {
          font-size: 14.5px;
          color: #f3f4f6;
          line-height: 1.6;
          margin: 0 0 28px 0;
          font-weight: 400;
          opacity: 0.95;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .benefit-icon-wrapper {
          background: rgba(255, 255, 255, 0.1);
          color: #22c55e;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .benefit-content h4 {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .benefit-content p {
          margin: 0;
          font-size: 13px;
          color: #f3f4f6;
          line-height: 1.5;
          font-weight: 400;
          opacity: 0.85;
        }

        /* Right Column Form/Stepper */
        .stepper-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .stepper-header h2 {
          font-size: 19px;
          font-weight: 800;
          margin: 0 0 4px 0;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .stepper-header p {
          font-size: 13px;
          color: #f3f4f6;
          margin: 0;
          font-weight: 400;
          opacity: 0.9;
          line-height: 1.4;
        }

        /* Progress Dots */
        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .progress-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: #ffffff;
          transform: scale(1.2);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        .step-content {
          min-height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pill-selection {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          width: 100%;
        }

        .pill-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13.5px;
          transition: all 0.2s;
          text-align: center;
        }

        .pill-btn:hover {
          background: rgba(255, 255, 255, 0.16);
        }

        .pill-btn.selected {
          background: #ffffff;
          color: #013a17;
          border-color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
          position: relative;
        }

        .input-group label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #a3b899;
          margin-bottom: 2px;
        }

        .stepper-input {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: #ffffff;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          transition: border-color 0.2s;
        }

        .stepper-input:focus {
          border-color: rgba(255, 255, 255, 0.5);
        }

        .stepper-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .autocomplete-container {
          position: relative;
          width: 100%;
        }

        .suggestions-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #0d2818;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          margin-top: 5px;
          max-height: 180px;
          overflow-y: auto;
          z-index: 100;
          list-style: none;
          padding: 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        .suggestion-item {
          padding: 10px 16px;
          color: #ffffff;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
          text-align: left;
        }

        .suggestion-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .no-suggestions {
          padding: 10px 16px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12.5px;
          font-style: italic;
        }

        .selected-area-badge {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid #22c55e;
          color: #22c55e;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          margin-top: 8px;
        }

        /* Buttons footer */
        .stepper-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          gap: 12px;
        }

        .btn-stepper {
          padding: 11px 20px;
          font-size: 13.5px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          outline: none;
        }

        .btn-stepper.primary {
          background: #ffffff;
          color: #013a17;
          flex: 1;
        }

        .btn-stepper.primary:hover {
          background: #d1e2c9;
        }

        .btn-stepper.secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-stepper.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stepper-error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 12px;
          color: #fca5a5;
          margin-bottom: 12px;
          text-align: center;
        }

        .success-step {
          text-align: center;
          padding: 16px 0;
        }

        .success-step h3 {
          font-size: 20px;
          font-weight: 800;
          margin: 10px 0 6px 0;
        }

        .success-step p {
          font-size: 13.5px;
          color: #f3f4f6;
          line-height: 1.5;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

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
              <h4>Save Time & Travel Costs</h4>
              <p>Skip browsing hundreds of outdated listings. We only send verified options.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="benefit-content">
              <h4>Access Off-Market Listings</h4>
              <p>Get priority access to properties that aren't advertised anywhere else online.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="benefit-content">
              <h4>100% Free Service for Clients</h4>
              <p>We work directly with owners and agencies to help you secure properties at no extra cost.</p>
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
