import React from "react";
import IconMatches from "../components/Icons/Matches";
import IconHome from "../components/Icons/Home";
import Logo from "./Logo";

export default function HeaderType(props) {
  const Icon = props.type === "matches"
    ? <IconHome className="green"/>
    : <IconMatches className="purple"/>;

  return (
    <header className={props.type === "matches" ? "start" : "end"}>
      <Logo/>
      <button onClick={props.onClick}>
        {Icon}
      </button>
    </header>
  );
}
