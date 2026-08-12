import React, { useState, useEffect, Suspense, lazy as reactLazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { setFirestoreData } from "./redux-toolkit/firebaseDataSlice";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "./firebase";

// Custom lazy loading with automatic reload on ChunkLoadError (new deploy updates)
const lazy = (componentImport) =>
  reactLazy(async () => {
    const pageHasRefreshed = localStorage.getItem("page-has-refreshed-after-chunk-error");
    try {
      return await componentImport();
    } catch (error) {
      if (!pageHasRefreshed) {
        localStorage.setItem("page-has-refreshed-after-chunk-error", "true");
        window.location.reload(true);
        return new Promise(() => {});
      }
      throw error;
    }
  });

const SeoPages = lazy(() => import("./pages/SeoPages"));
const RentalOwner = lazy(() => import("./pages/RentalOwner"));
const VehicleDetails = lazy(() => import("./pages/VehicleDetails"));
const BookingVehiclePage = lazy(() => import("./pages/BookingVehiclePage"));
const Home = lazy(() => import("./pages/Home"));
const Payments = lazy(() => import("./components/Payments"));
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Propertyzanzibar = lazy(() => import("./pages/propertyzanzibar"));
const Checkcout = lazy(() => import("./pages/Checkcout"));
const SingleObject = lazy(() => import("./components/SingleObject"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const MapPage = lazy(() => import("./pages/MapPage"));
const Profile = lazy(() => import("./pages/Profile"));
const BoostListing = lazy(() => import("./pages/BoostListing"));
const Price = lazy(() => import("./pages/Price"));
const Guid = lazy(() => import("./pages/Guid"));
const Build = lazy(() => import("./pages/Build"));
const Foreginer = lazy(() => import("./pages/Foreginer"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const SingelFirebaseObject = lazy(() =>
  import("./components/SingelFirebaseObject")
);
const PaymentInstructions = lazy(() => import("./pages/PaymentInstructions"));
const EditObject = lazy(() => import("./components/EditObject"));
const BuyersGuide = lazy(() => import("./pages/guides/BuyersGuide"));
const AllPropertiesPage = lazy(() => import("./pages/AllPropertiesPage"));
const AreaPropertiesPage = lazy(() => import("./pages/AreaPropertiesPage"));
const Tours = lazy(() => import("./pages/Tours"));
const Taxi = lazy(() => import("./pages/Taxi"));
const Vehicle = lazy(() => import("./pages/Vehicle"));
const Realestate = lazy(() => import("./pages/realestate/page"));
const InvestZanzibar = lazy(() => import("./pages/InvestZanzibar"));
const ForeignOwnership = lazy(() => import("./pages/ForeignOwnership"));
const ResidencyInvestment = lazy(() => import("./pages/ResidencyInvestment"));
const BestAreas = lazy(() => import("./pages/BestAreas"));
const SeoRentPages = lazy(() => import("./pages/SeoRentPages"));
const SeoInvestPages = lazy(() => import("./pages/SeoInvestPages"));
const ZanzipalmsPartnerPage = lazy(() => import("./pages/ZanzipalmsPartnerPage"));
const ZanzipalmsDetailsPage = lazy(() => import("./pages/ZanzipalmsDetailsPage"));
const SeoCheapPages = lazy(() => import("./pages/SeoCheapPages"));
//
function App() {
  const [logedinUser, setLogedinUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [allVehicle, setallVehicle] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("page-has-refreshed-after-chunk-error");
  }, []);

  const fetchFirestoreData = async () => {
    setLoading(true);
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      dispatch(setFirestoreData(newData));
      setLoading(false);
      setallVehicle(newData.filter((el) => el.adType === "Vehicle"));
    });
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);
  return (
    <Suspense
      fallback={
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      }
    >
      <Router>
        <Navbar logedinUser={logedinUser} loading={loading} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
            <Route path="/buy/:type/:area" >
            <SeoPages />
            </Route>
          <Route path="/propertyzanzibar">
            <Propertyzanzibar />
          </Route>
          <Route path="/rental-owner">
            <RentalOwner />
          </Route>
          <Route path='/booking-vehicle-page'>
            <BookingVehiclePage />
          </Route>
          <Route path="/tours-zanzibar">
            <Tours />
          </Route>
          <Route path="/taxi-zanzibar">
            <Taxi />
          </Route>
          <Route path="/car-rental-zanzibar">
            <Vehicle
              loading={loading}
              allVehicle={allVehicle}
              setallVehicle={setallVehicle}
            />
          </Route>
          <Route path="/cars/:id">
            <VehicleDetails />
          </Route>
          <Route path="/properties-zanzibar">
            <AllPropertiesPage />
          </Route>
          <Route path="/properties/area/:areaName">
            <AreaPropertiesPage />
          </Route>
          <Route path="/partners/zanzipalms" exact>
            <ZanzipalmsPartnerPage />
          </Route>
          <Route path="/partners/zanzipalms/property/:id">
            <ZanzipalmsDetailsPage />
          </Route>
          <Route path="/cheap/:type/for-sale/:area">
            <SeoCheapPages />
          </Route>
          <Route path="/buy-property-zanzibar">
            <BuyersGuide />
          </Route>
          <Route path="/payments-instructions">
            <PaymentInstructions />
          </Route>
          <Route path="/payments">
            <Payments />
          </Route>
          <Route path="/admin-login">
            <AdminLogin />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/boost-listing">
            <BoostListing />
          </Route>
          <Route path="/priceadvertise">
            <Price />
          </Route>
          <Route path="/guid">
            <Guid />
          </Route>
          <Route path="/buildhousezanzibar">
            <Build />
          </Route>
          <Route path="/invest-in-zanzibar">
            <InvestZanzibar />
          </Route>
          <Route path="/foreign-property-ownership-zanzibar">
            <ForeignOwnership />
          </Route>
          <Route path="/residency-by-investment-zanzibar">
            <ResidencyInvestment />
          </Route>
          <Route path="/best-areas-buy-property-zanzibar">
            <BestAreas />
          </Route>
          <Route path="/rent/:type/:area">
            <SeoRentPages />
          </Route>
          <Route path="/invest/:area">
            <SeoInvestPages />
          </Route>
          <Route path="/admin-dashboard_user_admin_dash">
            <AdminDashBoard />
          </Route>
          <Route path="/foreginerpropertyzanzibar">
            <Foreginer />
          </Route>
          <Route path="/profile/:id">
            <Profile logedinUser={logedinUser} />
          </Route>
          <Route path="/checkout">
            <Checkcout logedinUser={logedinUser} />
          </Route>
          <Route path="/edit/property/user/:adId">
            <EditObject />
          </Route>
          <Route
            path="/propertys/zanzibar/:id"
            children={<SingleObject logedinUser={logedinUser} />}
          ></Route>
          <Route path="/propertys/property/:adId">
            <SingelFirebaseObject />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
