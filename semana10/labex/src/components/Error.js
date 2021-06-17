import React from "react";

export default function Error(props) {
  return (
    <section className="error">
      <p>{props.message}</p>
      {props.children}
    </section>
  );
}
