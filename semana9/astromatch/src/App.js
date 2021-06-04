import React, { useState } from "react";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import "./styles/style.scss";

function App() {
  const [ page, setPage ] = useState("home");

  function gotToHome() {
    setPage("home");
  }

  function goToMatches() {
    setPage("matches");
  }

  return page === "matches"
    ? <Matches gotToHome={gotToHome}/>
    : <Home goToMatches={goToMatches}/>;
}

export default App;
