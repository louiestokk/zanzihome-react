"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import AdsForm from "../components/AdsForm";
import Faq from "../components/Faq";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";
import PageHero from "../components/PageHero";
import { faqdata } from "../utils/faq";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUserContext } from "../user_context";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setFirestoreData, getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

// Local PNG imports (same as in PaypalCheckout.js)
import tigo from "../utils/tigo.png";
import worldremit from "../utils/worldremit.png";

const steps = ["Ad Details", "Confirmation"];

const Checkcout = ({ logedinUser }) => {
  const dispatch = useDispatch();
  const firestoreData = useSelector(getFirestoreData);
  const [adType, setadType] = useState("Properties");
  const { activeStep, setActiveStep, company } = useFormContext();
  const { user } = useUserContext();

  // Selected package details
  const [selectedPackage, setSelectedPackage] = useState({
    name: "Free Listing",
    price: 0,
    durationMonths: 6,
    description: "Completely free property listing."
  });
  const [adsData, setAdsData] = useState(null); // form inputs from AdsForm

  const adFormRef = useRef(null);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("Free Tier");
  const [manualSender, setManualSender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paypalOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "sb", // fallback to sandbox
    currency: "USD",
    intent: "capture",
    vault: false
  };

  React.useEffect(() => {
    setadType("Properties");
    setSelectedPackage({
      name: "Free Listing",
      price: 0,
      durationMonths: 6,
      description: "Completely free property listing."
    });
    setActiveStep(0);
  }, [setActiveStep]);

  const handleAdFormSubmit = async (formData) => {
    setAdsData(formData);
    await saveAdToDatabase("Free Tier", true, "Direct publication (Free promotion)", formData);
  };

  const saveAdToDatabase = async (method, isPaid, reference = "", currentAdsData = null) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const now = new Date();
      const startStr = now.toISOString().split("T")[0];
      
      const future = new Date();
      future.setMonth(future.getMonth() + 6);
      const endStr = future.toISOString().split("T")[0];

      const activeAdsData = currentAdsData || adsData;

      // Add subscription and payment fields to final ad payload
      const finalAdData = {
        ...activeAdsData,
        paid: isPaid ? true : "pending",
        packageType: selectedPackage.name,
        packagePrice: selectedPackage.price,
        startDate: startStr,
        endDate: endStr,
        paymentMethod: method,
        paymentReference: reference,
        Email: activeAdsData.Email || user?.email || "",
        userEmail: user?.email || "",
        isCompany: !company
      };

      // Write directly to Firestore
      const docRef = await addDoc(collection(db, "newAd"), finalAdData);
      console.log("Document successfully written with ID: ", docRef.id);

      // Update Redux state with new ad so it displays immediately on listings page and detail page
      const newAdWithId = {
        ...finalAdData,
        id: docRef.id
      };
      if (Array.isArray(firestoreData)) {
        dispatch(setFirestoreData([newAdWithId, ...firestoreData]));
      } else {
        dispatch(setFirestoreData([newAdWithId]));
      }

      const listingId = finalAdData.adId;
      const listingUrl = `https://www.zanzihome.com/propertys/property/${listingId}`;

      try {
        const emailResponse = await fetch("/api/listing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from_name: user?.nickname || activeAdsData.Name || "Publisher",
            from_email: user?.email || activeAdsData.Email || "",
            title: activeAdsData.Title || "New listing",
            price: activeAdsData.Price || selectedPackage.price,
            area: activeAdsData.Area || "Not provided",
            category: activeAdsData.category || activeAdsData.Adress || "Property",
            adType: activeAdsData.adType || adType,
            packageName: selectedPackage.name,
            paymentMethod: method,
            adId: listingId,
            listingUrl,
            message: activeAdsData.Text || activeAdsData.About || "No description provided.",
            phone: activeAdsData.Phone || "Not provided",
            whatsapp: activeAdsData.WhatsApp || "Not provided",
            rooms: activeAdsData.Rooms || "Not provided",
            size: activeAdsData.Size || "Not provided",
            rentOrSell: activeAdsData.Sell ? "For sale" : "For rent",
            companyName: company ? (activeAdsData.Name || "Company") : "Private seller"
          })
        });

        const emailResult = await emailResponse.json();
        if (!emailResponse.ok) {
          console.error("Failed to send listing emails via Resend:", emailResult?.error || emailResponse.statusText);
        } else {
          console.log("Listing confirmation and admin emails sent successfully via Resend");
        }
      } catch (err) {
        console.error("Failed to send listing email via Resend:", err);
      }

      setIsSubmitting(false);
      setActiveStep(1); // Advance to confirmation step

    } catch (error) {
      console.error("Error creating listing in Firestore:", error);
      setErrorMessage("Could not save listing details. Please try again or contact support.");
      setIsSubmitting(false);
    }
  };

  // 1. Step 0: Category Selector
  const Category = () => {
    const types = [
      {
        title: "Properties",
        icon: "https://www.svgrepo.com/show/485294/house.svg",
        description: "For example, houses, apartments, villas, beachfront plots, bungalows or businesses"
      }
    ];
    return (
      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#013a17", fontSize: "28px", fontWeight: "700" }}>
          What do you want to advertise?
        </h1>
        <div>
          {types.map((el, i) => (
            <section
              onClick={() => {
                setadType(el.title);
                setActiveStep(1);
              }}
              key={i}
              style={{
                background: "#ffffff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                padding: "20px",
                cursor: "pointer",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                transition: "all 0.2s ease"
              }}
              className="category-card-hover"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={el.icon}
                    alt={`${el.description} in Zanzibar`}
                    title={`${el.description} in Zanzibar`}
                    loading="lazy"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "14px"
                    }}
                  />
                  <h4 style={{ margin: 0, fontSize: "18px", color: "#1f2937" }}>{el.title}</h4>
                </div>
                <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Select Package next →</span>
              </div>
              <p style={{ margin: "10px 0 0 0", fontSize: "13.5px", color: "#6b7280", lineHeight: "1.5" }}>
                {el.description}
              </p>
            </section>
          ))}
        </div>
      </div>
    );
  };

  // 2. Step 1: Package Selector
  const PackageSelection = () => {
    const packages = [
      {
        name: "Free Listing",
        price: 0,
        durationMonths: 6,
        description: "Standard property listing. 2 free ads per user."
      },
      {
        name: "Premium Listing",
        price: 30,
        durationMonths: 12,
        description: "Double duration exposure. Excellent choice for developer apartments and agent portfolios."
      },
      {
        name: "Featured Listing",
        price: 50,
        durationMonths: 12,
        description: "Top-ranked visibility on the homepage to reach tens of thousands directly."
      }
    ];

    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#013a17", fontSize: "26px", fontWeight: "700" }}>
          Select Advertising Package
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", marginBottom: "30px" }}>
          Choose a listing plan to proceed. Get started with up to 2 free ads.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedPackage(pkg);
                setActiveStep(2); // Advance to AdsForm
              }}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              className="package-card-hover"
            >
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "18px", color: "#1f2937", fontWeight: "700" }}>{pkg.name}</h4>
                <p style={{ margin: 0, fontSize: "13.5px", color: "#6b7280", lineHeight: "1.5" }}>{pkg.description}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#013a17" }}>${pkg.price}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>for {pkg.durationMonths} Months</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3. Step 3: Payment Selection & Forms
  const PaymentSelection = () => {
    const handlePayPalApprove = (details) => {
      const payerName = details.payer.name.given_name || "PayPal Payer";
      saveAdToDatabase("PayPal", true, `Payer: ${payerName} - ID: ${details.id}`);
    };

    return (
      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", color: "#013a17", fontSize: "24px", fontWeight: "700" }}>
          Complete Listing Payment
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "13.5px", marginBottom: "24px" }}>
          You've selected the <strong>{selectedPackage.name}</strong> (${selectedPackage.price} for {selectedPackage.durationMonths} Months).
        </p>

        {errorMessage && (
          <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fca5a5", borderRadius: "12px", padding: "16px", marginBottom: "20px", fontSize: "14px" }}>
            {errorMessage}
          </div>
        )}

        {/* Tab Header Selector */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
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
            Pay with PayPal or Card
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
            Mobile Money / Transfer
          </button>
        </div>

        {/* PayPal Option */}
        {paymentMethod === "PayPal" && (
          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            <h4 style={{ margin: "0 0 16px 0", color: "#1f2937", fontSize: "15px", fontWeight: "600" }}>
              Pay Securely via PayPal for <strong>{selectedPackage?.name}</strong> (${selectedPackage?.price})
            </h4>
            
            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${selectedPackage.price}.00`
                        }
                      }
                    ]
                  });
                }}
                onApprove={async (data, actions) => {
                  // Order transaction capture
                  const details = await actions.order.capture();
                  handlePayPalApprove(details);
                }}
                onError={(err) => {
                  console.error(err);
                  setErrorMessage("PayPal payment encountered an error. Please try again.");
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {/* Mobile Money Option */}
        {paymentMethod === "MobileMoney" && (
          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
              <img src={tigo} alt="Tigo Pesa" style={{ height: "45px", objectFit: "contain" }} />
              <img src={worldremit} alt="WorldRemit" style={{ height: "45px", objectFit: "contain" }} />
            </div>

            <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#013a17", fontSize: "15px" }}>Option 1: Pay with Tigo Pesa</h4>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "#4b5563", lineStyleType: "circle", lineHeight: "1.6" }}>
                <li>Send: <strong>${selectedPackage.price} USD</strong> (or equivalent in TZS)</li>
                <li>Recipient Number: <strong>+255 0655 912 498</strong></li>
                <li>Recipient Name: <strong>Mzee Muhammed</strong></li>
              </ul>
            </div>

            <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#013a17", fontSize: "15px" }}>Option 2: Pay with WorldRemit</h4>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "#4b5563", lineStyleType: "circle", lineHeight: "1.6" }}>
                <li>Select Country: <strong>Tanzania</strong></li>
                <li>Method: <strong>Mobile Money Transfer</strong></li>
                <li>Provider: <strong>Tigo Pesa</strong></li>
                <li>Recipient Name: <strong>Mzee Muhammed</strong></li>
                <li>City: <strong>Zanzibar</strong></li>
                <li>Mobile Number: <strong>0655 912 498</strong></li>
              </ul>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!manualSender.trim()) return;
              saveAdToDatabase("Mobile Money (Pending Review)", false, manualSender);
            }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
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
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    boxSizing: "border-box",
                    fontSize: "14px",
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
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
              >
                {isSubmitting ? "sending request..." : "I Have Sent Payment - Submit Ad"}
              </button>
            </form>
          </div>
        )}

      </div>
    );
  };

  return (
    <Wrapper>
      <Paper elevation={0} style={{ borderBottom: "1px solid #e5e7eb", background: "#ffffff" }}>
        <Stepper activeStep={activeStep} alternativeLabel style={{ padding: "24px 0" }}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Steps Handler */}
      {activeStep === 0 && (
        <div style={{ maxWidth: "1100px", margin: "1.5rem auto", padding: "0 20px", width: "100%", boxSizing: "border-box" }}>
          <AdsForm 
            setActiveStep={setActiveStep} 
            adType={adType} 
            onFormSubmit={handleAdFormSubmit} 
          />

          {/* Beautiful premium banner explaining advertising is free */}
          <div style={{
            background: "linear-gradient(135deg, #013a17 0%, #0b8b3a 100%)",
            color: "#ffffff",
            padding: "24px 24px",
            borderRadius: "16px",
            textAlign: "left",
            marginTop: "40px",
            marginBottom: "20px",
            boxShadow: "0 8px 25px rgba(1, 58, 23, 0.15)",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Poppins', sans-serif"
          }}>
            {/* Subtle background overlay graphics */}
            <div style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.03)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-20px",
              left: "-20px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.02)",
              pointerEvents: "none"
            }} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
              <div style={{ flex: "1 1 450px" }}>
                <div style={{
                  display: "inline-block",
                  background: "rgba(255, 255, 255, 0.12)",
                  padding: "4px 10px",
                  borderRadius: "30px",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                  textTransform: "uppercase"
                }}>
                  ✨ Reach Zanzibar's Largest Audience
                </div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px", lineHeight: "1.2" }}>
                  Publish Your Listing for Free!
                </h2>
                <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "#e2f0dc", fontWeight: "300", lineHeight: "1.5", maxWidth: "600px" }}>
                  Get maximum visibility on Zanzibar's leading real estate platform. Showcase your villa, apartment, or plot to thousands of active buyers and renters.
                </p>
              </div>

              {/* Stat Card */}
              <div style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "14px 20px",
                borderRadius: "12px",
                flex: "1 1 200px",
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                boxSizing: "border-box"
              }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", lineHeight: "1" }}>10,000+</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#e2f0dc", marginTop: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Active Monthly Users</div>
                <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.15)", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "center", gap: "6px", fontSize: "11px", color: "#ffffff", fontWeight: "600" }}>
                  <span>✓ Free Tier</span>
                  <span>•</span>
                  <span>✓ Instant Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div style={{ maxWidth: "700px", margin: "3rem auto", padding: "0 20px" }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)",
            padding: "40px",
            textAlign: "center"
          }}>
            {/* Checkmark Circle */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "#ecfdf5",
              color: "#059669",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
              fontSize: "40px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(5, 150, 105, 0.1)"
            }}>
              ✓
            </div>

            <h2 style={{ color: "#013a17", fontSize: "28px", fontWeight: "800", margin: "0 0 10px 0", letterSpacing: "-0.5px" }}>
              Your Ad is Now Live!
            </h2>
            <p style={{ color: "#6b7280", fontSize: "15px", margin: "0 0 30px 0", lineHeight: "1.6" }}>
              Thank you for advertising on ZanziHome.
            </p>

            {/* Listing Details Card */}
            {adsData && (
              <div style={{
                background: "#f9fafb",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                padding: "24px",
                textAlign: "left",
                marginBottom: "35px"
              }}>
                <h4 style={{ margin: "0 0 16px 0", color: "#1f2937", fontSize: "16px", fontWeight: "700", borderBottom: "1px solid #e5e7eb", paddingBottom: "10px" }}>
                  Ad Details Summary
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#9ca3af", display: "block", fontWeight: "600", letterSpacing: "0.5px" }}>PROPERTY TITLE</span>
                    <strong style={{ fontSize: "14px", color: "#1f2937" }}>{adsData.Title}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#9ca3af", display: "block", fontWeight: "600", letterSpacing: "0.5px" }}>PRICE</span>
                    <strong style={{ fontSize: "14px", color: "#013a17" }}>${adsData.Price}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#9ca3af", display: "block", fontWeight: "600", letterSpacing: "0.5px" }}>LOCATION</span>
                    <strong style={{ fontSize: "14px", color: "#1f2937" }}>{adsData.Area}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#9ca3af", display: "block", fontWeight: "600", letterSpacing: "0.5px" }}>AD ID</span>
                    <strong style={{ fontSize: "14px", color: "#1f2937" }}>{adsData.adId}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link 
                href={`/propertys/property/${adsData?.adId}`}
                style={{
                  display: "block",
                  background: "#013a17",
                  color: "#ffffff",
                  padding: "16px 28px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(1, 58, 23, 0.2)",
                  transition: "all 0.2s",
                  fontSize: "15px"
                }}
              >
                View Your Ad Live
              </Link>
              
              <Link 
                href="/properties-zanzibar"
                style={{
                  display: "block",
                  background: "#ffffff",
                  color: "#013a17",
                  border: "2px solid #013a17",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  fontSize: "15px"
                }}
              >
                View All Properties
              </Link>
            </div>

            {/* Boost Listing Promo Box */}
            <div style={{
              marginTop: "40px",
              paddingTop: "30px",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#1f2937", fontSize: "16px", fontWeight: "700", margin: "0 0 8px 0" }}>
                🚀 Want 10x More Exposure?
              </h4>
              <p style={{ color: "#6b7280", fontSize: "13.5px", margin: "0 0 20px 0", lineHeight: "1.5" }}>
                Boost your listing to appear at the very top of search results and on our homepage featured slider.
              </p>
              <Link
                href="/boost-listing"
                style={{
                  display: "inline-block",
                  background: "#e5e7eb",
                  color: "#1f2937",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  transition: "all 0.2s"
                }}
              >
                Check Boost Packages
              </Link>
            </div>

          </div>
        </div>
      )}
      
      <div style={{ marginTop: '50px' }}>
        <Faq data={faqdata} />
      </div>

      {/* Hidden EmailJS form for sendForm */}
      <form ref={adFormRef} style={{ display: "none" }}>
        <input type="text" name="to_name" defaultValue="Admin" />
        <input type="email" name="to_email" />
        <input type="text" name="from_name" />
        <input type="email" name="from_email" />
        <input type="email" name="reply_to" />
        <input type="text" name="subject" />
        <textarea name="message" />
        <input type="text" name="package_name" />
        <input type="text" name="package_price" />
        <input type="text" name="duration_months" />
        <input type="text" name="start_date" />
        <input type="text" name="expiry_date" />
        <input type="text" name="renewal_date" />
        <input type="text" name="ad_title" />
        <input type="text" name="ad_id" />
        <input type="text" name="payment_method" />
        <input type="text" name="payment_status" />
        <input type="text" name="payment_reference" />
      </form>
    </Wrapper>
  );
};

export default Checkcout;
const Wrapper = styled.section`
  background: #fafbfa;
  min-height: 100vh;
  padding-bottom: 50px;

  .category-card-hover:hover {
    border-color: #013a17 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(1, 58, 23, 0.06) !important;
  }

  .package-card-hover:hover {
    border-color: #013a17 !important;
    background-color: #fcfdfc !important;
    box-shadow: 0 8px 25px rgba(1, 58, 23, 0.05) !important;
    transform: translateY(-2px);
  }
`;
