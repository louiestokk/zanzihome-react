import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Propertyzanzibar from "./pages/propertyzanzibar";

import SingleObject from "./components/SingleObject";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MapPage from "./pages/MapPage";
import Profile from "./pages/Profile";
import Advertise from "./pages/Advertise";
import Price from "./pages/Price";
import Guid from "./pages/Guid";
import Build from "./pages/Build";
import Foreginer from "./pages/Foreginer";
import FormPage from "./pages/FormPage";
import Payment from "./components/Payment";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/propertyzanzibar">
          <Propertyzanzibar />
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
        <Route path="/newad/:user">
          <FormPage />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/payment/newad">
          <Payment />
        </Route>
        <Route
          path="/propertys/zanzibar/:id"
          children={<SingleObject />}
        ></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
