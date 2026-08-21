"use client";

import React, { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { makeStyles } from "@material-ui/core";
import { db } from "../firebase";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const useStyles = makeStyles({
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  },
  spin: {
    animation: "$spin 1s linear infinite"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif"
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    padding: "32px",
    boxSizing: "border-box"
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px"
  },
  section: {
    marginBottom: "28px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "24px",
    "&:last-of-type": {
      borderBottom: "none",
      paddingBottom: 0
    }
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "16px"
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "16px",
    marginBottom: "16px"
  },
  imageCard: {
    position: "relative",
    height: "130px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  deleteBtn: {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "rgba(239, 68, 68, 0.9)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    "&:hover": {
      background: "#dc2626",
      transform: "scale(1.1)"
    }
  },
  uploadBox: {
    border: "2px dashed #cbd5e1",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "130px",
    cursor: "pointer",
    background: "#f8fafc",
    transition: "all 0.2s",
    "&:hover": {
      borderColor: "#0b8b3a",
      background: "#f0fdf4"
    }
  },
  uploadIcon: {
    color: "#64748b",
    marginBottom: "8px"
  },
  uploadText: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#475569"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    "@media (min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr"
    }
  },
  fullWidth: {
    gridColumn: "1 / -1"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#475569",
    marginBottom: "6px"
  },
  input: {
    height: "46px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    fontFamily: "inherit",
    width: "100%",
    transition: "all 0.2s",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#0b8b3a",
      outline: "none",
      boxShadow: "0 0 0 3px rgba(11, 139, 58, 0.15)"
    }
  },
  textarea: {
    height: "120px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    fontFamily: "inherit",
    width: "100%",
    resize: "vertical",
    transition: "all 0.2s",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#0b8b3a",
      outline: "none",
      boxShadow: "0 0 0 3px rgba(11, 139, 58, 0.15)"
    }
  },
  checkboxGroup: {
    display: "flex",
    gap: "24px",
    marginTop: "8px",
    marginBottom: "8px"
  },
  checkboxLabel: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#334155",
    cursor: "pointer"
  },
  submitBtn: {
    background: "#0b8b3a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    height: "50px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    marginTop: "24px",
    "&:hover": {
      background: "#097330"
    },
    "&:disabled": {
      background: "#94a3b8",
      cursor: "not-allowed"
    }
  },
  feedbackMessage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 500,
    marginBottom: "24px",
    width: "100%",
    boxSizing: "border-box"
  },
  successMessage: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#166534"
  },
  errorMessage: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b"
  }
});

const EditObject = () => {
  const classes = useStyles();
  const { adId } = useParams();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upDated, setUpDated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [adDocId, setAdDocId] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Area: "",
    Adress: "",
    Title: "",
    Text: "",
    Price: "",
    Size: "",
    Rooms: "",
    lat: "",
    lng: "",
    Rent: false,
    Sell: false
  });

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        const q = query(
          collection(db, "newAd"),
          where("adId", "==", Number(adId))
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const docData = docSnap.data();
          setAdDocId(docSnap.id);
          
          setFormData({
            Name: docData.Name || "",
            Email: docData.Email || "",
            Phone: docData.Phone || "",
            Area: docData.Area || "",
            Adress: docData.Adress || "",
            Title: docData.Title || "",
            Text: docData.Text || "",
            Price: docData.Price || "",
            Size: docData.Size || "",
            Rooms: docData.Rooms || "",
            lat: docData.lat !== undefined && docData.lat !== null ? docData.lat : "",
            lng: docData.lng !== undefined && docData.lng !== null ? docData.lng : "",
            Rent: docData.Rent || false,
            Sell: docData.Sell || false
          });

          setImagesArray(
            docData.imagesArray
              ? [...docData.imagesArray]
              : docData.uri
              ? [docData.uri]
              : []
          );
        } else {
          setErrorMsg("Listing not found in database.");
        }
      } catch (err) {
        console.error("Error fetching ad data:", err);
        setErrorMsg("Failed to load listing: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (adId) {
      fetchAdData();
    }
  }, [adId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      let updated = { ...prev };
      if (type === "checkbox") {
        updated[name] = checked;
        // Mutual exclusivity for Rent/Sell as per application standards
        if (name === "Rent" && checked) {
          updated.Sell = false;
        } else if (name === "Sell" && checked) {
          updated.Rent = false;
        }
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setPercent(0);
    setErrorMsg("");
    setUpDated(false);

    const storageRef = ref(storage, `/files/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(pct);
      },
      (err) => {
        console.error("Firebase upload error:", err);
        setErrorMsg("Image upload failed: " + err.message);
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setImagesArray((prev) => [...prev, url]);
            setIsUploading(false);
            setPercent(0);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          })
          .catch((err) => {
            console.error("Failed to retrieve download URL:", err);
            setErrorMsg("Failed to retrieve upload URL: " + err.message);
            setIsUploading(false);
          });
      }
    );
  };

  const handleDeleteImage = (indexToDelete) => {
    setImagesArray((prev) => prev.filter((_, idx) => idx !== indexToDelete));
    setUpDated(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!adDocId) {
      setErrorMsg("Cannot update listing. Document ID is missing.");
      return;
    }

    setIsSubmitting(true);
    setUpDated(false);
    setErrorMsg("");

    try {
      const objectDocRef = doc(db, "newAd", adDocId);

      // Convert numeric fields properly for DB consistency
      const priceNum = formData.Price !== "" ? Number(formData.Price) : "";
      const sizeNum = formData.Size !== "" ? Number(formData.Size) : "";
      const roomsNum = formData.Rooms !== "" ? Number(formData.Rooms) : "";
      const latNum = formData.lat !== "" ? Number(formData.lat) : "";
      const lngNum = formData.lng !== "" ? Number(formData.lng) : "";

      await updateDoc(objectDocRef, {
        ...formData,
        Price: priceNum,
        Size: sizeNum,
        Rooms: roomsNum,
        lat: latNum,
        lng: lngNum,
        imagesArray: imagesArray,
        uri: imagesArray[0] || "",
        url: imagesArray
      });

      setUpDated(true);
    } catch (err) {
      console.error("Error updating document:", err);
      setErrorMsg("Failed to update listing: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FaSpinner className={classes.spin} size={40} style={{ color: "#0b8b3a", marginBottom: "16px" }} />
          <p style={{ color: "#64748b", fontWeight: 500 }}>Loading ad details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Edit Listing</h1>
        <p className={classes.subtitle}>Ad ID: {adId}</p>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Property Images</h2>
          <div className={classes.imageGrid}>
            {imagesArray.map((url, index) =>
              url ? (
                <div key={index} className={classes.imageCard}>
                  <img src={url} alt={`Listing ${index + 1}`} className={classes.image} />
                  <button
                    type="button"
                    className={classes.deleteBtn}
                    onClick={() => handleDeleteImage(index)}
                    title="Delete image"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : null
            )}
            
            <div
              className={classes.uploadBox}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              {isUploading ? (
                <>
                  <FaSpinner className={classes.spin} size={24} style={{ color: "#0b8b3a", marginBottom: 8 }} />
                  <span className={classes.uploadText}>Uploading {percent}%</span>
                </>
              ) : (
                <>
                  <FaCloudUploadAlt size={28} className={classes.uploadIcon} />
                  <span className={classes.uploadText}>Add Image</span>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Contact Information</h2>
            <div className={classes.grid}>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Name">Contact Name</label>
                <input
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Email">Contact Email</label>
                <input
                  id="Email"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={`${classes.inputGroup} ${classes.fullWidth}`}>
                <label className={classes.label} htmlFor="Phone">Contact Phone</label>
                <input
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Location Details</h2>
            <div className={classes.grid}>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Area">Area</label>
                <input
                  id="Area"
                  name="Area"
                  value={formData.Area}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Adress">Address</label>
                <input
                  id="Adress"
                  name="Adress"
                  value={formData.Adress}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="lat">Latitude</label>
                <input
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="lng">Longitude</label>
                <input
                  id="lng"
                  name="lng"
                  value={formData.lng}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Property Specifications</h2>
            <div className={classes.grid}>
              <div className={`${classes.inputGroup} ${classes.fullWidth}`}>
                <label className={classes.label} htmlFor="Title">Ad Title</label>
                <input
                  id="Title"
                  name="Title"
                  value={formData.Title}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={`${classes.inputGroup} ${classes.fullWidth}`}>
                <label className={classes.label} htmlFor="Text">Description</label>
                <textarea
                  id="Text"
                  name="Text"
                  value={formData.Text}
                  onChange={handleInputChange}
                  className={classes.textarea}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Price">Price ($)</label>
                <input
                  id="Price"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label} htmlFor="Size">Size (sqm)</label>
                <input
                  id="Size"
                  name="Size"
                  value={formData.Size}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              <div className={`${classes.inputGroup} ${classes.fullWidth}`}>
                <label className={classes.label} htmlFor="Rooms">Rooms</label>
                <input
                  id="Rooms"
                  name="Rooms"
                  value={formData.Rooms}
                  onChange={handleInputChange}
                  className={classes.input}
                />
              </div>
              
              <div className={`${classes.inputGroup} ${classes.fullWidth}`}>
                <label className={classes.label}>Listing Type</label>
                <div className={classes.checkboxGroup}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id="Rent"
                      name="Rent"
                      checked={formData.Rent}
                      onChange={handleInputChange}
                      style={{ width: "20px", height: "20px", marginRight: "8px", cursor: "pointer", accentColor: "#0b8b3a" }}
                    />
                    <label htmlFor="Rent" className={classes.checkboxLabel}>Rent</label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id="Sell"
                      name="Sell"
                      checked={formData.Sell}
                      onChange={handleInputChange}
                      style={{ width: "20px", height: "20px", marginRight: "8px", cursor: "pointer", accentColor: "#0b8b3a" }}
                    />
                    <label htmlFor="Sell" className={classes.checkboxLabel}>Sell</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {upDated && (
            <div className={`${classes.feedbackMessage} ${classes.successMessage}`}>
              <FiCheckCircle size={20} />
              <span>Listing updated successfully!</span>
            </div>
          )}

          {errorMsg && (
            <div className={`${classes.feedbackMessage} ${classes.errorMessage}`}>
              <FiAlertCircle size={20} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className={classes.submitBtn}
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className={classes.spin} size={18} />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditObject;
