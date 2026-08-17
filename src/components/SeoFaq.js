"use client";

import React, { useState } from "react";

export default function SeoFaq({ faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faq-section">
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#013a17", marginBottom: "20px" }}>
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="faq-wrapper">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button className="faq-question" onClick={() => toggleFaq(index)}>
              <span>{faq.q}</span>
              <span className="faq-chevron" style={{ transform: openFaq === index ? "rotate(180deg)" : "rotate(0)" }}>
                ▼
              </span>
            </button>
            {openFaq === index && (
              <div className="faq-answer">
                <p style={{ margin: 0 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
