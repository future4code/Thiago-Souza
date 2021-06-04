import React from "react";
import Error from "./Error";

export default function Profile(props) {
  if (!props.id)
    return <Error message="Parece que não temos mais matches para você"/>;

  return (
    <section className="profile">
      <img className="background" src={props.photo} alt={props.name}/>
      <img src={props.photo} alt={props.name}/>
      <article className="info">
        <h2>
          <strong>{`${props.name}, `}</strong>
          {props.age}
        </h2>
        <p>{props.bio}</p>
      </article>
    </section>
  );
}
