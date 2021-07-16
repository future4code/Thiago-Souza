import { Request, Response } from "express";
import { countries } from "../../data";
import { CONTINENTS } from "../../types";

export function getAllCountries(_request: Request, response: Response): void {
  const countriesResponse = countries.map(({ id, name }) => ({
    id,
    name
  }));

  response.send(countriesResponse);
}

export function getCountryByID(request: Request, response: Response): void {
  const { id } = request.params;
  const country = countries.find((country) => country.id.toString() === id);

  if (!country) {
    response.status(404).send("Country not found");
    return;
  }

  response.send(country);
}

export function searchCountries(request: Request, response: Response): void {
  const { name = "", capital = "", continent = "" } = request.query;

  if (!name && !capital && !continent) {
    response.status(400)
      .send("A request need a name, capital or continent in path params");

    return;
  }

  if (typeof name !== "string" || typeof capital !== "string"
      || typeof continent !== "string") {
    response.status(400)
      .send("The name, capital and continent params need to be a string");

    return;
  }

  const nameRegex = new RegExp(name, "i");
  const capitalRegex = new RegExp(capital, "i");
  const continentRegex = new RegExp(continent, "i");

  const countriesResponse = countries
    .filter(({ name, capital, continent }) => name.match(nameRegex)
     && capital.match(capitalRegex)
     && continent.match(continentRegex));

  response.send(countriesResponse);
}

export function changeCountry(request: Request, response: Response): void {
  const { id } = request.params;
  const index = countries.findIndex((country) => country.id.toString() === id);
  if (index < 0) {
    response.status(404).send("Country not found");
    return;
  }

  const { name = "", capital = "" } = request.body;
  if (!name && !capital) {
    response.status(400).send("The body need a name or capital");
    return;
  }

  if (typeof name !== "string" || typeof capital !== "string") {
    response.status(400).send("The name and capital need to be a string");
    return;
  }

  if (name)
    countries[index].name = name;

  if (capital)
    countries[index].capital = capital;

  response.status(201).send("Country update");
}

export function deleteCountry(request: Request, response: Response): void {
  const { id } = request.params;
  const index = countries.findIndex((country) => country.id.toString() === id);
  if (index < 0) {
    response.status(404).send("Country not found");
    return;
  }

  const { authorization } = request.headers;
  if (!authorization) {
    response.status(404).send("To delete country need authorization on header");
    return;
  }

  if (typeof authorization !== "string" || authorization.length < 10) {
    response.status(401).send("Incorrect authorization token");
    return;
  }

  countries.splice(index, 1);
  response.status(200).send("Deleted country");
}

function getNextId(): number {
  return countries[countries.length - 1].id + 1;
}

export function createCountry(request: Request, response: Response): void {
  const { authorization } = request.headers;
  if (!authorization) {
    response.status(404).send("To delete country need authorization on header");
    return;
  }

  if (typeof authorization !== "string" || authorization.length < 10) {
    response.status(401).send("Incorrect authorization token");
    return;
  }

  const { name, capital, continent } = request.body;
  if (!name || !capital || !continent) {
    response.status(400).send("Name, capital and continent are required on body");
    return;
  }

  if (typeof name !== "string" || typeof capital !== "string"
      || typeof continent !== "string") {
    response.status(400).send("Name, capital and continent need to be string");
    return;
  }

  if (countries.find((country) => country.name.toString() === name)) {
    response.status(400).send("The country already exists");
    return;
  }

  const newCountry = {
    id:        getNextId(),
    name,
    capital,
    continent: continent as CONTINENTS
  };

  countries.push(newCountry);

  response.status(201).send({
    message: "Success!",
    country: newCountry
  });
}
