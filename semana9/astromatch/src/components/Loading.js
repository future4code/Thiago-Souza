import React from "react";

export default function Loading(props) {
  return (
    <section className="loading">
      <span className="heart">
        <span className="left"/>
        <span className="right"/>
        <span className="principal"/>
      </span>
      <p>{props.message}</p>
    </section>
  );
}
