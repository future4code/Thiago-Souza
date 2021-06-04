import React from "react";
import BrokenHeart from "./Icons/BrokenHeart";

export default function Error(props) {
  return (
    <section className="error">
      <BrokenHeart/>
      <p>{props.message}</p>
    </section>
  );
}
