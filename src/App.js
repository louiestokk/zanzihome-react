import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Propertyzanzibar from "./pages/propertyzanzibar";
import Sellpropertyzanzibar from "./pages/sellpropertyzanzibar";
import Rentpropertyzanzibar from "./pages/rentpropertyzanzibar";
import Rentouthousezanzibar from "./pages/rentouthousezanzibar";
import Renthousezanzibar from "./pages/renthousezanzibar";
import Buyhousezanzibar from "./pages/buyhousezanzibar";
import Buylandzanzibar from "./pages/buylandzanzibar";
import SingleObject from "./components/SingleObject";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MapPage from "./pages/MapPage";
import Profile from "./pages/Profile";

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
        <Route path="/sellpropertyzanzibar">
          <Sellpropertyzanzibar />
        </Route>
        <Route path="/rentpropertyzanzibar">
          <Rentpropertyzanzibar />
        </Route>
        <Route path="/rentouthousezanzibar">
          <Rentouthousezanzibar />
        </Route>
        <Route path="/renthousezanzibar">
          <Renthousezanzibar />
        </Route>
        <Route path="/buyhousezanzibar">
          <Buyhousezanzibar />
        </Route>
        <Route path="/buylandzanzibar">
          <Buylandzanzibar />
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
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/propertys/zanzibar/:id">
          <SingleObject />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
