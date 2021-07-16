/*Para transpilar usamos tsc ./exercício4
  Para transpilar na src usamos tsc ./src/exercício4
  Para transpilar vários arquivos podemos usar tsc ./exercício1 ./exercício2*/

type Pokemon = {
  name: string,
  types: string,
  healthPoints: number
}

const pokemon1: Pokemon = {
  name:         "Charmander",
  types:        "Fire",
  healthPoints: 28
};

const pokemon2: Pokemon = {
  name:         "Bulbasaur",
  types:        "Grass/Poison",
  healthPoints: 31
};

const pokemon3: Pokemon = {
  name:         "Squirtle",
  types:        "Water",
  healthPoints: 35
};
