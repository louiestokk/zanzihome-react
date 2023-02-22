import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = lazy(() => import("./pages/Home"));
const Payments = lazy(() => import("./components/Payments"));
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

function App() {
  const [logedinUser, setLogedinUser] = useState({});
  const [loading, setLoading] = useState(false);

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
          <Route path="/payments">
            <Payments />
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
          <Route path="/foreginerpropertyzanzibar">
            <Foreginer />
          </Route>
          <Route path="/profile/:id">
            <Profile logedinUser={logedinUser} />
          </Route>
          <Route path="/checkout">
            <Checkcout logedinUser={logedinUser} />
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
