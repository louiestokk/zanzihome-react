"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useUserContext } from "../user_context";
import emailjs from "@emailjs/browser";

function Advertise() {
  const fireStoreData = useSelector(getFirestoreData);
  const { user, loginWithRedirect } = useUserContext();
  
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Selection & Email state variables
  const [selectedPackage, setSelectedPackage] = useState(null); // { name, price }
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // { success: boolean, message: string }

  const selectionRef = useRef(null);
  const advertiseFormRef = useRef(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSelectPackage = (name, price) => {
    // 1. If user is not logged in, ask them to log in
    if (!user) {
      loginWithRedirect();
      return;
    }

    // 2. Otherwise set package details and scroll to property selector
    setSelectedPackage({ name, price });
    setEmailStatus(null);
    setSelectedPropertyId("");
    
    // Smooth scroll down to selector
    setTimeout(() => {
      selectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!selectedPropertyId) return;

    const propertyObj = userProperties.find(p => p.adId === Number(selectedPropertyId));
    if (!propertyObj) return;

    setLoadingEmail(true);
    setEmailStatus(null);

    try {
      const formEl = advertiseFormRef.current;
      if (formEl) {
        formEl.elements["from_name"].value = user.nickname || user.name || "Client";
        formEl.elements["from_email"].value = user.email || "";
        formEl.elements["reply_to"].value = user.email || "";
        formEl.elements["subject"].value = `🚀 ZanziHome Boost Request - ${selectedPackage.name}`;
        formEl.elements["message"].value = `
Client: ${user.nickname || user.name} (${user.email})
Boost Package: ${selectedPackage.name} ($${selectedPackage.price})
Property Title: ${propertyObj.Title}
Property ID: ${propertyObj.adId || propertyObj.id}
Area: ${propertyObj.Area}
Price: $${propertyObj.Price}
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
          advertiseFormRef.current,
          process.env.NEXT_PUBLIC_REACT_APP_EMAILJS || process.env.REACT_APP_EMAILJS || "yP8LTloRH-vMrxS8b"
        );
        console.log("Boost confirmation email sent to user");
      } catch (err) {
        console.error("Failed to send boost email to user:", err);
      }

      setEmailStatus({
        success: true,
        message: `Awesome! We've received your request to boost "${propertyObj.Title}". A confirmation email has been sent to ${user.email}. Our admin team will contact you shortly to activate the boost.`
      });
    } catch (err) {
      console.error(err);
      setEmailStatus({
        success: false,
        message: err.response?.data?.error || err.message || "An error occurred while sending your request. Please try again."
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  // Filter firestore listings belonging to the logged-in user
  const userProperties = fireStoreData
    ? fireStoreData.filter((el) => el.Email === user?.email && !el.removed)
    : [];

  const faqs = [
    {
      q: "How does the listing boost work?",
      a: "When you boost a listing, our system prioritizes it in searches. The Top Ranking priority ($25) places you in the top 10 search results. The Premium Rocket priority ($50) places you in the top 3 spots, adds you to the homepage featured slider, and gives you a hot badge."
    },
    {
      q: "Can I upgrade my boost package later?",
      a: "Yes! You can upgrade an active Top Ranking package to Premium Rocket at any time to unlock maximum homepage exposure."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Visa, Mastercard, AMEX, mobile money (M-Pesa, Tigopesa) and local bank transfers. All transactions are fully secured."
    },
    {
      q: "How long does it take for my boost to go active?",
      a: "Boosts are activated immediately after payment is confirmed. If your listing needs manual moderation, it will be completed in less than 2 hours."
    }
  ];

  return (
    <div className="advertise-page-container">

      <style>{`
        .advertise-page-container {
          background: #fafbfa;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          padding-bottom: 80px;
        }

        /* Hero Banner */
        .promo-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .promo-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }

        .promo-breadcrumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #a3b899;
          margin-bottom: 16px;
        }

        .promo-breadcrumbs a {
          color: #a3b899;
          text-decoration: none;
          transition: color 0.2s;
        }

        .promo-breadcrumbs a:hover {
          color: #ffffff;
        }

        .promo-hero-title {
          font-size: 42px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .promo-hero-subtitle {
          font-size: 16px;
          color: #d1e2c9;
          max-width: 650px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Main pricing section */
        .pricing-section {
          max-width: 900px;
          margin: 40px auto 0 auto;
          padding: 0 20px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          align-items: stretch;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .price-card {
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

        .price-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        /* Highlighted Premium card */
        .price-card.premium-glow {
          border-color: #013a17;
          box-shadow: 0 15px 35px rgba(1, 58, 23, 0.08);
        }

        .price-card.premium-glow::before {
          content: "MOST POPULAR";
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

        .package-name {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .package-desc {
          font-size: 13.5px;
          color: #374151;
          margin: 0 0 24px 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .package-price-box {
          display: flex;
          align-items: baseline;
          margin-bottom: 24px;
        }

        .price-currency {
          font-size: 24px;
          font-weight: 700;
          color: #013a17;
          margin-right: 2px;
        }

        .price-amount {
          font-size: 48px;
          font-weight: 800;
          color: #013a17;
          line-height: 1;
        }

        .price-period {
          font-size: 14px;
          color: #6b7280;
          margin-left: 6px;
          font-weight: 400;
        }

        /* Features list styles */
        .features-list {
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
          margin-top: 2px;
        }

        .btn-boost-action {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px 24px;
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

        .btn-boost-action:hover {
          background: #0d2818;
          box-shadow: 0 6px 20px rgba(1, 58, 23, 0.3);
        }

        /* Property selector panel styles */
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
          color: #111827;
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

        /* FAQs section styling */
        .faq-section {
          max-width: 700px;
          margin: 80px auto 0 auto;
          padding: 0 20px;
        }

        .faq-title {
          font-size: 28px;
          font-weight: 700;
          color: #013a17;
          text-align: center;
          margin-bottom: 30px;
        }

        .faq-item {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          padding: 18px 24px;
          text-align: left;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          outline: none;
          transition: background-color 0.2s;
        }

        .faq-question-btn:hover {
          background: #f9fafb;
        }

        .faq-answer {
          padding: 0 24px 20px 24px;
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          border-top: 1px solid transparent;
        }

        .faq-icon-arrow {
          transition: transform 0.3s;
        }

        .faq-icon-arrow.rotated {
          transform: rotate(180deg);
        }
      `}</style>

      {/* Hero */}
      <header className="promo-hero">
        <div className="promo-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/properties-zanzibar">Properties</Link>
          <span>/</span>
          <span>Promote</span>
        </div>
        <h1 className="promo-hero-title">Sell or Rent Faster!</h1>
        <p className="promo-hero-subtitle">
          Boost your property listing and get maximum visibility on ZanziHome. Reaches thousands of daily active buyers and renters looking for houses, villas, and plots in Zanzibar.
        </p>
      </header>

      {/* Pricing Grid */}
      <section className="pricing-section">
        <div className="pricing-grid">
          
          {/* Card 1: Top Ranking */}
          <div className="price-card">
            <h3 className="package-name">Top Ranking priority</h3>
            <p className="package-desc">Increase your views. Excellent for standard plots, local houses, and business advertisements.</p>
            <div className="package-price-box">
              <span className="price-currency">$</span>
              <span className="price-amount">25</span>
              <span className="price-period">/ per listing</span>
            </div>
            
            <ul className="features-list">
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Active Top-Priority for <strong>6 Months</strong></span>
              </li>
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
                <span>Higher conversion rates on categories</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPackage("Top Ranking priority", "25")}
              className="btn-boost-action"
            >
              Get Started
            </button>
          </div>

          {/* Card 2: Rocket Premium */}
          <div className="price-card premium-glow">
            <h3 className="package-name">Premium Rocket rank</h3>
            <p className="package-desc">Ultimate listing visibility. Best for beachfront villas, luxury apartments, and quick sales.</p>
            <div className="package-price-box">
              <span className="price-currency">$</span>
              <span className="price-amount">50</span>
              <span className="price-period">/ per listing</span>
            </div>

            <ul className="features-list">
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Active Top-Priority for <strong>6 Months</strong></span>
              </li>
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
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Automated syndication to social media outlets</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPackage("Premium Rocket rank", "50")}
              className="btn-boost-action"
            >
              Get Maximum Exposure 🚀
            </button>
          </div>

        </div>
      </section>

      {/* Property Selector Section */}
      {selectedPackage && (
        <section className="property-selector-box" ref={selectionRef}>
          <h3 className="selector-title">Select Property to Boost</h3>
          <p className="selector-subtitle">
            You've selected the <strong>{selectedPackage.name}</strong> package (${selectedPackage.price}). Choose which listing to apply it to.
          </p>


          {userProperties.length > 0 ? (
            <form onSubmit={handleSendRequest}>
              <div className="listings-list">
                {userProperties.map((prop) => {
                  const isSelected = selectedPropertyId === String(prop.adId);
                  const imageUrl = prop.uri || prop.imagesArray?.[0] || "";

                  return (
                    <div
                      key={prop.adId}
                      className={`listing-select-row ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedPropertyId(String(prop.adId))}
                    >
                      <input
                        type="radio"
                        name="boost-property"
                        value={prop.adId}
                        checked={isSelected}
                        onChange={() => setSelectedPropertyId(String(prop.adId))}
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
   {emailStatus && (
            <div className={`status-alert ${emailStatus.success ? "success" : "error"}`}>
              {emailStatus.message}
            </div>
          )}
              <button
                type="submit"
                disabled={!selectedPropertyId || loadingEmail}
                className="btn-submit-boost"
              >
                {loadingEmail ? "Processing Request..." : "Contact Me & Boost Listing"}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
                You don't have any active property listings associated with your account email (<strong>{user?.email}</strong>) yet.
              </p>
              <Link href="/checkout" className="btn-boost-action" style={{ display: "inline-block", width: "auto" }}>
                Create Your First Listing
              </Link>
            </div>
          )}
        </section>
      )}

      {/* FAQ block */}
      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div className="faq-item" key={idx}>
            <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
              <span>{faq.q}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`faq-icon-arrow ${activeFaq === idx ? "rotated" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {activeFaq === idx && <div className="faq-answer">{faq.a}</div>}
          </div>
        ))}
      </section>

      {/* Hidden EmailJS form for sendForm */}
      <form ref={advertiseFormRef} style={{ display: "none" }}>
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

export default Advertise;
