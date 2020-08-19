import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/scss/style.scss";
import LandingPage from "./pages/LandingPage";
import DetailsPage from "pages/DetailsPage";
import Checkout from "pages/Checkout";
import NotFound from "pages/404";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/properties/:id" component={DetailsPage} exact></Route>
        <Route path="/checkout" component={Checkout} exact></Route>
        <Route path="/browse-by" component={NotFound} exact></Route>
        <Route path="/stories" component={NotFound} exact></Route>
        <Route path="/agents" component={NotFound} exact></Route>
        <Route path="/register" component={NotFound} exact></Route>
        <Route path="/properties" component={NotFound} exact></Route>
        <Route path="/use-payments" component={NotFound} exact></Route>
        <Route path="/careers" component={NotFound} exact></Route>
        <Route path="/privacy" component={NotFound} exact></Route>
        <Route path="/terms" component={NotFound} exact></Route>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
