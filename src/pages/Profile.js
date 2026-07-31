import React, { useState, useEffect } from "react";
import { useUserContext } from "../user_context";
import { BsHeart } from "react-icons/bs";
import { makeStyles } from "@material-ui/core";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFirestoreData, setFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    background: "#fafbfa",
    minHeight: "100vh",
    paddingBottom: "60px",
    fontFamily: "'Poppins', sans-serif"
  },
  sec1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px"
  },
  img: {
    objectFit: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "220px",
    borderRadius: "5px"
  },
  horis: {
    height: "1px",
    background: "lightgray",
    width: "90%",
    margin: "1.5rem 0"
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: "1rem",
    "&:hover": {
      border: "1px solid black",
      borderRadius: "5px"
    },
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
  },

  holder: {
    position: "absolute",
    color: "white",
    background: "black",
    padding: "0.5rem"
  }
});

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fireStoreData = useSelector(getFirestoreData);
  const { user, active, setActive } = useUserContext();
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleDelete = async (e, id, adId) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete the ad with ID: ${adId}?`)) {
      try {
        await deleteDoc(doc(db, "newAd", id));
        // Remove from local Redux state
        const updatedData = fireStoreData.filter((item) => item.id !== id);
        dispatch(setFirestoreData(updatedData));
        
        // Show success status
        setDeleteStatus("Ad has been successfully deleted!");
        setTimeout(() => setDeleteStatus(""), 5000);
      } catch (error) {
        console.error("Error deleting ad from database:", error);
        alert("An error occurred while deleting the ad. Please try again.");
      }
    }
  };

  const userProperties = fireStoreData
    ? fireStoreData.filter((el) => el.Email === user?.email)
    : [];

  return (
    <div className={classes.root} id="profile">
      <h2 style={{ margin: "1.5rem 0 0.5rem 0", color: "#013a17", fontWeight: "700" }}>
        Welcome {user && user.nickname}
      </h2>
      
      <section className={classes.sec1}>
        {user && user.picture ? (
          <img
            src={user.picture}
            alt="user icon"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          />
        ) : (
          <FaUserCircle size={60} style={{ color: "#9ca3af" }} />
        )}
        <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", margin: "0" }}>
            {user && user.nickname ? user.nickname : "user"}
          </p>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0 0" }}>
            {user && user.email ? user.email : "email"}
          </p>
        </div>
      </section>

      <div className={classes.horis}></div>
      
      <h2 style={{ marginBottom: "1.5rem", color: "#013a17", fontWeight: "700" }}>
        My ZanziHome Listings
      </h2>

      {deleteStatus && (
        <div style={{
          background: "#ecfdf5",
          color: "#065f46",
          border: "1px solid #a7f3d0",
          borderRadius: "12px",
          padding: "14px 24px",
          marginBottom: "24px",
          fontWeight: "600",
          textAlign: "center",
          width: "90%",
          maxWidth: "600px",
          fontSize: "14.5px",
          boxShadow: "0 4px 12px rgba(6, 95, 70, 0.05)"
        }}>
          {deleteStatus}
        </div>
      )}

      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "30px",
        width: "90%",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {userProperties.length > 0 ? (
          userProperties.map((el, ind) => {
            const { adId, uri, id, Title, Price, Area } = el;
            return (
              <div key={adId || id} style={{
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s"
              }} className="profile-ad-card">
                
                {/* Clickable area goes to Edit screen */}
                <Link to={`/edit/property/user/${adId}`} style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                  <div style={{ position: "relative" }}>
                    <div className={classes.holder} style={{
                      top: "12px",
                      left: "12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      background: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(4px)",
                      padding: "4px 8px"
                    }}>
                      ID: {adId}
                    </div>
                    <img src={uri} alt={Title || "property"} className={classes.img} style={{ height: "180px", width: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1f2937", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {Title || "Untitled Property"}
                    </h4>
                    <p style={{ margin: "6px 0 0 0", fontSize: "15px", color: "#013a17", fontWeight: "700" }}>
                      {Price ? `$${Price}` : "Contact for Price"}
                    </p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" }}>
                      {Area}
                    </p>
                  </div>
                </Link>

                {/* Delete Ad action button */}
                <div style={{ padding: "0 16px 16px 16px" }}>
                  <button
                    onClick={(e) => handleDelete(e, id, adId)}
                    style={{
                      width: "100%",
                      background: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "13.5px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#ef4444"}
                  >
                    Delete Ad
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "20px" }}>
              You don't have any active listings yet.
            </p>
            <Link to="/checkout" style={{
              display: "inline-block",
              background: "#013a17",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none"
            }}>
              List Your First Property
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
