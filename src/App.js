import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Propertyzanzibar from "./pages/propertyzanzibar";
import Checkcout from "./pages/Checkcout";
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
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [logedinUser, setLogedinUser] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Navbar logedinUser={logedinUser} loading={loading} />
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
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
