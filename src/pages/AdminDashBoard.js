import React, { useState, useEffect } from "react";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useDispatch } from "react-redux";
import {
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
  FiUsers,
  FiFileText,
  FiPieChart,
  FiDollarSign,
  FiSearch,
  FiLock,
  FiLogOut,
  FiPhone,
  FiMail
} from "react-icons/fi";

const AdminDashBoard = () => {
  const dispatch = useDispatch();

  // Authentication State
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("admin_authenticated") === "true"
  );
  const [loginError, setLoginError] = useState("");

  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "listings" | "customers"

  // Data State
  const [firestoreData, setFirestoreDataState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDealType, setFilterDealType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Edit Modal State
  const [editingAd, setEditingAd] = useState(null);
  const [editFormData, setEditFormData] = useState({
    adId: "",
    Title: "",
    price: "",
    Area: "",
    Name: "",
    Email: "",
    Phone: "",
    WhatsApp: "",
    category: "",
    adType: "",
    isCompany: false,
    Rent: false,
    Sell: false,
    paid: false,
    removed: false,
    Text: "",
    uri: "",
    url: []
  });

  // Image Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fetchFirestoreData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "newAd"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setFirestoreDataState(newData);
      dispatch(setFirestoreData(newData));
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setErrorMessage("Could not load data from Firebase. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFirestoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e) => {
    e.preventDefault();
    const adminPws = process.env.REACT_APP_ADMIN_DASHBORAD_PWS || "admin123";
    if (password === adminPws) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  // Toggle paid status quickly
  const handleTogglePaid = async (adDocId, currentPaid) => {
    try {
      const docRef = doc(db, "newAd", adDocId);
      await updateDoc(docRef, { paid: !currentPaid });
      fetchFirestoreData();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle payment status");
    }
  };

  // Toggle removed status quickly
  const handleToggleRemoved = async (adDocId, currentRemoved) => {
    try {
      const docRef = doc(db, "newAd", adDocId);
      await updateDoc(docRef, { removed: !currentRemoved });
      fetchFirestoreData();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle visibility status");
    }
  };

  // Open Edit Modal
  const openEditModal = (ad) => {
    setEditingAd(ad);
    const isRent = ad.Rent === "Rent" || ad.Rent === true;
    setEditFormData({
      adId: ad.adId || "",
      Title: ad.Title || "",
      price: ad.price || ad.Price || "",
      Area: ad.Area || "",
      Name: ad.Name || "",
      Email: ad.Email || "",
      Phone: ad.Phone || "",
      WhatsApp: ad.WhatsApp || "",
      category: ad.category || "",
      adType: ad.adType || "Properties",
      isCompany: ad.isCompany === true || (ad.About && ad.About.trim().length > 0) || false,
      Rent: isRent,
      Sell: !isRent,
      paid: ad.paid === true,
      removed: ad.removed === true,
      Text: ad.Text || ad.desc || "",
      uri: ad.uri || "",
      url: ad.url || []
    });
  };

  const closeEditModal = () => {
    setEditingAd(null);
    setUploadFile(null);
    setUploadPercent(0);
    setUploading(false);
  };

  // Image Upload Handlers
  const handleImageFileChange = (e) => {
    if (e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    const storageRef = ref(storage, `/files/${Date.now()}_${uploadFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadPercent(pct);
      },
      (err) => {
        console.error("Upload error:", err);
        alert("Upload failed: " + err.message);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setEditFormData((prev) => {
            let updatedUrlArray = [];
            if (editingAd && prev.url) {
              if (Array.isArray(prev.url)) {
                updatedUrlArray = [...prev.url];
                if (updatedUrlArray.length > 0) {
                  updatedUrlArray[0] = downloadUrl; // replace main image
                } else {
                  updatedUrlArray.push(downloadUrl);
                }
              } else if (typeof prev.url === "string") {
                updatedUrlArray = [downloadUrl, prev.url];
              }
            } else {
              updatedUrlArray = [downloadUrl];
            }

            return {
              ...prev,
              uri: downloadUrl,
              url: updatedUrlArray
            };
          });
          
          setUploading(false);
          setUploadFile(null);
          setUploadPercent(0);
        });
      }
    );
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => {
      let updated = { ...prev };
      if (type === "checkbox") {
        updated[name] = checked;
        if (name === "Rent" && checked) {
          updated.Sell = false;
        } else if (name === "Sell" && checked) {
          updated.Rent = false;
        }
      } else {
        updated[name] = name === "isCompany" ? (value === "true") : value;
      }
      return updated;
    });
  };

  // Save Edit Updates
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingAd) return;

    try {
      const docRef = doc(db, "newAd", editingAd.id);
      const updatedFields = {
        adId: Number(editFormData.adId),
        Title: editFormData.Title,
        price: editFormData.price,
        Price: editFormData.price, // Keep both price formats synced
        Area: editFormData.Area,
        Name: editFormData.Name,
        Email: editFormData.Email,
        Phone: editFormData.Phone,
        WhatsApp: editFormData.WhatsApp,
        category: editFormData.category,
        adType: editFormData.adType,
        isCompany: editFormData.isCompany,
        Rent: editFormData.Rent ? "Rent" : null,
        Sell: null,
        paid: editFormData.paid,
        removed: editFormData.removed,
        Text: editFormData.Text,
        uri: editFormData.uri,
        url: editFormData.url
      };

      await updateDoc(docRef, updatedFields);
      closeEditModal();
      fetchFirestoreData();
    } catch (err) {
      console.error(err);
      alert("Failed to update listing: " + err.message);
    }
  };

  // Permanent Delete
  const handlePermanentDelete = async (adDocId) => {
    if (
      window.confirm(
        "Are you sure you want to PERMANENTLY delete this listing from Firestore? This action cannot be undone."
      )
    ) {
      try {
        const docRef = doc(db, "newAd", adDocId);
        await deleteDoc(docRef);
        fetchFirestoreData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete listing.");
      }
    }
  };

  // Group Listings by Customer/Email
  const customersMap = {};
  firestoreData.forEach((ad) => {
    const email = ad.Email || "unspecified@zanzihome.com";
    if (!customersMap[email]) {
      customersMap[email] = {
        name: ad.Name || "Unknown Name",
        email: email,
        phone: ad.Phone || "N/A",
        listings: []
      };
    }
    customersMap[email].listings.push(ad);
  });

  const customersList = Object.values(customersMap).sort(
    (a, b) => b.listings.length - a.listings.length
  );

  // Stats Calculations
  const totalAdsCount = firestoreData.length;
  const activeAdsCount = firestoreData.filter((el) => !el.removed).length;
  const paidAdsCount = firestoreData.filter((el) => el.paid).length;
  const totalCustomersCount = customersList.length;

  const realEstateAds = firestoreData.filter(
    (el) => !["Vehicle", "Tours", "Taxi"].includes(el.adType)
  );
  const vehicleAds = firestoreData.filter((el) => el.adType === "Vehicle");

  const saleCount = firestoreData.filter((el) => el.Rent !== "Rent" && el.Rent !== true).length;
  const rentCount = firestoreData.filter((el) => el.Rent === "Rent" || el.Rent === true).length;
  const totalDeals = saleCount + rentCount || 1;

  // Category counts (Properties only)
  const houseCount = realEstateAds.filter((el) => el.category === "House").length;
  const apartmentCount = realEstateAds.filter((el) => el.category === "Apartment").length;
  const plotCount = realEstateAds.filter((el) => el.category === "Hand").length;
  const businessCount = realEstateAds.filter((el) => el.category === "Business").length;
  const totalProperties = houseCount + apartmentCount + plotCount + businessCount || 1;

  // Filtered Listings
  const filteredListings = firestoreData.filter((ad) => {
    // Search filter
    const titleMatch = (ad.Title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = (ad.Email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const nameMatch = (ad.Name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const areaMatch = (ad.Area || "").toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = (ad.adId || "").toString().includes(searchQuery);
    const matchesSearch = titleMatch || emailMatch || nameMatch || areaMatch || idMatch;

    // Category filter
    const matchesCategory =
      filterCategory === "all" || ad.category === filterCategory;

    // Deal type filter
    const matchesDealType =
      filterDealType === "all" ||
      (filterDealType === "sale" && (ad.Rent !== "Rent" && ad.Rent !== true)) ||
      (filterDealType === "rent" && (ad.Rent === "Rent" || ad.Rent === true));

    // Paid/Status filter
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "paid" && ad.paid === true) ||
      (filterStatus === "unpaid" && !ad.paid) ||
      (filterStatus === "removed" && ad.removed === true);

    return matchesSearch && matchesCategory && matchesDealType && matchesStatus;
  });

  // Auth Screen Render
  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <style>{`
          .admin-login-overlay {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 120px);
            background: #fafbfa;
            font-family: 'Poppins', sans-serif;
          }
          .admin-login-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 40px 30px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .login-icon-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #f0f4f1;
            color: #013a17;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .admin-login-title {
            font-size: 22px;
            font-weight: 800;
            color: #013a17;
            margin: 0 0 8px 0;
          }
          .admin-login-desc {
            font-size: 13.5px;
            color: #6b7280;
            margin: 0 0 24px 0;
            line-height: 1.5;
          }
          .admin-login-input {
            width: 100%;
            padding: 12px 16px;
            border: 1.5px solid #d1d5db;
            border-radius: 10px;
            font-size: 14.5px;
            outline: none;
            box-sizing: border-box;
            text-align: center;
            margin-bottom: 16px;
            transition: border-color 0.2s;
          }
          .admin-login-input:focus {
            border-color: #013a17;
          }
          .admin-login-btn {
            width: 100%;
            background: #013a17;
            color: #ffffff;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-size: 14.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          }
          .admin-login-btn:hover {
            background: #0b8b3a;
          }
          .login-error {
            color: #ef4444;
            font-size: 12.5px;
            margin-bottom: 16px;
            font-weight: 600;
          }
        `}</style>
        <div className="admin-login-card">
          <div className="login-icon-circle">
            <FiLock />
          </div>
          <h2 className="admin-login-title">Admin Dashboard</h2>
          <p className="admin-login-desc">
            Please enter your administrator passcode to access listings & analytics.
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              autoFocus
            />
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="admin-login-btn">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <style>{`
        .admin-dashboard-container {
          background: #f8fafc;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          color: #1e293b;
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
        }

        /* Sidebar & Menu */
        .admin-main-layout {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        @media (min-width: 1024px) {
          .admin-main-layout {
            flex-direction: row;
          }
        }
        .admin-sidebar {
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          width: 100%;
          padding: 24px;
          box-sizing: border-box;
        }
        @media (min-width: 1024px) {
          .admin-sidebar {
            width: 250px;
            min-height: calc(100vh - 80px);
          }
        }
        .sidebar-brand {
          font-size: 18px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: row;
          gap: 8px;
          overflow-x: auto;
        }
        @media (min-width: 1024px) {
          .sidebar-menu {
            flex-direction: column;
            overflow-x: visible;
          }
        }
        .menu-item {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .menu-item:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        .menu-item.active {
          background: #013a17;
          color: #ffffff;
        }

        /* Content panel */
        .admin-content-panel {
          flex: 1;
          padding: 24px;
          box-sizing: border-box;
        }
        .admin-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .admin-panel-header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
          color: #013a17;
        }
        .logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fee2e2;
          color: #991b1b;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: #fca5a5;
        }

        /* Metrics grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .metric-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .metric-info h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }
        .metric-info p {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .metric-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #f0f4f1;
          color: #013a17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        /* Charts section */
        .charts-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .charts-container {
            grid-template-columns: 1fr 1fr;
          }
        }
        .chart-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
        }
        .chart-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px 0;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 8px;
        }

        /* Custom Progress Bars */
        .progress-item {
          margin-bottom: 14px;
        }
        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 4px;
        }
        .progress-track {
          height: 8px;
          background: #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 8px;
        }

        /* Custom Segment Bar */
        .segment-bar {
          display: flex;
          height: 24px;
          border-radius: 8px;
          overflow: hidden;
          margin: 16px 0;
          color: #ffffff;
          font-size: 10.5px;
          font-weight: 700;
        }
        .segment-fill {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s;
        }

        /* Listings View Table */
        .data-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
        }
        .data-header-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 320px;
        }
        .search-input {
          width: 100%;
          padding: 8px 12px 8px 34px;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #013a17;
        }
        .search-icon-fixed {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 14px;
        }
        .filters-wrapper {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-select {
          padding: 6px 10px;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12px;
          outline: none;
          background: #ffffff;
          cursor: pointer;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          padding: 10px 12px;
          border-bottom: 1.5px solid #e2e8f0;
          font-size: 11.5px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .admin-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
          color: #334155;
          vertical-align: middle;
        }
        .admin-table tr:hover td {
          background: #f8fafc;
        }
        .thumbnail-img {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #e2e8f0;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-badge.paid {
          background: #d1fae5;
          color: #065f46;
        }
        .status-badge.unpaid {
          background: #fee2e2;
          color: #991b1b;
        }
        .status-badge.removed {
          background: #f1f5f9;
          color: #475569;
        }
        .action-btn-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
        }
        .action-btn-circle.edit {
          background: #f0fdf4;
          color: #166534;
          margin-right: 6px;
        }
        .action-btn-circle.edit:hover {
          background: #166534;
          color: #ffffff;
        }
        .action-btn-circle.delete {
          background: #fef2f2;
          color: #991b1b;
        }
        .action-btn-circle.delete:hover {
          background: #991b1b;
          color: #ffffff;
        }

        /* Customers View Cards */
        .customers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .customer-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
        }
        .customer-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .customer-name {
          font-size: 14.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .customer-listings-count {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
        }
        .customer-listings-count.multi {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .customer-listings-count.single {
          background: #f1f5f9;
          color: #475569;
        }
        .customer-details {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .customer-details span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .customer-listings-list {
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px;
          font-size: 11.5px;
          max-height: 120px;
          overflow-y: auto;
          border: 1px solid #f1f5f9;
        }
        .customer-listing-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid #f1f5f9;
          color: #013a17;
          font-weight: 600;
          text-decoration: none;
        }
        .customer-listing-link:last-child {
          border: none;
        }
        .customer-listing-link:hover {
          color: #0b8b3a;
        }

        /* Modal popup overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        .modal-content-box {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .modal-header {
          background: #013a17;
          color: #ffffff;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }
        .modal-body {
          padding: 20px;
          max-height: calc(85vh - 120px);
          overflow-y: auto;
        }
        .modal-footer {
          padding: 12px 20px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 500px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-field-group label {
          font-size: 11.5px;
          font-weight: 600;
          color: #475569;
        }
        .form-field-input {
          padding: 8px 10px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          font-size: 13px;
          outline: none;
        }
        .form-field-input:focus {
          border-color: #013a17;
        }
        .form-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          user-select: none;
        }
        .modal-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
        }
        .modal-btn.cancel {
          background: #f1f5f9;
          color: #475569;
        }
        .modal-btn.cancel:hover {
          background: #e2e8f0;
        }
        .modal-btn.save {
          background: #013a17;
          color: #ffffff;
        }
        .modal-btn.save:hover {
          background: #0b8b3a;
        }
      `}</style>

      {/* Main Layout containing Sidebar and Tab panels */}
      <div className="admin-main-layout">
        {/* Sidebar Panel */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <FiLock /> Admin Dashboard
          </div>
          <ul className="sidebar-menu">
            <li
              className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FiPieChart /> Overview
            </li>
            <li
              className={`menu-item ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => setActiveTab("listings")}
            >
              <FiFileText /> Manage Ads
            </li>
            <li
              className={`menu-item ${activeTab === "customers" ? "active" : ""}`}
              onClick={() => setActiveTab("customers")}
            >
              <FiUsers /> Customers
            </li>
          </ul>
        </aside>

        {/* Content Panel */}
        <main className="admin-content-panel">
          <header className="admin-panel-header">
            <h2>
              {activeTab === "dashboard" && "Overview & Analytics"}
              {activeTab === "listings" && "Property & Ads Catalog"}
              {activeTab === "customers" && "Advertisers Registry"}
            </h2>
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </header>

          {errorMessage && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "13px"
              }}
            >
              {errorMessage}
            </div>
          )}

          {loading && (
            <div style={{ display: "flex", justifyContent: "center", margin: "3rem 0" }}>
              <span>Loading admin catalog data...</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {!loading && activeTab === "dashboard" && (
            <>
              {/* Metrics Row */}
              <section className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-info">
                    <h3>{totalAdsCount}</h3>
                    <p>Total Ads</p>
                  </div>
                  <div className="metric-icon-box">
                    <FiFileText />
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-info">
                    <h3>{paidAdsCount}</h3>
                    <p>Paid Listings</p>
                  </div>
                  <div className="metric-icon-box" style={{ background: "#ecfdf5", color: "#065f46" }}>
                    <FiDollarSign />
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-info">
                    <h3>{activeAdsCount}</h3>
                    <p>Visible Ads</p>
                  </div>
                  <div className="metric-icon-box" style={{ background: "#eff6ff", color: "#1e40af" }}>
                    <FiCheck />
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-info">
                    <h3>{totalCustomersCount}</h3>
                    <p>Total Sellers</p>
                  </div>
                  <div className="metric-icon-box" style={{ background: "#faf5ff", color: "#6b21a8" }}>
                    <FiUsers />
                  </div>
                </div>
              </section>

              {/* Analytics Section */}
              <section className="charts-container">
                {/* Category distribution */}
                <div className="chart-card">
                  <h4 className="chart-title">Real Estate Category Share ({totalProperties} Listings)</h4>
                  
                  <div className="progress-item">
                    <div className="progress-label-row">
                      <span>Villas & Houses</span>
                      <span>{houseCount} ads ({Math.round((houseCount / totalProperties) * 100)}%)</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${(houseCount / totalProperties) * 100}%`, background: "#3b82f6" }} />
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label-row">
                      <span>Apartments</span>
                      <span>{apartmentCount} ads ({Math.round((apartmentCount / totalProperties) * 100)}%)</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${(apartmentCount / totalProperties) * 100}%`, background: "#10b981" }} />
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label-row">
                      <span>Beachfront Plots / Land</span>
                      <span>{plotCount} ads ({Math.round((plotCount / totalProperties) * 100)}%)</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${(plotCount / totalProperties) * 100}%`, background: "#f59e0b" }} />
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label-row">
                      <span>Commercial / Businesses</span>
                      <span>{businessCount} ads ({Math.round((businessCount / totalProperties) * 100)}%)</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${(businessCount / totalProperties) * 100}%`, background: "#8b5cf6" }} />
                    </div>
                  </div>
                </div>

                {/* Deal Type comparison */}
                <div className="chart-card">
                  <h4 className="chart-title">Deal Type Ratio (For Sale vs For Rent)</h4>
                  <p style={{ fontSize: "12.5px", color: "#64748b", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                    Compare property deals currently listed. Shows total commercial volume distribution.
                  </p>
                  
                  <div className="segment-bar">
                    <div className="segment-fill" style={{ width: `${(saleCount / totalDeals) * 100}%`, background: "#013a17" }}>
                      {saleCount > 0 && `Sale (${Math.round((saleCount / totalDeals) * 100)}%)`}
                    </div>
                    <div className="segment-fill" style={{ width: `${(rentCount / totalDeals) * 100}%`, background: "#0b8b3a" }}>
                      {rentCount > 0 && `Rent (${Math.round((rentCount / totalDeals) * 100)}%)`}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "12.5px" }}>
                    <div>
                      <span style={{ display: "inline-block", width: "12px", height: "12px", background: "#013a17", borderRadius: "3px", marginRight: "6px" }} />
                      <strong>For Sale:</strong> {saleCount} properties
                    </div>
                    <div>
                      <span style={{ display: "inline-block", width: "12px", height: "12px", background: "#0b8b3a", borderRadius: "3px", marginRight: "6px" }} />
                      <strong>For Rent:</strong> {rentCount} properties
                    </div>
                  </div>

                  <div style={{ marginTop: "24px", padding: "12px", background: "#f8fafc", borderRadius: "10px", fontSize: "12.5px" }}>
                    <strong>Note:</strong> Total ads catalog contains <strong>{vehicleAds.length}</strong> vehicle legacy records which are omitted from real estate ratios.
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: MANAGE ADS LIST */}
          {!loading && activeTab === "listings" && (
            <div className="data-card">
              {/* Controls bar */}
              <div className="data-header-row">
                <div className="search-wrapper">
                  <FiSearch className="search-icon-fixed" />
                  <input
                    type="text"
                    placeholder="Search ID, Title, Email, Name, Area..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filters-wrapper">
                  {/* Category Filter */}
                  <select
                    className="filter-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="House">Houses/Villas</option>
                    <option value="Apartment">Apartments</option>
                    <option value="Hand">Plots/Land</option>
                    <option value="Business">Businesses</option>
                    <option value="Car">Cars</option>
                    <option value="Motorcycle">Motorcycles</option>
                  </select>

                  {/* Deal Type Filter */}
                  <select
                    className="filter-select"
                    value={filterDealType}
                    onChange={(e) => setFilterDealType(e.target.value)}
                  >
                    <option value="all">All Deals</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>

                  {/* Payment/Visibility Status Filter */}
                  <select
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid Only</option>
                    <option value="unpaid">Unpaid Only</option>
                    <option value="removed">Removed Only</option>
                  </select>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>adId</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Price</th>
                      <th>Advertiser</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListings.length > 0 ? (
                      filteredListings.map((ad) => {
                        let imageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=80&h=80";
                        if (ad.url) {
                          if (Array.isArray(ad.url) && ad.url.length > 0) imageUrl = ad.url[0];
                          else if (typeof ad.url === "string") imageUrl = ad.url;
                        } else if (ad.uri) {
                          imageUrl = ad.uri;
                        }

                        const adPrice = ad.price || ad.Price || "0";

                        return (
                          <tr key={ad.id}>
                            <td>
                              <img src={imageUrl} className="thumbnail-img" alt="Listing" />
                            </td>
                            <td style={{ fontWeight: "700" }}>{ad.adId || "N/A"}</td>
                            <td style={{ fontWeight: "600", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {ad.Title || "No Title"}
                            </td>
                            <td>{ad.Area || "N/A"}</td>
                            <td style={{ fontWeight: "700" }}>
                              {adPrice.toString().startsWith("$") ? adPrice : `$${Number(adPrice).toLocaleString()}`}
                            </td>
                            <td>
                              <div style={{ fontWeight: "600", fontSize: "12.5px" }}>{ad.Name || "Private Seller"}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{ad.Email || "No Email"}</div>
                            </td>
                            <td>
                              <span
                                className={`status-badge ${ad.paid ? "paid" : "unpaid"}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleTogglePaid(ad.id, ad.paid)}
                                title="Click to toggle Payment status"
                              >
                                {ad.paid ? "Paid" : "Unpaid"}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`status-badge ${ad.removed ? "removed" : "paid"}`}
                                style={{ cursor: "pointer", background: ad.removed ? "#fee2e2" : "#e0f2fe", color: ad.removed ? "#991b1b" : "#0369a1" }}
                                onClick={() => handleToggleRemoved(ad.id, ad.removed)}
                                title="Click to toggle Visibility status"
                              >
                                {ad.removed ? "Hidden" : "Live"}
                              </span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button
                                className="action-btn-circle edit"
                                onClick={() => openEditModal(ad)}
                                title="Edit ad details"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="action-btn-circle delete"
                                onClick={() => handlePermanentDelete(ad.id)}
                                title="Permanently delete from database"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                          No listings match the search query or active filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS VIEW */}
          {!loading && activeTab === "customers" && (
            <div className="customers-grid">
              {customersList.map((customer, idx) => {
                const isMultiSeller = customer.listings.length > 1;
                return (
                  <div className="customer-card" key={idx}>
                    <div className="customer-card-header">
                      <h4 className="customer-name">{customer.name}</h4>
                      <span className={`customer-listings-count ${isMultiSeller ? "multi" : "single"}`}>
                        {customer.listings.length} {customer.listings.length === 1 ? "ad" : "ads"}
                      </span>
                    </div>

                    <div className="customer-details">
                      <span>
                        <FiMail /> {customer.email}
                      </span>
                      <span>
                        <FiPhone /> {customer.phone}
                      </span>
                    </div>

                    <div className="customer-listings-list">
                      <div style={{ fontWeight: "700", fontSize: "11px", color: "#64748b", marginBottom: "6px", textTransform: "uppercase" }}>
                        Seller's Ads Catalog:
                      </div>
                      {customer.listings.map((item, itemIdx) => (
                        <div key={itemIdx} className="customer-listing-link">
                          <span style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.Title || "No Title"}
                          </span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <span style={{ fontSize: "10.5px", color: "#64748b" }}>ID: {item.adId}</span>
                            <span
                              style={{ cursor: "pointer", color: "#013a17", fontSize: "12px" }}
                              onClick={() => openEditModal(item)}
                              title="Edit Ad Details"
                            >
                              <FiEdit2 />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* EDIT MODAL DIALOG POPUP */}
      {editingAd && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <header className="modal-header">
              <h3>Edit Listing Details (Firestore Document: {editingAd.id})</h3>
              <FiX style={{ cursor: "pointer", fontSize: "18px" }} onClick={closeEditModal} />
            </header>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-field-group">
                    <label htmlFor="adId">Ad ID (Duplicate Checker)</label>
                    <input
                      type="number"
                      name="adId"
                      value={editFormData.adId}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="Title">Property Title</label>
                    <input
                      type="text"
                      name="Title"
                      value={editFormData.Title}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="price">Price ($ or text)</label>
                    <input
                      type="text"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="Area">Area / Location</label>
                    <input
                      type="text"
                      name="Area"
                      value={editFormData.Area}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="Name">Seller Name</label>
                    <input
                      type="text"
                      name="Name"
                      value={editFormData.Name}
                      onChange={handleEditChange}
                      className="form-field-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="Email">Seller Email</label>
                    <input
                      type="email"
                      name="Email"
                      value={editFormData.Email}
                      onChange={handleEditChange}
                      className="form-field-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="Phone">Seller Phone</label>
                    <input
                      type="text"
                      name="Phone"
                      value={editFormData.Phone}
                      onChange={handleEditChange}
                      className="form-field-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="WhatsApp">WhatsApp</label>
                    <input
                      type="text"
                      name="WhatsApp"
                      value={editFormData.WhatsApp}
                      onChange={handleEditChange}
                      className="form-field-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    >
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Hand">Plot</option>
                      <option value="Business">Business</option>
                      <option value="Car">Car</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Bicycle">Bicycle</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="adType">Ad Type Group</label>
                    <select
                      name="adType"
                      value={editFormData.adType}
                      onChange={handleEditChange}
                      className="form-field-input"
                      required
                    >
                      <option value="Properties">Properties</option>
                      <option value="Vehicle">Vehicle</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="isCompany">Advertiser Type</label>
                    <select
                      name="isCompany"
                      value={editFormData.isCompany.toString()}
                      onChange={handleEditChange}
                      className="form-field-input"
                    >
                      <option value="false">Private</option>
                      <option value="true">Company</option>
                    </select>
                  </div>

                  <div className="form-field-group" style={{ gridColumn: "span 2", marginTop: "10px" }}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label className="form-checkbox-label">
                        <input
                          type="checkbox"
                          name="Sell"
                          checked={editFormData.Sell}
                          onChange={handleEditChange}
                        />
                        For Sale
                      </label>

                      <label className="form-checkbox-label">
                        <input
                          type="checkbox"
                          name="Rent"
                          checked={editFormData.Rent}
                          onChange={handleEditChange}
                        />
                        For Rent
                      </label>

                      <label className="form-checkbox-label">
                        <input
                          type="checkbox"
                          name="paid"
                          checked={editFormData.paid}
                          onChange={handleEditChange}
                        />
                        Paid (Live)
                      </label>

                      <label className="form-checkbox-label">
                        <input
                          type="checkbox"
                          name="removed"
                          checked={editFormData.removed}
                          onChange={handleEditChange}
                        />
                        Hidden (Removed)
                      </label>
                    </div>
                  </div>

                  {/* Main Image Management Section */}
                  <div className="form-field-group" style={{ gridColumn: "span 2", background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                    <label style={{ fontWeight: "700", color: "#013a17", display: "block", marginBottom: "8px" }}>
                      Main Image Management
                    </label>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                      {editFormData.uri ? (
                        <div style={{ position: "relative" }}>
                          <img
                            src={editFormData.uri}
                            alt="Main preview"
                            style={{ width: "90px", height: "90px", borderRadius: "8px", objectFit: "cover", border: "1px solid #cbd5e1" }}
                          />
                          <span style={{ position: "absolute", bottom: "4px", left: "4px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "9px", padding: "2px 6px", borderRadius: "4px" }}>
                            Current Main
                          </span>
                        </div>
                      ) : (
                        <div style={{ width: "90px", height: "90px", borderRadius: "8px", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "11px", textAlign: "center", padding: "10px", boxSizing: "border-box" }}>
                          No image
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          style={{ fontSize: "12px", width: "100%" }}
                        />
                        {uploadFile && (
                          <button
                            type="button"
                            onClick={handleImageUpload}
                            className="modal-btn save"
                            style={{ marginTop: "10px", padding: "6px 12px", fontSize: "12px", width: "auto" }}
                            disabled={uploading}
                          >
                            {uploading ? `Uploading ${uploadPercent}%` : "Upload as Main Image"}
                          </button>
                        )}
                        {uploading && (
                          <div style={{ fontSize: "11px", color: "#013a17", marginTop: "6px", fontWeight: "600" }}>
                            Uploading: {uploadPercent}% completed...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-field-group" style={{ gridColumn: "span 2" }}>
                    <label htmlFor="Text">Description</label>
                    <textarea
                      name="Text"
                      value={editFormData.Text}
                      onChange={handleEditChange}
                      className="form-field-input"
                      rows="4"
                      style={{ fontFamily: "inherit" }}
                    />
                  </div>
                </div>
              </div>
              <footer className="modal-footer">
                <button type="button" className="modal-btn cancel" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn save">
                  Save Changes
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
