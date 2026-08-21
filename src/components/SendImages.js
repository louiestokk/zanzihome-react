"use client";

import React, { useState, useRef } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setImagesUrl } from "../redux-toolkit/ImagesSlice";
import { makeStyles } from "@material-ui/core";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { FiX, FiAlertCircle } from "react-icons/fi";

const useStyles = makeStyles({
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  },
  spin: {
    animation: "$spin 1s linear infinite"
  },
  container: {
    width: "100%",
    fontFamily: "'Poppins', sans-serif"
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "12px",
    marginBottom: "12px",
    width: "100%"
  },
  imageCard: {
    position: "relative",
    height: "100px",
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
    top: "4px",
    right: "4px",
    background: "rgba(239, 68, 68, 0.9)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
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
    height: "100px",
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
    marginBottom: "4px"
  },
  uploadText: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#475569",
    textAlign: "center",
    padding: "0 4px"
  },
  errorText: {
    fontSize: "13px",
    color: "#dc2626",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
    marginBottom: "8px"
  }
});

const SendImages = ({ adsFormData, setadsFormData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [percent, setPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Retrieve imagesArray if it exists, otherwise initialize from uri or empty list
  const currentImages = adsFormData.imagesArray 
    ? [...adsFormData.imagesArray]
    : adsFormData.uri 
    ? [adsFormData.uri] 
    : [];

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setPercent(0);
    setErrorMsg("");

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
        setErrorMsg("Upload failed: " + err.message);
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            const updatedImages = [...currentImages, url];
            
            // Sync with parent state
            setadsFormData({
              ...adsFormData,
              imagesArray: updatedImages,
              uri: updatedImages[0] || "",
              url: updatedImages
            });

            // Dispatch to Redux images state slice for compatibility
            dispatch(setImagesUrl(url));

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
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToDelete);
    setadsFormData({
      ...adsFormData,
      imagesArray: updatedImages,
      uri: updatedImages[0] || "",
      url: updatedImages
    });
  };

  return (
    <div className={classes.container}>
      {errorMsg && (
        <div className={classes.errorText}>
          <FiAlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className={classes.imageGrid}>
        {currentImages.map((url, index) =>
          url ? (
            <div key={index} className={classes.imageCard}>
              <img src={url} alt={`Preview ${index + 1}`} className={classes.image} />
              <button
                type="button"
                className={classes.deleteBtn}
                onClick={() => handleDeleteImage(index)}
                title="Delete image"
              >
                <FiX size={12} />
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
              <FaSpinner className={classes.spin} size={20} style={{ color: "#0b8b3a", marginBottom: 4 }} />
              <span className={classes.uploadText}>Uploading {percent}%</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt size={24} className={classes.uploadIcon} />
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
  );
};

export default SendImages;
