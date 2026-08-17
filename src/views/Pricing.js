"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useUserContext } from "../user_context";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

// Local PNG imports (same as in PaypalCheckout.js)
import tigo from "../utils/tigo.png";
import worldremit from "../utils/worldremit.png";

function Pricing() {
  const fireStoreData = useSelector(getFirestoreData);
  const { user, loginWithRedirect } = useUserContext();

  // Tab State: "listings" | "boosts"
  const [activeTab, setActiveTab] = useState("listings");

  // Selection states
  const [selectedBoost, setSelectedBoost] = useState(null); // { name, price }
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // "PayPal" | "MobileMoney"
  const [manualSender, setManualSender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { success: boolean, text: string }
  const [boostSuccessDetails, setBoostSuccessDetails] = useState(null);

  const selectionRef = useRef(null);
  const boostFormRef = useRef(null);

  const paypalOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "sb",
    currency: "USD",
    intent: "capture",
    vault: false
  };

  const handleSelectBoost = (name, price) => {
    if (!user) {
      loginWithRedirect();
      return;
    }
    setSelectedBoost({ name, price });
    setBoostSuccessDetails(null);
    setStatusMessage(null);
    setSelectedPropertyId("");
    setPaymentMethod("");
    setManualSender("");

    // Smooth scroll down to selector
    setTimeout(() => {
      selectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Filter listings belonging to the user
  const userProperties = fireStoreData
    ? fireStoreData.filter((el) => el.Email === user?.email && !el.removed)
    : [];

  const handleBoostSubmission = async (method, isPaid, reference = "") => {
    setIsSubmitting(true);
    setStatusMessage(null);

    const propertyObj = userProperties.find(p => String(p.adId) === selectedPropertyId || p.id === selectedPropertyId);
    if (!propertyObj) {
      setStatusMessage({ success: false, text: "Selected listing not found. Please select again." });
      setIsSubmitting(false);
      return;
    }

    try {
      const now = new Date();
      const startStr = now.toISOString().split("T")[0];
      const future = new Date();
      future.setMonth(future.getMonth() + 6); // Boosts are 6 Months
      const endStr = future.toISOString().split("T")[0];

      // 1. Update Firestore record
      const docRef = doc(db, "newAd", propertyObj.id || propertyObj.adId);
      await updateDoc(docRef, {
        boosted: isPaid ? true : "pending",
        boostPackage: selectedBoost.name,
        boostPrice: selectedBoost.price,
        boostStartDate: startStr,
        boostEndDate: endStr,
        boostPaymentMethod: method,
        boostPaymentReference: reference
      });

      const formEl = boostFormRef.current;
      if (formEl) {
        formEl.elements["from_name"].value = user.nickname || user.name || "Client";
        formEl.elements["from_email"].value = user.email || "";
        formEl.elements["reply_to"].value = user.email || "";
        formEl.elements["subject"].value = `🚀 ZanziHome Boost Request - ${selectedBoost.name}`;
        formEl.elements["message"].value = `
Client: ${user.nickname || user.name} (${user.email})
Boost Package: ${selectedBoost.name} ($${selectedBoost.price})
Payment Method: ${method}
Payment Reference: ${reference || "N/A"}

Property Title: ${propertyObj.Title}
Property ID: ${propertyObj.adId || propertyObj.id}
Area: ${propertyObj.Area}
Price: $${propertyObj.Price}
Boost Validity: ${startStr} to ${endStr}
        `;
      }

      // Send confirmation to user (admin is CC'ed automatically via EmailJS settings)
      try {
        if (formEl) {
          formEl.elements["to_email"].value = user.email || "";
        }
        await emailjs.sendForm(
          "service_thbibzh",
          "template_xn7q61k",
          boostFormRef.current,
          process.env.NEXT_PUBLIC_REACT_APP_EMAILJS || process.env.REACT_APP_EMAILJS || "yP8LTloRH-vMrxS8b"
        );
        console.log("Boost confirmation email sent to user");
      } catch (err) {
        console.error("Failed to send boost email to user:", err);
      }

      setBoostSuccessDetails({
        title: propertyObj.Title,
        email: user.email
      });

      setSelectedPropertyId("");
      setPaymentMethod("");
      setManualSender("");

    } catch (error) {
      console.error("Error updating listing in Firestore:", error);
      setStatusMessage({ success: false, text: "Error saving boost details. Please try again or contact support." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pricing-page-container">

      <style>{`
        .pricing-page-container {
          background: #fafbfa;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          padding-bottom: 80px;
        }

        /* Hero */
        .pricing-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .pricing-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }

        .pricing-hero-title {
          font-size: 40px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .pricing-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 600px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Toggle tabs */
        .tab-container {
          display: flex;
          justify-content: center;
          margin: 30px auto;
          max-width: 400px;
          background: #e5e7eb;
          border-radius: 12px;
          padding: 4px;
        }

        .tab-btn {
          flex: 1;
          border: none;
          padding: 12px 18px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #4b5563;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #013a17;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        /* Cards Layout */
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          max-width: 900px;
          margin: 40px auto 0 auto;
          padding: 0 20px;
          align-items: stretch;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .pricing-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .pricing-card.highlight {
          border-color: #013a17;
          box-shadow: 0 15px 35px rgba(1, 58, 23, 0.08);
        }

        .pricing-card.highlight::before {
          content: "RECOMMENDED";
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #013a17;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 20px;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px rgba(1, 58, 23, 0.2);
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 6px 0;
        }

        .card-desc {
          font-size: 13.5px;
          color: #374151;
          margin: 0 0 24px 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .price-box {
          display: flex;
          align-items: baseline;
          margin-bottom: 24px;
        }

        .currency {
          font-size: 24px;
          font-weight: 700;
          color: #013a17;
        }

        .amount {
          font-size: 48px;
          font-weight: 800;
          color: #013a17;
          line-height: 1;
        }

        .period {
          font-size: 14px;
          color: #6b7280;
          margin-left: 6px;
          font-weight: 400;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 35px 0;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 14px;
          line-height: 1.5;
        }

        .feature-icon {
          color: #013a17;
          font-size: 18px;
          flex-shrink: 0;
        }

        .action-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          box-sizing: border-box;
          background: #013a17;
          color: #ffffff;
          border: none;
          box-shadow: 0 4px 15px rgba(1, 58, 23, 0.2);
        }

        .action-btn:hover {
          background: #0d2818;
          box-shadow: 0 6px 20px rgba(1, 58, 23, 0.3);
        }

        /* Property selector box */
        .property-selector-box {
          max-width: 700px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
          margin: 60px auto 0 auto;
          padding: 30px;
        }

        .selector-title {
          font-size: 22px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 6px 0;
          text-align: center;
        }

        .selector-subtitle {
          font-size: 13.5px;
          color: #6b7280;
          text-align: center;
          margin: 0 0 24px 0;
        }

        .listings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .listing-select-row {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .listing-select-row:hover {
          border-color: #013a17;
          background: #f9fafb;
        }

        .listing-select-row.selected {
          border-color: #013a17;
          background: #f0f4f1;
        }

        .row-radio-input {
          margin-right: 16px;
          cursor: pointer;
          accent-color: #013a17;
          width: 18px;
          height: 18px;
        }

        .row-thumbnail {
          width: 60px;
          height: 45px;
          object-fit: cover;
          border-radius: 6px;
          margin-right: 14px;
        }

        .row-info {
          flex: 1;
        }

        .row-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 2px 0;
        }

        .row-meta {
          font-size: 12px;
          color: #6b7280;
        }

        .btn-submit-boost {
          width: 100%;
          background: #013a17;
          color: #ffffff;
          border: none;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-submit-boost:hover:not(:disabled) {
          background: #0d2818;
        }

        .btn-submit-boost:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        /* Status alerts styling */
        .status-alert {
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.5;
        }

        .status-alert.success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .status-alert.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .manual-pay-instructions {
          margin-top: 24px;
          border-top: 1px solid #e5e7eb;
          padding-top: 24px;
        }
      `}</style>
      <section className="pricing-hero">
        <h1 className="pricing-hero-title">Advertise for Free!</h1>
        <p className="pricing-hero-subtitle">
          It is completely free to list your properties on ZanziHome. If you want maximum exposure, choose one of our boost packages below to promote your listings!
        </p>
      </section>

      {statusMessage && (
        <div style={{ maxWidth: "600px", margin: "20px auto" }} className={`status-alert ${statusMessage.success ? "success" : "error"}`}>
          {statusMessage.text}
        </div>
      )}

      {/* Pricing Grid */}
      <section className="pricing-grid">
        {/* Boost Package 1: Top Ranking */}
        <div className="pricing-card">
          <h3 className="card-title">Top Ranking priority</h3>
          <p className="card-desc">Increase your views. Excellent for standard plots, local houses, and business listings.</p>
          <div className="price-box">
            <span className="currency">$</span>
            <span className="amount">25</span>
            <span className="period">/ 6 Months</span>
          </div>
          <ul className="features">
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Priority Top 10 Search Grid position</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Premium "⭐ Featured" gold badge</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Active Top-Priority for <strong>6 Months</strong></span>
            </li>
          </ul>
          <button onClick={() => handleSelectBoost("Top Ranking priority", 25)} className="action-btn">
            Boost Listing
          </button>
        </div>

        {/* Boost Package 2: Premium Rocket */}
        <div className="pricing-card highlight">
          <h3 className="card-title">Premium Rocket rank</h3>
          <p className="card-desc">Ultimate listing visibility. Best for luxury beachfront villas and commercial listings.</p>
          <div className="price-box">
            <span className="currency">$</span>
            <span className="amount">50</span>
            <span className="period">/ 6 Months</span>
          </div>
          <ul className="features">
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Highest Top 3 Search position (Always on top)</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Featured placement in Homepage Slider Carousel</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Glowing "🔥 Hot" badge for maximum click-through</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Direct click-to-WhatsApp link integration</span>
            </li>
          </ul>
          <button onClick={() => handleSelectBoost("Premium Rocket rank", 50)} className="action-btn">
            Boost Listing 🚀
          </button>
        </div>
      </section>

      {/* Boost Selection Drawer / Box */}
      {selectedBoost && (
        <section className="property-selector-box" ref={selectionRef}>
          {boostSuccessDetails ? (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                borderRadius: "16px",
                padding: "24px 20px",
                fontSize: "14.5px",
                lineHeight: "1.6",
                marginBottom: "24px",
                fontWeight: "500",
                boxShadow: "0 4px 15px rgba(6, 95, 70, 0.05)"
              }}>
                Awesome! We've received your request to boost "{boostSuccessDetails.title}". A confirmation email has been sent to {boostSuccessDetails.email}. Our admin team will contact you shortly to activate the boost.
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedBoost(null);
                  setBoostSuccessDetails(null);
                }}
                className="action-btn"
                style={{ display: "inline-block", width: "auto", padding: "12px 30px" }}
              >
                Close / Done
              </button>
            </div>
          ) : (
            <>
              <h3 className="selector-title">Select Listing to Boost</h3>
              <p className="selector-subtitle">
                You've selected the <strong>{selectedBoost.name}</strong> boost package (${selectedBoost.price}). Choose which of your listings you want to apply it to.
              </p>

              {userProperties.length > 0 ? (
                <div>
                  <div className="listings-list" style={{ marginBottom: "24px" }}>
                    {userProperties.map((prop) => {
                      const isSelected = selectedPropertyId === String(prop.id || prop.adId);
                      const imageUrl = prop.uri || prop.imagesArray?.[0] || "";

                      return (
                        <div
                          key={prop.id || prop.adId}
                          className={`listing-select-row ${isSelected ? "selected" : ""}`}
                          onClick={() => setSelectedPropertyId(String(prop.id || prop.adId))}
                        >
                          <input
                            type="radio"
                            name="boost-property"
                            value={prop.id || prop.adId}
                            checked={isSelected}
                            onChange={() => setSelectedPropertyId(String(prop.id || prop.adId))}
                            className="row-radio-input"
                          />
                          {imageUrl && (
                            <img src={imageUrl} alt={prop.Title} className="row-thumbnail" />
                          )}
                          <div className="row-info">
                            <h4 className="row-title">{prop.Title || "Untitled Property"}</h4>
                            <div className="row-meta">
                              <span>Area: <strong>{prop.Area}</strong></span>
                              <span style={{ margin: "0 8px" }}>•</span>
                              <span>ID: <strong>{prop.adId}</strong></span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedPropertyId && (
                    <div>
                      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
                        <button
                          onClick={() => setPaymentMethod("PayPal")}
                          style={{
                            flex: 1,
                            padding: "14px",
                            borderRadius: "12px",
                            border: paymentMethod === "PayPal" ? "2px solid #013a17" : "1px solid #e5e7eb",
                            background: paymentMethod === "PayPal" ? "#f0f4f1" : "#ffffff",
                            color: "#013a17",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          Pay with PayPal / Card
                        </button>
                        <button
                          onClick={() => setPaymentMethod("MobileMoney")}
                          style={{
                            flex: 1,
                            padding: "14px",
                            borderRadius: "12px",
                            border: paymentMethod === "MobileMoney" ? "2px solid #013a17" : "1px solid #e5e7eb",
                            background: paymentMethod === "MobileMoney" ? "#f0f4f1" : "#ffffff",
                            color: "#013a17",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          Mobile Money / Pesa
                        </button>
                      </div>

                      {paymentMethod === "PayPal" && (
                        <div style={{ background: "#f9fafb", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                          <PayPalScriptProvider options={paypalOptions}>
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: `${selectedBoost.price}.00`
                                      }
                                    }
                                  ]
                                });
                              }}
                              onApprove={async (data, actions) => {
                                const details = await actions.order.capture();
                                const payerName = details.payer.name.given_name || "PayPal Payer";
                                handleBoostSubmission("PayPal", true, `Payer: ${payerName} - ID: ${details.id}`);
                              }}
                              onError={(err) => {
                                console.error(err);
                                setStatusMessage({ success: false, text: "PayPal payment encountered an error. Please try again." });
                              }}
                            />
                          </PayPalScriptProvider>
                        </div>
                      )}

                      {paymentMethod === "MobileMoney" && (
                        <div className="manual-pay-instructions" style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                          
                          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
                            <img src={tigo} alt="Tigo Pesa" style={{ height: "35px", objectFit: "contain" }} />
                            <img src={worldremit} alt="WorldRemit" style={{ height: "35px", objectFit: "contain" }} />
                          </div>

                          <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "12px", marginBottom: "16px" }}>
                            <h4 style={{ margin: "0 0 6px 0", color: "#013a17", fontSize: "14px" }}>Option 1: Pay with Tigo Pesa</h4>
                            <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#4b5563", lineHeight: "1.5" }}>
                              <li>Send: <strong>${selectedBoost.price} USD</strong> (or equivalent in TZS)</li>
                              <li>Recipient Number: <strong>+255 0655 912 498</strong></li>
                              <li>Recipient Name: <strong>Mzee Muhammed</strong></li>
                            </ul>
                          </div>

                          <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "12px", marginBottom: "16px" }}>
                            <h4 style={{ margin: "0 0 6px 0", color: "#013a17", fontSize: "14px" }}>Option 2: Pay with WorldRemit</h4>
                            <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#4b5563", lineHeight: "1.5" }}>
                              <li>Select Country: <strong>Tanzania</strong></li>
                              <li>Method: <strong>Mobile Money Transfer</strong></li>
                              <li>Provider: <strong>Tigo Pesa</strong></li>
                              <li>Recipient Name: <strong>Mzee Muhammed</strong></li>
                              <li>City: <strong>Zanzibar</strong></li>
                              <li>Mobile Number: <strong>0713 288 772</strong></li>
                            </ul>
                          </div>

                          <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!manualSender.trim()) return;
                            handleBoostSubmission("Mobile Money (Pending Review)", false, manualSender);
                          }}>
                            <div style={{ marginBottom: "16px" }}>
                              <label style={{ display: "block", marginBottom: "6px", fontSize: "12.5px", fontWeight: "600", color: "#4b5563" }}>
                                Payment Reference / Sender Name
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Enter transaction code or sender name..."
                                value={manualSender}
                                onChange={(e) => setManualSender(e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  borderRadius: "8px",
                                  border: "1px solid #d1d5db",
                                  boxSizing: "border-box",
                                  fontSize: "13.5px",
                                  outline: "none"
                                }}
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting || !manualSender.trim()}
                              style={{
                                width: "100%",
                                background: "#013a17",
                                color: "#ffffff",
                                border: "none",
                                padding: "12px",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "14.5px",
                                cursor: "pointer",
                                transition: "background 0.2s"
                              }}
                            >
                              {isSubmitting ? "Submitting Boost..." : "I Have Sent Payment - Boost Listing"}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ color: "#6b7280", fontSize: "13.5px", marginBottom: "20px" }}>
                    You don't have any active listings associated with your account email (<strong>{user?.email}</strong>) yet.
                  </p>
                  <Link href="/checkout" className="action-btn" style={{ display: "inline-block", width: "auto" }}>
                    Create Your First Listing
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Hidden EmailJS form for sendForm */}
      <form ref={boostFormRef} style={{ display: "none" }}>
        <input type="text" name="to_name" defaultValue="Admin" />
        <input type="email" name="to_email" />
        <input type="text" name="from_name" />
        <input type="email" name="from_email" />
        <input type="email" name="reply_to" />
        <input type="text" name="subject" />
        <textarea name="message" />
      </form>
    </div>
  );
}

export default Pricing;
