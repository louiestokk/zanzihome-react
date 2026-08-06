import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const CompanyLeadForm = ({ listingTitle, listingId, companyName, companyEmail, isCompany, about }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userMessage: `Hi, I am interested in your listing "${listingTitle}" (Ref: ${listingId}). Please contact me with more information.`
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showCompanyTrust = isCompany === true || (about && about.trim().length > 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");

    try {
      const formEl = formRef.current;
      if (!formEl) return;

      const formattedMessage = `
Name: ${formData.userName}
Email: ${formData.userEmail}
Phone: ${formData.userPhone}

Message:
${formData.userMessage}

----------------------------------------
Property Ref: ${listingId}
Property Title: ${listingTitle}
URL: https://www.zanzihome.com/propertys/property/${listingId}
----------------------------------------
Listed by Company: ${companyName || "N/A"}
Company Contact Email: ${companyEmail || "N/A"}
      `;

      // 1. Set values for first submission (to Admin)
      formEl.elements["from_name"].value = formData.userName;
      formEl.elements["from_email"].value = formData.userEmail;
      formEl.elements["to_name"].value = "ZanziHome Admin";
      formEl.elements["to_email"].value = "louiestokk@gmail.com";
      formEl.elements["subject"].value = `New Lead: ${formData.userName} is interested in ${listingTitle}`;
      formEl.elements["message"].value = formattedMessage;

      await emailjs.sendForm(
        "service_thbibzh",
        "template_xn7q61k",
        formEl,
        process.env.REACT_APP_EMAILJS
      );
      console.log("Lead email sent to admin successfully");

      // 2. Set values for second submission (to the Company/Broker)
      const targetCompanyEmail = companyEmail || "louiestokk@gmail.com";
      // Only send second email if it goes to a different email address
      if (targetCompanyEmail !== "louiestokk@gmail.com") {
        formEl.elements["to_name"].value = companyName || "Broker Partner";
        formEl.elements["to_email"].value = targetCompanyEmail;
        formEl.elements["subject"].value = `ZanziHome Partner Lead: Inquiry for ${listingTitle}`;

        await emailjs.sendForm(
          "service_thbibzh",
          "template_xn7q61k",
          formEl,
          process.env.REACT_APP_EMAILJS
        );
        console.log("Lead email sent to company successfully");
      }

      setSuccess(true);
      setFormData({
        userName: "",
        userPhone: "",
        userEmail: "",
        userMessage: ""
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setErrorMsg("Failed to send your inquiry. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="lead-form-card">
      <style>{`
        .lead-form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          font-family: 'Poppins', sans-serif;
          max-width: 100%;
          box-sizing: border-box;
        }

        .lead-form-header {
          margin-bottom: 20px;
        }

        .lead-form-title {
          font-size: 18px;
          font-weight: 700;
          color: #013a17;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lead-form-subtitle {
          font-size: 12.5px;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        .lead-form-inputs {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .lead-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lead-input-label {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .lead-input-field {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          font-size: 13.5px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .lead-input-field:focus {
          border-color: #013a17;
        }

        .lead-submit-btn {
          width: 100%;
          background: #013a17;
          color: #ffffff;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .lead-submit-btn:hover:not(:disabled) {
          background: #0b8b3a;
          transform: translateY(-1px);
        }

        .lead-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .lead-success-msg {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
          padding: 16px;
          border-radius: 12px;
          font-size: 13.5px;
          text-align: center;
          font-weight: 600;
          line-height: 1.5;
        }

        .lead-error-msg {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid #fca5a5;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12.5px;
          font-weight: 600;
        }

        .brokers-trust {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .trust-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .trust-rating-box {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .trust-score {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
        }

        .trust-stars {
          display: flex;
          color: #fbbf24;
          font-size: 13px;
          gap: 1px;
        }

        .trust-reviews-count {
          font-size: 12.5px;
          color: #6b7280;
          font-weight: 500;
          margin-left: 2px;
        }

        .trust-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .trustpilot-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #f3f4f6;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #374151;
          border: 1px solid #e5e7eb;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #f0fdf4;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .trust-sales-pitch {
          font-size: 12px;
          color: #374151;
          margin: 2px 0 0 0;
          line-height: 1.4;
        }
      `}</style>

      {success ? (
        <div className="lead-success-msg">
          🎉 Inquiry sent successfully!<br />
          We and the partner agency will get back to you shortly.
        </div>
      ) : (
        <>
          <div className="lead-form-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#013a17",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "16px",
                flexShrink: 0
              }}>
                {(companyName || "C").charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="lead-form-title">
                 {companyName || "Agent"}
                  {showCompanyTrust && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0b8b3a" style={{ flexShrink: 0 }}>
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                </h4>
                {showCompanyTrust && (
                  <p style={{ fontSize: "10px", color: "#0b8b3a", fontWeight: "700", margin: "2px 0 0 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Verified Agent</p>
                )}
              </div>
            </div>
            <p className="lead-form-subtitle">
              Fill in your details below to directly register your interest.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lead-form-inputs">
            <div className="lead-input-group">
              <label className="lead-input-label">Your Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="lead-input-field"
                required
              />
            </div>

            <div className="lead-input-group">
              <label className="lead-input-label">Phone Number</label>
              <input
                type="tel"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                placeholder="e.g. +1 234 567 89"
                className="lead-input-field"
                required
              />
            </div>

            <div className="lead-input-group">
              <label className="lead-input-label">Email Address</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className="lead-input-field"
                required
              />
            </div>

            <div className="lead-input-group">
              <label className="lead-input-label">Message</label>
              <textarea
                name="userMessage"
                value={formData.userMessage}
                onChange={handleChange}
                rows="4"
                className="lead-input-field"
                required
              />
            </div>

            {errorMsg && <div className="lead-error-msg">{errorMsg}</div>}

            <button type="submit" disabled={sending} className="lead-submit-btn">
              {sending ? "Sending inquiry..." : "Send Inquiry"}
            </button>
          </form>

          {/* Hidden EmailJS Form */}
          <form ref={formRef} style={{ display: "none" }}>
            <input type="hidden" name="to_name" />
            <input type="hidden" name="to_email" />
            <input type="hidden" name="from_name" />
            <input type="hidden" name="from_email" />
            <input type="hidden" name="subject" />
            <textarea name="message" readOnly />
          </form>
        </>
      )}

      {showCompanyTrust && (
        <div className="brokers-trust">
          <div className="trust-header">
            <div className="trust-rating-box">
              <span className="trust-score">4.9</span>
              <div className="trust-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>

          <div className="trust-badge-row">
            <div className="trustpilot-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#00b67a" style={{ verticalAlign: "middle" }}>
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
              <span className="trustpilot-text">
                Trustpilot <strong style={{ color: "#00b67a" }}>4.9/5</strong>
              </span>
            </div>
            <div className="verified-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0b8b3a" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 11l2 2 4-4" />
              </svg>
              <span>Verified Agent</span>
            </div>
          </div>

          <p className="trust-sales-pitch">
            ⚡ <strong>Fast response:</strong> Typically replies within 1 hour.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyLeadForm;
