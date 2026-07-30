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
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFirestoreData, getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

// Local PNG imports (same as in PaypalCheckout.js)
import tigo from "../utils/tigo.png";
import worldremit from "../utils/worldremit.png";

const steps = ["Category", "Package", "Ad Details", "Payment", "Confirmation"];

const Checkcout = ({ logedinUser }) => {
  const dispatch = useDispatch();
  const firestoreData = useSelector(getFirestoreData);
  const [adType, setadType] = useState(null);
  const { activeStep, setActiveStep } = useFormContext();
  const { user } = useUserContext();

  // Selected package details
  const [selectedPackage, setSelectedPackage] = useState(null); // { name: string, price: number, durationMonths: number }
  const [adsData, setAdsData] = useState(null); // form inputs from AdsForm

  const adFormRef = useRef(null);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState(""); // "PayPal" | "MobileMoney"
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
    const queryParams = new URLSearchParams(window.location.search);
    const planParam = queryParams.get("plan");
    if (planParam === "basic") {
      setadType("Properties");
      setSelectedPackage({
        name: "Basic Listing",
        price: 20,
        durationMonths: 6,
        description: "Standard property listing."
      });
      setActiveStep(2);
    } else if (planParam === "premium") {
      setadType("Properties");
      setSelectedPackage({
        name: "Premium Listing",
        price: 30,
        durationMonths: 12,
        description: "Double duration exposure."
      });
      setActiveStep(2);
    }
  }, [setActiveStep]);

  const handleAdFormSubmit = (formData) => {
    setAdsData(formData);
    setActiveStep(3); // Advance to Payment step
  };

  const saveAdToDatabase = async (method, isPaid, reference = "") => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const now = new Date();
      const startStr = now.toISOString().split("T")[0];
      
      const future = new Date();
      if (selectedPackage.durationMonths === 6) {
        future.setMonth(future.getMonth() + 6);
      } else {
        future.setMonth(future.getMonth() + 12);
      }
      const endStr = future.toISOString().split("T")[0];

      // Add subscription and payment fields to final ad payload
      const finalAdData = {
        ...adsData,
        paid: isPaid ? true : "pending",
        packageType: selectedPackage.name,
        packagePrice: selectedPackage.price,
        startDate: startStr,
        endDate: endStr,
        paymentMethod: method,
        paymentReference: reference,
        Email: user?.email || adsData.Email || ""
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

      const formEl = adFormRef.current;
      if (formEl) {
        formEl.elements["from_name"].value = user?.nickname || adsData.Name || "Publisher";
        formEl.elements["from_email"].value = user?.email || adsData.Email || "";
        formEl.elements["reply_to"].value = user?.email || adsData.Email || "";
        formEl.elements["subject"].value = `📢 ZanziHome New Listing - ${selectedPackage.name}`;
        formEl.elements["message"].value = `
Publisher: ${user?.nickname || adsData.Name} (${user?.email || adsData.Email})
Package: ${selectedPackage.name} ($${selectedPackage.price})
Payment Type: ${method}
Payment Status: ${isPaid ? "Paid" : "Pending Manual Verification"}
Reference/Sender: ${reference || "N/A"}
Active Dates: ${startStr} to ${endStr}

Property Title: ${adsData.Title}
Property ID: ${adsData.adId || docRef.id}
Category: ${adsData.category}
Area: ${adsData.Area}
Price: $${adsData.Price}
        `;
        
        // Map individual fields for EmailJS template
        formEl.elements["to_name"].value = user?.nickname || adsData.Name || "Customer";
        formEl.elements["package_name"].value = selectedPackage.name;
        formEl.elements["package_price"].value = `$${selectedPackage.price}`;
        formEl.elements["duration_months"].value = `${selectedPackage.durationMonths} Months`;
        formEl.elements["start_date"].value = startStr;
        formEl.elements["expiry_date"].value = endStr;
        formEl.elements["renewal_date"].value = endStr;
        formEl.elements["ad_title"].value = adsData.Title || "";
        formEl.elements["ad_id"].value = adsData.adId || docRef.id || "";
        formEl.elements["payment_method"].value = method;
        formEl.elements["payment_status"].value = isPaid ? "Paid" : "Pending Review";
        formEl.elements["payment_reference"].value = reference || "N/A";
      }

      // 1. Send confirmation to user
      try {
        if (formEl) {
          formEl.elements["to_email"].value = user?.email || adsData.Email || "";
        }
        await emailjs.sendForm(
          "service_thbibzh",
          "template_xn7q61k",
          adFormRef.current,
          process.env.REACT_APP_EMAILJS
        );
        console.log("Listing confirmation email sent to user");
      } catch (err) {
        console.error("Failed to send listing email to user:", err);
      }

      // 2. Send copy to admin
      try {
        if (formEl) {
          formEl.elements["to_email"].value = "louiestokk@gmail.com";
        }
        await emailjs.sendForm(
          "service_thbibzh",
          "template_xn7q61k",
          adFormRef.current,
          process.env.REACT_APP_EMAILJS
        );
        console.log("Listing confirmation copy sent to admin");
      } catch (err) {
        console.error("Failed to send listing email copy to admin:", err);
      }

      setIsSubmitting(false);
      setActiveStep(4); // Advance to final step

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
        name: "Basic Listing",
        price: 20,
        durationMonths: 6,
        description: "Standard property listing. Perfect for private sellers and agents wishing to list a single house or plot."
      },
      {
        name: "Premium Listing",
        price: 30,
        durationMonths: 12,
        description: "Double duration exposure. Best value listing for commercial developments or premium beachfront villas."
      }
    ];

    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#013a17", fontSize: "26px", fontWeight: "700" }}>
          Select Advertising Package
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", marginBottom: "30px" }}>
          Choose a listing plan to proceed. Payments are handled securely prior to publication.
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
                {isSubmitting ? "Submitting Ad..." : "I Have Sent Payment - Submit Ad"}
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
      {activeStep === 0 && <Category />}
      {activeStep === 1 && <PackageSelection />}
      {activeStep === 2 && (
        <AdsForm 
          setActiveStep={setActiveStep} 
          adType={adType} 
          onFormSubmit={handleAdFormSubmit} 
        />
      )}
      {activeStep === 3 && <PaymentSelection />}
      {activeStep === 4 && (
        <main>
          <PageHero
            title={"Thank you for your ad!"}
            subtitle={"We have emailed you a confirmation."}
            sub3={
              paymentMethod === "PayPal"
                ? "The ad is now published on the page."
                : "Your ad has been submitted for manual payment verification. It will be published as soon as payment is confirmed."
            }
            sub4={
              "Log in with the same email you created the ad with. You can log in directly with Google and Facebook or create an account. When you are logged in, you can edit your ad and add more images."
            }
            name={".contact-adress"}
          />
          <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
            {paymentMethod === "PayPal" && (
              <Link 
                to={`/propertys/property/${adsData?.adId}`}
                style={{
                  display: "inline-block",
                  background: "#013a17",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  textDecoration: "none",
                  marginRight: "20px",
                  boxShadow: "0 4px 15px rgba(1, 58, 23, 0.15)",
                  transition: "all 0.2s"
                }}
              >
                View Your Ad
              </Link>
            )}
            <Link 
              to="/properties-zanzibar"
              style={{
                display: "inline-block",
                background: paymentMethod === "PayPal" ? "#ffffff" : "#013a17",
                color: paymentMethod === "PayPal" ? "#013a17" : "#ffffff",
                border: "2px solid #013a17",
                padding: "12px 28px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: paymentMethod === "PayPal" ? "none" : "0 4px 15px rgba(1, 58, 23, 0.15)",
                transition: "all 0.2s"
              }}
            >
              {paymentMethod === "PayPal" ? "View All Listings" : "Go to Listings Page"}
            </Link>
          </div>
        </main>
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
