import React from "react";
import Navigation from "./Navigation";

export default function Header(props) {
  return (
    <header>
      <h1>LabeX</h1>
      {props.children}
      {!props.noNav && <Navigation {...props}/>}
    </header>
  );
}
