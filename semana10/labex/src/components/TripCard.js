import React from "react";

export default function TripCard(props) {
  return (
    <article className="trip">
      <h3>{props.trip.name}</h3>
      <p>{props.trip.description}</p>
      <p>{props.trip.planet}</p>
      <p>{props.trip.date}</p>
      <p>{`${props.trip.durationInDays} dias`}</p>
    </article>
  );
}
