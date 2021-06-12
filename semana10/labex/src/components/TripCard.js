import React from "react";

export default function TripCard(props) {
  const {
    name, planet, description, date, durationInDays
  } = props.trip;

  return (
    <article className="trip">
      <h2>{name}</h2>
      <h3>{planet}</h3>
      <p>{description}</p>
      <p>{`${new Date(date).toLocaleDateString()} - ${durationInDays} dias`}</p>
    </article>
  );
}
