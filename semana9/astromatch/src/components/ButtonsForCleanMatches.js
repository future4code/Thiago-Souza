import React from "react";
import Clean from "./Icons/Clean";

export default function ButtonsForCleanMatches(props) {
  return (
    <section className="buttons for-clean-matches">
      <button
        className="clean"
        onClick={props.cleanMatches}
        disabled={props.disabled}
      >
        <Clean/>
      </button>
    </section>
  );
}
