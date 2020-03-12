import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ProfileChart from "./components/Profile";
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <Navbar darkMode={darkMode} toggleMode={toggleMode} />
      <Route exact path="/">
        <Charts coinData={coinData} />
      </Route>
      <Route path="/profile">
        <ProfileChart />
      </Route>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
