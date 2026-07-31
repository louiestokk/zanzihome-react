import React, { useState } from "react";

const Brokers = ({ agency, number, contact, logo, email, whatsapp }) => {
  const [copiedType, setCopiedType] = useState(null);

  // Fallbacks
  const displayPhone = number || "+255773749776";
  const displayWhatsapp = whatsapp || number || "+255773749776";
  const displayEmail = email || "louiestokk@gmail.com";
  const displayName = agency || contact || "Louie";

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="brokers-contact-card">
      <style>{`
        .brokers-contact-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          margin-top: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          font-family: 'Poppins', sans-serif;
        }
        
        .brokers-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .brokers-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #013a17;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }
        
        .brokers-header-info {
          flex: 1;
        }
        
        .brokers-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          text-transform: capitalize;
        }
        
        .brokers-subtitle {
          font-size: 12px;
          color: #6b7280;
          margin: 2px 0 0 0;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .contact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 10px;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .contact-row:hover {
          background: #f0f4f1;
          border-color: #013a17;
          transform: translateY(-1px);
        }
        
        .contact-label-box {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .contact-icon-wrapper {
          color: #013a17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        
        .contact-details {
          display: flex;
          flex-direction: column;
        }
        
        .contact-lbl {
          font-size: 10.5px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }
        
        .contact-value {
          font-size: 13.5px;
          color: #374151;
          font-weight: 600;
          margin: 1px 0 0 0;
        }
        
        .copy-indicator {
          font-size: 11px;
          font-weight: 700;
          color: #013a17;
          background: #e6ece8;
          padding: 4px 10px;
          border-radius: 20px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        
        .copy-indicator.copied {
          background: #d1fae5;
          color: #065f46;
        }
      `}</style>

      <div className="brokers-header">
        <div className="brokers-avatar">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="brokers-header-info">
          <h4 className="brokers-title">Contact Agent</h4>
          <p className="brokers-subtitle">{displayName}</p>
        </div>
      </div>

      <div className="contact-methods">
        
        {/* Phone */}
        <div className="contact-row" onClick={() => handleCopy(displayPhone, "phone")}>
          <div className="contact-label-box">
            <div className="contact-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="contact-details">
              <span className="contact-lbl">Phone</span>
              <span className="contact-value">{displayPhone}</span>
            </div>
          </div>
          <span className={`copy-indicator ${copiedType === "phone" ? "copied" : ""}`}>
            {copiedType === "phone" ? "✓ Copied" : "Copy"}
          </span>
        </div>

        {/* WhatsApp */}
        <div className="contact-row" onClick={() => handleCopy(displayWhatsapp, "whatsapp")}>
          <div className="contact-label-box">
            <div className="contact-icon-wrapper" style={{ color: "#25d366" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.802.001-2.617-1.02-5.079-2.877-6.938C16.342 1.997 13.887 1.01 11.277 1.01 5.867 1.01 1.47 5.405 1.466 10.814c0 1.517.411 2.997 1.189 4.3l-.999 3.648 3.733-.979a9.69 9.69 0 0 0 4.258.986zm11.398-7.642c-.327-.164-1.938-.956-2.238-1.066-.3-.11-.519-.164-.738.164-.22.329-.85.823-1.041 1.042-.19.219-.383.246-.71.082-.327-.164-1.383-.51-2.637-1.627-.977-.872-1.637-1.948-1.829-2.277-.191-.329-.02-.507.143-.67.147-.146.327-.383.49-.575.163-.191.218-.328.327-.547.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-.997-2.42-.258-.626-.519-.541-.715-.551-.186-.01-.399-.011-.612-.011-.213 0-.559.08-1.01.575-.45.493-1.72 1.683-1.72 4.1s1.763 4.757 2.01 5.086c.246.329 3.47 5.299 8.406 7.428 1.174.506 2.091.808 2.806 1.034 1.18.375 2.256.322 3.103.196.945-.141 2.938-1.2 3.348-2.356.409-1.156.409-2.146.287-2.356-.123-.21-.355-.32-.682-.484z" />
              </svg>
            </div>
            <div className="contact-details">
              <span className="contact-lbl">WhatsApp</span>
              <span className="contact-value">{displayWhatsapp}</span>
            </div>
          </div>
          <span className={`copy-indicator ${copiedType === "whatsapp" ? "copied" : ""}`}>
            {copiedType === "whatsapp" ? "✓ Copied" : "Copy"}
          </span>
        </div>

        {/* Email */}
        <div className="contact-row" onClick={() => handleCopy(displayEmail, "email")}>
          <div className="contact-label-box">
            <div className="contact-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-details">
              <span className="contact-lbl">E-Mail</span>
              <span className="contact-value">{displayEmail}</span>
            </div>
          </div>
          <span className={`copy-indicator ${copiedType === "email" ? "copied" : ""}`}>
            {copiedType === "email" ? "✓ Copied" : "Copy"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Brokers;
