import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { setFirestoreData } from "./redux-toolkit/firebaseDataSlice";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
const RentalOwner = lazy(() => import("./pages/RentalOwner"));
const VehicleDetails = lazy(() => import("./pages/VehicleDetails"));
const PrivateRoute = lazy(() => import("./pages/PrivateRoute"));
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
const Advertise = lazy(() => import("./pages/Advertise"));
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
const Tours = lazy(() => import("./pages/Tours"));
const Taxi = lazy(() => import("./pages/Taxi"));
const Vehicle = lazy(() => import("./pages/Vehicle"));
//
function App() {
  const [logedinUser, setLogedinUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [allVehicle, setallVehicle] = useState([]);
  const dispatch = useDispatch();

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
          <Route path="/propertyzanzibar">
            <Propertyzanzibar />
          </Route>
          <Route path="/rental-owner">
            <RentalOwner />
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
          <Route path="/advertisepropertyzanzibar">
            <Advertise />
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
          <Route path="/admin-dashboard_user_admin_dash">
            {/* <PrivateRoute> */}
            {/* <AdminDashBoard /> */}
            {/* </PrivateRoute> */}
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
