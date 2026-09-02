"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

// Standard React Icons
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, text: string }
  const contactFormRef = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send contact message.");
      }

      setStatus({
        success: true,
        text: "Thank you! We have received your request and will contact you soon."
      });
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        success: false,
        text: err.message || "An error occurred while sending your message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page-container">

      <style>{`
        .contact-page-container {
          background: #fafbfa;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          padding-bottom: 80px;
        }

        /* Banner Hero */
        .contact-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .contact-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }

        .contact-hero-title {
          font-size: 40px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .contact-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 600px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Platform Stats */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: -20px auto 40px auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .stats-bar {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .stat-number {
          font-size: 28px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12.5px;
          color: #6b7280;
          font-weight: 500;
        }

        /* Inner container */
        .contact-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (min-width: 900px) {
          .contact-content-grid {
            grid-template-columns: 1.1fr 1.3fr;
          }
        }

        /* Contact details list */
        .info-cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 22px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s, border-color 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .info-card:hover {
          transform: translateY(-2px);
          border-color: #013a17;
        }

        .info-card-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #f0f4f1;
          color: #013a17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-card-body h4 {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 700;
          color: #1f2937;
        }

        .info-card-body p {
          margin: 0;
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.5;
        }

        .info-card-body .action-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          color: #013a17;
          font-weight: 600;
          margin-top: 8px;
        }

        /* Message form styling */
        .contact-form-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .form-box-title {
          font-size: 20px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 6px 0;
        }

        .form-box-desc {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 24px 0;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #4b5563;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #013a17;
        }

        .btn-send-message {
          width: 100%;
          background: #013a17;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-send-message:hover:not(:disabled) {
          background: #0d2818;
        }

        .btn-send-message:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        /* Success / Error Alerts */
        .alert-box {
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 20px;
          font-size: 13.5px;
          line-height: 1.5;
        }

        .alert-box.success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .alert-box.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }
      `}</style>

      {/* Hero Banner */}
      <header className="contact-hero">
        <h1 className="contact-hero-title">Customer Service & Support</h1>
        <p className="contact-hero-subtitle">
          ZanziHome is the leading real estate and vehicle marketplace in Zanzibar. We are here to help you buy, sell, or rent with ease.
        </p>
      </header>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Monthly Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">250+</div>
          <div className="stat-label">Verified Listings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">98%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">&lt; 2 Hours</div>
          <div className="stat-label">Average Response Time</div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="contact-content-grid">
        
        {/* Left Side: Info Channels */}
        <section className="info-cards-list">
          
          {/* Channel 1: WhatsApp */}
          <a href="https://wa.me/46704276963" target="_blank" rel="noopener noreferrer" className="info-card">
            <div className="info-card-icon-box" style={{ background: "#e8f7ee", color: "#25d366" }}>
              <FaWhatsapp style={{ fontSize: "22px" }} />
            </div>
            <div className="info-card-body">
              <h4>Chat on WhatsApp</h4>
              <p>Direct contact with our team for quick responses. Available daily.</p>
              <span className="action-link" style={{ color: "#25d366" }}>Open WhatsApp Chat <FiArrowRight /></span>
            </div>
          </a>

          {/* Channel 2: Local Call */}
          <a href="tel:+255655912498" className="info-card">
            <div className="info-card-icon-box">
              <FiPhone />
            </div>
            <div className="info-card-body">
              <h4>Call Customer Support</h4>
              <p>Speak directly with our local office in Zanzibar. +255 655 912 498</p>
              <span className="action-link">Call Support Now <FiArrowRight /></span>
            </div>
          </a>

          {/* Channel 3: Email */}
          <a href="mailto:louiestokk@gmail.com" className="info-card">
            <div className="info-card-icon-box" style={{ background: "#edf2f7", color: "#4a5568" }}>
              <FiMail />
            </div>
            <div className="info-card-body">
              <h4>Email Inquiry</h4>
              <p>Send details of your property request. info@zanzihome.com</p>
              <span className="action-link" style={{ color: "#4a5568" }}>Send us an email <FiArrowRight /></span>
            </div>
          </a>

          {/* Channel 4: Visit */}
          <div className="info-card">
            <div className="info-card-icon-box" style={{ background: "#fffaf0", color: "#dd6b20" }}>
              <FiMapPin />
            </div>
            <div className="info-card-body">
              <h4>Our Visiting Office</h4>
              <p>ZanziHome.com / Tripple M Ltd<br />Stone Town Zanzibar</p>
            </div>
          </div>

          {/* Channel 5: Checkout link */}
          <Link href="/checkout" className="info-card">
            <div className="info-card-icon-box" style={{ background: "#ebf8ff", color: "#3182ce" }}>
              <FiCheckCircle />
            </div>
            <div className="info-card-body">
              <h4>List Your Property</h4>
              <p>Advertise your property on Zanzibar's leading real estate platform for free.</p>
              <span className="action-link" style={{ color: "#3182ce" }}>Start Listing <FiArrowRight /></span>
            </div>
          </Link>

        </section>

        {/* Right Side: Interactive Form */}
        <section className="contact-form-box">
          <h3 className="form-box-title">Send a Message</h3>
          <p className="form-box-desc">Fill in the form below and our support team will email you back within 24 hours.</p>



          <form ref={contactFormRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="from_name"
                required
                className="form-input"
                placeholder="Enter your name..."
                value={formData.from_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="from_email"
                required
                className="form-input"
                placeholder="Enter your email..."
                value={formData.from_email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                required
                className="form-input"
                placeholder="What can we help you with?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                required
                rows="6"
                className="form-input"
                placeholder="Write your message here..."
                style={{ resize: "vertical" }}
                value={formData.message}
                onChange={handleChange}
              />
            </div>
  {status && (
            <div className={`alert-box ${status.success ? "success" : "error"}`}>
              {status.text}
            </div>
          )}
            <button
              type="submit"
              disabled={loading}
              className="btn-send-message"
            >
              {loading ? "Sending Message..." : "Submit Inquiry"}
            </button>
          </form>
        </section>

      </div>
    </main>
  );
};

export default Contact;
