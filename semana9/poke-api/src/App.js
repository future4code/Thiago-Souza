import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";

export default function App() {
  const [ pokeList, setPokeList ] = useState([]);
  const [ pokeName, setPokeName ] = useState("");

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((response) => {
        setPokeList(response.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function changePokeName(event) {
    setPokeName(event.target.value);
  }

  return (
    <div className="App">
      <select onChange={changePokeName}>
        <option value="">Nenhum</option>
        {pokeList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {pokeName && <PokeCard pokemon={pokeName}/>}
    </div>
  );
}
