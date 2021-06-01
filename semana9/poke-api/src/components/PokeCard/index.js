import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PokeCard(props) {
  const [ pokemon, setPokemon ] = useState({});

  function getPokemon(pokeName) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => getPokemon(props.pokemon), [ props.pokemon ]);

  return (
    <div>
      <p>{pokemon.name}</p>
      <p>{`${pokemon.weight}Kg`}</p>
      {pokemon.types && <p>{pokemon.types[0].type.name}</p>}
      {pokemon.sprites
          && <img src={pokemon.sprites.front_default} alt={pokemon.name}/>}
    </div>
  );
}
