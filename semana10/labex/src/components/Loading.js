import React from "react";

export default function Loading(props) {
  return (
    <section className="loading">
      <p>{props.message}</p>
    </section>
  );
}
