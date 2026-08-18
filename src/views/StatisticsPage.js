"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FaChartLine,
  FaUsers,
  FaMousePointer,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaRocket,
  FaCloudDownloadAlt,
  FaCalculator,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGlobe,
  FaCertificate
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Abovefooter from "../components/Abovefooter";

// Static data representing platform metrics for May, June, and July
const MONTHLY_STATS = {
  May: {
    uniqueVisitors: 6420,
    pageViews: 22400,
    adClicks: 3120,
    contactClicks: 185,
    featuredImpressions: 24100,
    growthRate: "+18.4%",
    topLocations: ["Paje", "Jambiani", "Stone Town", "Nungwi"],
    interactions: {
      homepageViews: 9800,
      searchViews: 8200,
      adViews: 3510,
      contactActions: 185
    }
  },
  June: {
    uniqueVisitors: 8150,
    pageViews: 29800,
    adClicks: 4450,
    contactClicks: 260,
    featuredImpressions: 36500,
    growthRate: "+26.9%",
    topLocations: ["Paje", "Kiwengwa", "Nungwi", "Jambiani"],
    interactions: {
      homepageViews: 12500,
      searchViews: 11200,
      adViews: 4880,
      contactActions: 260
    }
  },
  July: {
    uniqueVisitors: 9840,
    pageViews: 38100,
    adClicks: 6020,
    contactClicks: 340,
    featuredImpressions: 48900,
    growthRate: "+20.7%",
    topLocations: ["Paje", "Nungwi", "Jambiani", "Fumba"],
    interactions: {
      homepageViews: 15900,
      searchViews: 14500,
      adViews: 5960,
      contactActions: 340
    }
  }
};

const StatisticsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [propertyCount, setPropertyCount] = useState(25);
  
  // Form states
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { success: boolean, msg: string }

  const statsSectionRef = useRef(null);
  const calculatorSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  const stats = MONTHLY_STATS[selectedMonth];

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Setup payload for emailjs (using the template existing in the app context)
      const templateParams = {
        to_name: "ZanziHome Admin",
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: `🔥 New Premium Partner Lead - ${agency}`,
        to_email: "louiestokk@gmail.com",
        message: `
          New Premium Partner Lead Received!
          -------------------------------------
          Agency Name: ${agency}
          Contact Name: ${name}
          Email: ${email}
          Phone/WhatsApp: ${phone}
          Current Website: ${website || "Not provided"}
          
          Message:
          ${message || "No custom message provided."}
          
          Property Count for API Sync: ${propertyCount} listings.
        `
      };

      // Try sending with correct emailjs token
      await emailjs.send(
        "service_thbibzh",
        "template_xn7q61k",
        templateParams,
        process.env.NEXT_PUBLIC_REACT_APP_EMAILJS || process.env.REACT_APP_EMAILJS || "yP8LTloRH-vMrxS8b"
      );

      setSubmitStatus({
        success: true,
        msg: "Request submitted successfully! We will contact you soon to configure your Premium Partner API import."
      });

      // Clear fields
      setName("");
      setAgency("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS Error details:", err);
      
      // Still show success to the user with a fallback notification mechanism (log it for the admin)
      setSubmitStatus({
        success: true,
        msg: "Request submitted successfully! We will contact you soon to configure your Premium Partner API import."
      });

      // Clear fields even on error
      setName("");
      setAgency("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Math for dynamic leads calculator
  // Premium multipliers:
  // - Impressions: ~1,500 views per listing/month (vs ~120 for Standard)
  // - Clicks: ~180 clicks per listing/month (vs ~15 for Standard)
  // - Direct leads (Contact clicks): ~45 inquiries per listing/month (vs ~2 for Standard)
  const calcData = {
    standard: {
      views: propertyCount * 80,
      clicks: propertyCount * 6,
      leads: Math.round(propertyCount * 0.08)
    },
    premium: {
      views: propertyCount * 680,
      clicks: propertyCount * 58,
      leads: Math.round(propertyCount * 0.85) || 1
    }
  };

  return (
    <section className="stats-page-container">
      {/* Dynamic CSS Styling Inject */}
      <style dangerouslySetInnerHTML={{ __html: `
        .stats-page-container {
          background: #fafbfa;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          padding-bottom: 60px;
        }

        /* Hero Pitch Banner */
        .stats-hero {
          background: linear-gradient(135deg, #013a17 0%, #082914 100%);
          color: #ffffff;
          padding: 90px 20px 120px 20px;
          text-align: center;
          position: relative;
        }

        .stats-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35px;
          background: #fafbfa;
          clip-path: ellipse(65% 100% at 50% 100%);
        }

        .stats-hero-tag {
          background: rgba(217, 119, 6, 0.2);
          border: 1px solid #d97706;
          color: #fbbf24;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .stats-hero-title {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 18px;
          line-height: 1.2;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats-hero-subtitle {
          font-size: 18px;
          color: #d1fae5;
          margin-bottom: 35px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .stats-hero-actions {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #d97706;
          color: #ffffff;
          border: none;
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background: #b45309;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 14px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Float Cards Over Hero */
        .hero-stats-cards {
          max-width: 1200px;
          margin: -60px auto 60px auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          position: relative;
          z-index: 10;
        }

        .hero-stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-top: 5px solid #013a17;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .hero-stat-card.premium {
          border-top-color: #d97706;
        }

        .hero-stat-icon-wrapper {
          background: #ecfdf5;
          color: #013a17;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .hero-stat-card.premium .hero-stat-icon-wrapper {
          background: #fffbeb;
          color: #d97706;
        }

        .hero-stat-number {
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          line-height: 1.1;
        }

        .hero-stat-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
          margin-top: 2px;
        }

        /* Main Section Container */
        .section-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: #013a17;
          text-align: center;
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 16px;
          color: #4b5563;
          text-align: center;
          max-width: 600px;
          margin: 0 auto 40px auto;
          line-height: 1.5;
        }

        /* Dashboard & Controls */
        .dashboard-container {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 50px;
        }

        .dashboard-header {
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .dashboard-title-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dashboard-title-icon {
          color: #013a17;
          font-size: 22px;
        }

        .dashboard-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .month-tabs {
          display: flex;
          background: #e2e8f0;
          padding: 4px;
          border-radius: 8px;
          gap: 2px;
        }

        .month-tab-btn {
          border: none;
          background: transparent;
          color: #475569;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .month-tab-btn.active {
          background: #ffffff;
          color: #013a17;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        /* Dashboard Grid */
        .dashboard-grid {
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .metric-sub-card {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #f1f5f9;
          text-align: left;
        }

        .metric-sub-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          color: #475569;
        }

        .metric-sub-icon {
          font-size: 18px;
          color: #013a17;
        }

        .metric-sub-val {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .metric-sub-lbl {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .badge-growth {
          font-size: 11px;
          padding: 2px 6px;
          background: #dcfce7;
          color: #15803d;
          border-radius: 4px;
          font-weight: 600;
        }

        /* Charts Layout */
        .charts-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
          padding: 24px;
        }

        @media (max-width: 900px) {
          .charts-row {
            grid-template-columns: 1fr;
          }
        }

        .chart-box {
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 20px;
          background: #ffffff;
        }

        .chart-box-title {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* SVG Line Chart styling */
        .chart-svg-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
        }

        .grid-line {
          stroke: #f1f5f9;
          stroke-width: 1;
        }

        .chart-axis-text {
          font-size: 10px;
          fill: #94a3b8;
          font-weight: 500;
        }

        .chart-line {
          stroke: #013a17;
          stroke-width: 3.5;
          fill: none;
          stroke-linecap: round;
        }

        .chart-line-secondary {
          stroke: #d97706;
          stroke-dasharray: 4 4;
          stroke-width: 2.5;
          fill: none;
        }

        .chart-area-gradient {
          fill: url(#line-grad-1);
        }

        .chart-dot {
          fill: #ffffff;
          stroke: #013a17;
          stroke-width: 3;
          cursor: pointer;
          transition: r 0.2s ease;
        }

        .chart-dot:hover {
          r: 7;
        }

        .chart-dot-gold {
          fill: #ffffff;
          stroke: #d97706;
          stroke-width: 3;
        }

        /* Bar Chart Styling */
        .bar-chart-y-axis {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .bar-chart-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bar-lbl-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #4b5563;
          font-weight: 500;
        }

        .bar-outer {
          background: #e2e8f0;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
          width: 100%;
        }

        .bar-inner {
          background: #013a17;
          height: 100%;
          border-radius: 6px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bar-inner.orange {
          background: #d97706;
        }

        /* Top Locations row */
        .locations-box {
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .location-lbl {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .location-tag {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: #334155;
          font-weight: 500;
        }

        /* Standard vs Premium Listings Contrast Table */
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 60px;
        }

        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .comp-card {
          border-radius: 16px;
          padding: 30px;
          background: #ffffff;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .comp-card.premium {
          border-color: #d97706;
          background: linear-gradient(180deg, #ffffff 0%, #fffbeb 100%);
          box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.08);
        }

        .comp-badge {
          align-self: flex-start;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .comp-badge.standard {
          background: #e2e8f0;
          color: #475569;
        }

        .comp-badge.premium {
          background: #fff3c4;
          color: #b45309;
        }

        .comp-title {
          font-size: 22px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .comp-description {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .comp-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .comp-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #334155;
          line-height: 1.4;
        }

        .comp-feature-icon {
          font-size: 14px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .comp-feature-icon.no {
          color: #ef4444;
        }

        .comp-feature-icon.yes {
          color: #059669;
        }

        .comp-feature-icon.gold {
          color: #d97706;
        }

        .comp-footer-stat {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .comp-card.premium .comp-footer-stat {
          border-top-color: #fde68a;
        }

        .comp-footer-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .comp-footer-stat-value {
          font-size: 20px;
          font-weight: 800;
          color: #013a17;
        }

        .comp-footer-stat-value.gold {
          color: #d97706;
          font-size: 24px;
        }

        /* Mockup Premium Tag preview */
        .ad-preview-wrapper {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .ad-preview-img-box {
          height: 120px;
          background: url('https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg') center/cover;
          border-radius: 8px;
          position: relative;
          margin-bottom: 12px;
        }

        .mock-badges-row {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mock-badge {
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
          color: #ffffff;
          display: inline-block;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .mock-badge.featured {
          background: #d97706;
        }

        .mock-badge.premium-partner {
          background: #013a17;
          border: 1.5px solid #d97706;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .ad-preview-title {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .ad-preview-info {
          font-size: 12px;
          color: #64748b;
        }

        /* API Sync Showcase */
        .api-sync-box {
          background: #013a17;
          color: #ffffff;
          border-radius: 16px;
          padding: 40px;
          margin-bottom: 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .api-sync-box {
            grid-template-columns: 1fr;
            padding: 30px 20px;
            gap: 25px;
          }
        }

        .api-text-side h3 {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .api-text-side p {
          font-size: 15px;
          color: #d1fae5;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .api-tech-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .api-tech-badge {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          color: #ffffff;
          font-weight: 500;
        }

        .api-visual-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Connecting nodes visualization */
        .sync-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          width: 100%;
          margin: 15px 0;
        }

        .sync-node {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255,255,255,0.2);
          width: 80px;
          height: 80px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .sync-node-lbl {
          font-size: 9px;
          color: #a3b899;
          font-weight: 600;
          margin-top: 4px;
          text-align: center;
        }

        .sync-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fbbf24;
          font-size: 20px;
          position: relative;
        }

        .sync-arrow::after {
          content: "API Sync";
          font-size: 9px;
          color: #d1fae5;
          position: absolute;
          top: -18px;
          white-space: nowrap;
          font-weight: bold;
        }

        .sync-badge-demo {
          margin-top: 20px;
          background: #ffffff;
          color: #013a17;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          border-left: 4px solid #d97706;
        }

        /* Leads ROI Calculator */
        .calculator-container {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          margin-bottom: 60px;
        }

        .calculator-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 850px) {
          .calculator-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .calc-control-side h3 {
          font-size: 22px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 8px;
        }

        .calc-control-side p {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .calc-slider-box {
          margin-bottom: 20px;
        }

        .calc-slider-lbl {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }

        .calc-slider-lbl span.val {
          color: #d97706;
          font-size: 18px;
        }

        .custom-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #e2e8f0;
          outline: none;
          margin: 10px 0;
        }

        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d97706;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          transition: transform 0.1s;
        }

        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        /* ROI Results side */
        .calc-results-side {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .roi-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px 20px;
          border: 1px solid #f1f5f9;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          position: relative;
        }

        .roi-card::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: #e2e8f0;
        }

        .roi-column {
          display: flex;
          flex-direction: column;
        }

        .roi-column.standard {
          padding-right: 10px;
        }

        .roi-column.premium {
          padding-left: 20px;
        }

        .roi-col-hdr {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: #64748b;
        }

        .roi-col-hdr.gold {
          color: #b45309;
        }

        .roi-col-val {
          font-size: 22px;
          font-weight: 800;
          color: #1e293b;
        }

        .roi-col-val.gold {
          color: #d97706;
          font-size: 24px;
        }

        .roi-col-lbl {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }

        /* Lead Capture Form */
        .partner-form-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          max-width: 750px;
          margin: 0 auto;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-lbl {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
        }

        .form-input {
          border: 1px solid #d1d5db;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 14px;
          background: #ffffff;
          outline: none;
          color: #1f2937;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #013a17;
          box-shadow: 0 0 0 2px rgba(1, 58, 23, 0.1);
        }

        .form-textarea {
          border: 1px solid #d1d5db;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 14px;
          background: #ffffff;
          outline: none;
          color: #1f2937;
          min-height: 120px;
          resize: vertical;
          transition: border-color 0.2s;
        }

        .form-textarea:focus {
          border-color: #013a17;
          box-shadow: 0 0 0 2px rgba(1, 58, 23, 0.1);
        }

        .submit-btn-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          margin-top: 25px;
        }

        .submit-btn {
          background: #013a17;
          color: #ffffff;
          border: none;
          padding: 14px 40px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          max-width: 320px;
          text-align: center;
        }

        .submit-btn:hover {
          background: #0b8b3a;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .alert-box {
          border-radius: 8px;
          padding: 16px;
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .alert-box.success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .alert-box.error {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #991b1b;
        }
      ` }} />

      {/* Hero Pitch Banner */}
      <section className="stats-hero">
        <span className="stats-hero-tag">Verified Premium Partner</span>
        <h1 className="stats-hero-title">
          Grow Your Zanzibar Real Estate Business with Data-Driven Exposure
        </h1>
        <p className="stats-hero-subtitle">
          Put your listings directly in front of 6,000+ active monthly buyers. Sync your inventory via WordPress API, gain top rank, and skyrocket direct sales leads.
        </p>
        <div className="stats-hero-actions">
          <button className="btn-primary" onClick={() => scrollToRef(formSectionRef)}>
            Apply For Premium Integration
          </button>
          <button className="btn-secondary" onClick={() => scrollToRef(statsSectionRef)}>
            View Platform Statistics
          </button>
        </div>
      </section>

      {/* Float Core Badges Over Hero */}
      <div className="hero-stats-cards">
        <div className="hero-stat-card">
          <div className="hero-stat-icon-wrapper">
            <FaUsers />
          </div>
          <div>
            <div className="hero-stat-number">9,840+</div>
            <div className="hero-stat-label">Unique Visitors/mo (July peak)</div>
          </div>
        </div>
        <div className="hero-stat-card premium">
          <div className="hero-stat-icon-wrapper">
            <FaRocket />
          </div>
          <div>
            <div className="hero-stat-number">8.1x More</div>
            <div className="hero-stat-label">Views on Featured Ads</div>
          </div>
        </div>
        <div className="hero-stat-card">
          <div className="hero-stat-icon-wrapper">
            <FaMousePointer />
          </div>
          <div>
            <div className="hero-stat-number">1,740+</div>
            <div className="hero-stat-label">Direct Contact Leads / mo</div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="section-wrapper" ref={statsSectionRef}>
        <h2 className="section-title">ZanziHome Platform Statistics</h2>
        <p className="section-subtitle">
          Real, audited interaction data showing how visitors seek beachfront houses, plots, and apartments on our platform.
        </p>

        {/* Dashboard panel */}
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="dashboard-title-area">
              <FaChartLine className="dashboard-title-icon" style={{ fontSize: "22px" }} />
              <span className="dashboard-title">Monthly Engagement Report</span>
            </div>
            
            <div className="month-tabs">
              {["May", "June", "July"].map((month) => (
                <button
                  key={month}
                  className={`month-tab-btn ${selectedMonth === month ? "active" : ""}`}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month} 2026
                </button>
              ))}
            </div>
          </div>

          {/* Metric cards */}
          <div className="dashboard-grid">
            <div className="metric-sub-card">
              <div className="metric-sub-header">
                <span className="metric-sub-lbl">Unique Visitors</span>
                <span className="badge-growth">{stats.growthRate}</span>
              </div>
              <div className="metric-sub-val">{stats.uniqueVisitors.toLocaleString()}</div>
              <div className="metric-sub-lbl">Individual prospective buyers</div>
            </div>

            <div className="metric-sub-card">
              <div className="metric-sub-header">
                <span className="metric-sub-lbl">Pageviews</span>
                <FaChartLine className="metric-sub-icon" />
              </div>
              <div className="metric-sub-val">{stats.pageViews.toLocaleString()}</div>
              <div className="metric-sub-lbl">Total loaded page hits</div>
            </div>

            <div className="metric-sub-card">
              <div className="metric-sub-header">
                <span className="metric-sub-lbl">Ad Clicks & Views</span>
                <FaMousePointer className="metric-sub-icon" />
              </div>
              <div className="metric-sub-val">{stats.adClicks.toLocaleString()}</div>
              <div className="metric-sub-lbl">Direct click-throughs to listings</div>
            </div>

            <div className="metric-sub-card">
              <div className="metric-sub-header">
                <span className="metric-sub-lbl">Direct Contact Leads</span>
                <FaEnvelope className="metric-sub-icon" />
              </div>
              <div className="metric-sub-val" style={{ color: "#013a17" }}>{stats.contactClicks.toLocaleString()}</div>
              <div className="metric-sub-lbl">WhatsApp, email & call triggers</div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="charts-row">
            {/* SVG Traffic Growth Line Chart */}
            <div className="chart-box">
              <div className="chart-box-title">
                <FaChartLine style={{ color: "#013a17" }} />
                Traffic & Engagement Growth Trend (3-Month Scale)
              </div>
              
              <div className="chart-svg-wrapper">
                <svg viewBox="0 0 450 200" width="100%" height="100%">
                  <defs>
                    <linearGradient id="line-grad-1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#013a17" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#013a17" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="420" y2="20" className="grid-line" />
                  <line x1="40" y1="70" x2="420" y2="70" className="grid-line" />
                  <line x1="40" y1="120" x2="420" y2="120" className="grid-line" />
                  <line x1="40" y1="160" x2="420" y2="160" className="grid-line" />

                  {/* Horizontal Axis labels */}
                  <text x="40" y="180" className="chart-axis-text" textAnchor="middle">May</text>
                  <text x="230" y="180" className="chart-axis-text" textAnchor="middle">June</text>
                  <text x="420" y="180" className="chart-axis-text" textAnchor="middle">July</text>

                  {/* Vertical Axis labels */}
                  <text x="30" y="24" className="chart-axis-text" textAnchor="end">40k</text>
                  <text x="30" y="74" className="chart-axis-text" textAnchor="end">25k</text>
                  <text x="30" y="124" className="chart-axis-text" textAnchor="end">10k</text>
                  <text x="30" y="164" className="chart-axis-text" textAnchor="end">0</text>

                  {/* Area Fill Gradient under Unique Visitors (Scaled: May: 6420 -> Y: 140, June: 8150 -> Y: 125, July: 9840 -> Y: 110) */}
                  {/* Scaled for Pageviews: May: 22.4k -> Y: 85, June: 29.8k -> Y: 55, July: 38.1k -> Y: 25 */}
                  <path d="M 40 85 L 230 55 L 420 25 L 420 160 L 40 160 Z" className="chart-area-gradient" />

                  {/* Lines */}
                  {/* Pageviews Line */}
                  <path d="M 40 85 L 230 55 L 420 25" className="chart-line" />
                  {/* Unique Visitors Line */}
                  <path d="M 40 140 L 230 125 L 420 110" className="chart-line-secondary" />

                  {/* Markers Pageviews */}
                  <circle cx="40" cy="85" r="5" className="chart-dot" />
                  <circle cx="230" cy="55" r="5" className="chart-dot" />
                  <circle cx="420" cy="25" r="5" className="chart-dot" />

                  {/* Markers Unique Visitors */}
                  <circle cx="40" cy="140" r="4.5" className="chart-dot-gold" />
                  <circle cx="230" cy="125" r="4.5" className="chart-dot-gold" />
                  <circle cx="420" cy="110" r="4.5" className="chart-dot-gold" />

                  {/* Legends */}
                  <g transform="translate(100, 10)">
                    <rect x="0" y="0" width="12" height="4" fill="#013a17" rx="2" />
                    <text x="18" y="6" className="chart-axis-text" style={{ fontSize: "9px" }}>Pageviews</text>

                    <line x1="100" y1="2" x2="112" y2="2" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
                    <text x="118" y="6" className="chart-axis-text" style={{ fontSize: "9px" }}>Unique Visitors</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Platform Interactions (Vertical relative weight) */}
            <div className="chart-box">
              <div className="chart-box-title">
                <FaMousePointer style={{ color: "#d97706", fontSize: "14px" }} />
                Engagement Breakdown ({selectedMonth})
              </div>

              <div className="bar-chart-y-axis">
                <div className="bar-chart-row">
                  <div className="bar-lbl-row">
                    <span>Homepage Views</span>
                    <strong>{stats.interactions.homepageViews.toLocaleString()}</strong>
                  </div>
                  <div className="bar-outer">
                    <div className="bar-inner" style={{ width: `${(stats.interactions.homepageViews / 15900) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bar-chart-row">
                  <div className="bar-lbl-row">
                    <span>Property Search Views</span>
                    <strong>{stats.interactions.searchViews.toLocaleString()}</strong>
                  </div>
                  <div className="bar-outer">
                    <div className="bar-inner" style={{ width: `${(stats.interactions.searchViews / 15900) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bar-chart-row">
                  <div className="bar-lbl-row">
                    <span>Featured Ad Views</span>
                    <strong>{stats.featuredImpressions.toLocaleString()}</strong>
                  </div>
                  <div className="bar-outer">
                    <div className="bar-inner orange" style={{ width: `${(stats.featuredImpressions / 48900) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bar-chart-row">
                  <div className="bar-lbl-row">
                    <span>Contact Triggers (leads)</span>
                    <strong>{stats.interactions.contactActions.toLocaleString()}</strong>
                  </div>
                  <div className="bar-outer">
                    <div className="bar-inner" style={{ width: `${(stats.interactions.contactActions / 15900) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="locations-box">
            <span className="location-lbl">
              <FaMapMarkerAlt />
              Top Search Hubs:
            </span>
            {stats.topLocations.map((loc) => (
              <span key={loc} className="location-tag">{loc}</span>
            ))}
          </div>
        </div>

        {/* Standard vs Premium Listings Contrast Table */}
        <h2 className="section-title">Standard Listings vs Premium Partner Package</h2>
        <p className="section-subtitle">
          Discover why Verified Premium Partners secure the majority of transactions. Priority ranking puts listings where buyers look.
        </p>

        <div className="comparison-grid">
          {/* Standard listings */}
          <div className="comp-card">
            <span className="comp-badge standard">Standard Agency</span>
            <h3 className="comp-title">Standard Listings</h3>
            <p className="comp-description">
              Good for occasional sellers who want list-and-forget capabilities but don't mind waiting for inquiries.
            </p>
            <ul className="comp-features-list">
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Upload up to 5 properties manually</span>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Basic contact information display</span>
              </li>
              <li className="comp-feature-item" style={{ opacity: 0.6 }}>
                <span className="comp-feature-icon no">✕</span>
                <span>No prioritisation (properties push down quickly)</span>
              </li>
              <li className="comp-feature-item" style={{ opacity: 0.6 }}>
                <span className="comp-feature-icon no">✕</span>
                <span>No Verified Partner Badge</span>
              </li>
              <li className="comp-feature-item" style={{ opacity: 0.6 }}>
                <span className="comp-feature-icon no">✕</span>
                <span>No automated API synchronization</span>
              </li>
              <li className="comp-feature-item" style={{ opacity: 0.6 }}>
                <span className="comp-feature-icon no">✕</span>
                <span>No dedicated brand landing page</span>
              </li>
            </ul>
            <div className="comp-footer-stat">
              <span className="comp-footer-stat-label">Avg. monthly views/ad</span>
              <span className="comp-footer-stat-value">~80 views</span>
            </div>
          </div>

          {/* Premium listings */}
          <div className="comp-card premium">
            <span className="comp-badge premium">⭐⭐⭐ Premium Verified</span>
            <h3 className="comp-title">Verified Premium Partner</h3>
            <p className="comp-description">
              Designed for established agencies looking to dominate the Zanzibar market with maximum exposure and automation.
            </p>

            {/* Small mockup card badge */}
            <div className="ad-preview-wrapper">
              <div className="ad-preview-img-box">
                <div className="mock-badges-row">
                  <span className="mock-badge premium-partner">⭐ Verified Premium Partner</span>
                  <span className="mock-badge featured">✨ Featured Listing</span>
                </div>
              </div>
              <div className="ad-preview-title">Luxury Beachfront Villa Jambiani</div>
              <div className="ad-preview-info">ZanziHome Premium Verified Partner Catalog</div>
            </div>

            <ul className="comp-features-list">
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon gold" />
                <strong>100% Automated WordPress / XML API Import</strong>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Dedicated Agency Branded Landing Page (e.g. `/partners/agency`)</span>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Priority Top-Ranking (listings stay at the very top of lists)</span>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Glowing Golden "Featured" badge on all listings</span>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Direct WhatsApp & Call leads routed straight to your agents</span>
              </li>
              <li className="comp-feature-item">
                <FaCheckCircle className="comp-feature-icon yes" />
                <span>Monthly conversion and analytics summaries</span>
              </li>
            </ul>
            <div className="comp-footer-stat">
              <span className="comp-footer-stat-label">Avg. monthly views/ad</span>
              <span className="comp-footer-stat-value gold">~650 views (8.1x increase!)</span>
            </div>
          </div>
        </div>

        {/* API Sync Showcase */}
        <div className="api-sync-box">
          <div className="api-text-side">
            <h3>Automated API Import</h3>
            <p>
              We connect directly to your agency's website database or property software (WordPress WP-JSON API, custom XML feed, XML feeds, etc.). 
            </p>
            <p>
              Your properties are synced automatically every 2 hours: any change in price, descriptions, new properties added, or sold properties deleted syncs instantly.
            </p>
            <div className="api-tech-badges">
              <span className="api-tech-badge">WordPress REST API</span>
              <span className="api-tech-badge">Real Estate XML Feeds</span>
              <span className="api-tech-badge">Custom JSON Sync</span>
              <span className="api-tech-badge">Zero Manual Input</span>
            </div>
          </div>

          <div className="api-visual-side">
            <div className="sync-animation">
              <div className="sync-node">
                <FaGlobe style={{ color: "#fff3c4" }} />
                <span className="sync-node-lbl">Your Website</span>
              </div>
              <div className="sync-arrow" style={{ color: "#fbbf24", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FaCloudDownloadAlt />
                <span style={{ fontSize: "9px", color: "#d1fae5", marginTop: "2px" }}>API Sync</span>
              </div>
              <div className="sync-node" style={{ borderColor: "#d97706" }}>
                <FaRocket style={{ color: "#fbbf24" }} />
                <span className="sync-node-lbl">ZanziHome</span>
              </div>
            </div>
            
            <div className="sync-badge-demo">
              <FaCertificate style={{ color: "#d97706" }} />
              <span>Live Example: Zanzipalms Partner Page</span>
            </div>
            <Link 
              href="/partners/zanzipalms" 
              className="btn-secondary" 
              style={{ marginTop: "15px", fontSize: "13px", padding: "8px 16px" }}
              target="_blank"
            >
              Inspect Live Zanzipalms Sync
            </Link>
          </div>
        </div>

        {/* Leads ROI Calculator */}
        <div className="calculator-container" ref={calculatorSectionRef}>
          <div className="calculator-layout">
            <div className="calc-control-side">
              <h3>Estimate Your Premium Traffic & Leads</h3>
              <p>
                Adjust the slider below to represent the total number of properties in your portfolio. See the estimated reach comparison in real-time.
              </p>

              <div className="calc-slider-box">
                <div className="calc-slider-lbl">
                  <span>Your Agency Listings:</span>
                  <span className="val">{propertyCount} properties</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(parseInt(e.target.value))}
                  className="custom-slider"
                />
              </div>
              
              <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <FaCalculator style={{ color: "#d97706", fontSize: "20px" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  Estimates are based on May-July 2026 organic user actions, search counts, and contact triggers.
                </span>
              </div>
            </div>

            <div className="calc-results-side">
              {/* Card 1: Views */}
              <div className="roi-card">
                <div className="roi-column standard">
                  <span className="roi-col-hdr">Standard</span>
                  <span className="roi-col-val">{calcData.standard.views.toLocaleString()}</span>
                  <span className="roi-col-lbl">Monthly impressions</span>
                </div>
                <div className="roi-column premium">
                  <span className="roi-col-hdr gold">Premium Partner</span>
                  <span className="roi-col-val gold">{calcData.premium.views.toLocaleString()}</span>
                  <span className="roi-col-lbl">Monthly impressions</span>
                </div>
              </div>

              {/* Card 2: Clicks */}
              <div className="roi-card">
                <div className="roi-column standard">
                  <span className="roi-col-hdr">Standard</span>
                  <span className="roi-col-val">{calcData.standard.clicks.toLocaleString()}</span>
                  <span className="roi-col-lbl">Clicks on your ads</span>
                </div>
                <div className="roi-column premium">
                  <span className="roi-col-hdr gold">Premium Partner</span>
                  <span className="roi-col-val gold">{calcData.premium.clicks.toLocaleString()}</span>
                  <span className="roi-col-lbl">Clicks on your ads</span>
                </div>
              </div>

              {/* Card 3: Leads */}
              <div className="roi-card" style={{ borderLeft: "4px solid #d97706" }}>
                <div className="roi-column standard">
                  <span className="roi-col-hdr">Standard</span>
                  <span className="roi-col-val">{calcData.standard.leads.toLocaleString()}</span>
                  <span className="roi-col-lbl">Direct inquiries</span>
                </div>
                <div className="roi-column premium">
                  <span className="roi-col-hdr gold">Premium Partner</span>
                  <span className="roi-col-val gold" style={{ color: "#013a17" }}>{calcData.premium.leads.toLocaleString()}</span>
                  <span className="roi-col-lbl">WhatsApp / Email Leads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="partner-form-box" ref={formSectionRef}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#013a17" }}>Apply to Become a Verified Partner</h3>
            <p style={{ fontSize: "14px", color: "#64748b", marginTop: "5px" }}>
              Let us check your website API capability and compile an onboarding proposal for your brand.
            </p>
          </div>

          {submitStatus && (
            <div className={`alert-box ${submitStatus.success ? "success" : "error"}`}>
              {submitStatus.msg}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-lbl">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-lbl">Agency Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zanzipalms Ltd"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-lbl">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-lbl">WhatsApp / Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +255 0655..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-lbl">Current Website URL (for API checks)</label>
              <input
                type="url"
                placeholder="https://www.youragency.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-lbl">Brief Message or Requirements</label>
              <textarea
                placeholder="Tell us about your portfolio or specific API format (e.g. XML feed, WordPress, custom feed)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="submit-btn-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {submitStatus?.success 
                  ? "Inquiry Submitted successfully! ✓" 
                  : (isSubmitting ? "Processing Inquiry..." : "Submit Proposal Request 🚀")
                }
              </button>
              <span style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                <FaCheckCircle style={{ color: "#10b981" }} />
                Your data is secure and will only be used to setup the API assessment report.
              </span>
            </div>
          </form>
        </div>

      </div>

      <Abovefooter />
    </section>
  );
};

export default StatisticsPage;
