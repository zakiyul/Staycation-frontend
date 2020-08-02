import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./assets/scss/style.scss";
import LandingPage from "./pages/LandingPage";
import DetailsPage from "pages/DetailsPage";
import Checkout from "pages/Checkout";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/properties/:id" component={DetailsPage} exact></Route>
        <Route path="/startBooking" component={Checkout} exact></Route>
      </Router>
    </div>
  );
}

export default App;
