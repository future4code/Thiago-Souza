import React from "react";
import Close from "./Icons/Close";
import Heart from "./Icons/Heart";

export default function ButtonsForMatch(props) {
  return (
    <section className="buttons for-match">
      <button
        className="reject"
        onClick={() => props.acceptProfile(false)}
        disabled={props.disabled}
      >
        <Close/>
      </button>
      <button
        className="accept"
        onClick={() => props.acceptProfile(true)}
        disabled={props.disabled}
      >
        <Heart/>
      </button>
    </section>
  );
}
