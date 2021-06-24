import React from "react";
import Router from "./routes/Router";
import GlobalStates from "./global/GlobalStates";

function App() {
  return (
    <GlobalStates>
      <Router/>
    </GlobalStates>
  );
}

export default App;
