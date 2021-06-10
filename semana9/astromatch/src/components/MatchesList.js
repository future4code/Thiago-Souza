import React from "react";
import Error from "./Error";

export default function MatchesList(props) {
  if (!props.matches.length)
    return <Error message="Parece que você ainda não tem nenhum match"/>;

  return (
    <section className="matches">
      {props.matches.map((match) => (
        <article className="match" key={match.id}>
          <div className="img">
            <img className="background" src={match.photo} alt={match.name}/>
            <img src={match.photo} alt={match.name}/>
          </div>
          <p>{match.name}</p>
        </article>
      ))}
    </section>
  );
}
