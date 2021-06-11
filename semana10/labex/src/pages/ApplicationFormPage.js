import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsList } from "../routes";
import useForm from "../hooks/useForm";
import countries from "../utils/countries.json";
import { applyTrip, listTrips } from "../api";

/*eslint-disable-next-line max-lines-per-function*/
export default function ApplicationFormPage() {
  const history = useHistory();
  const { form, onChange } = useForm({
    name:            "",
    age:             "",
    applicationText: "",
    profession:      "",
    country:         "",
    trip:            ""
  });
  const [ trips, setTrips ] = useState([]);

  async function listTripsFromApi() {
    try {
      setTrips((await listTrips()).data.trips);
    } catch (error) {
      alert(`Não foi possível pegar a lista de viagens\n${error.data.message}`);
    }
  }

  useEffect(() => listTripsFromApi(), []);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      await applyTrip(form.trip, form);
      alert("Aplicação feita com sucesso");
    } catch (error) {
      alert(`Erro na aplicação\n${error.data.message}`);
    }
  }

  return (
    <>
      <header>
        <p>ApplicationFormPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToTripsList(history)}>
          Ver Viagens Disponíveis
        </button>
        <form onSubmit={onSubmit}>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            minLength="3"
            required
          />
          <label>Idade</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={onChange}
            min="18"
            required
          />
          <label>Por Você É Um Ótimo Candidato</label>
          <input
            type="text"
            name="applicationText"
            value={form.applicationText}
            onChange={onChange}
            minLength="30"
            required
          />
          <label>Profissão</label>
          <input
            type="text"
            name="profession"
            value={form.profession}
            onChange={onChange}
            minLength="10"
            required
          />
          <label>País</label>
          <select
            name="country"
            value={form.country}
            onChange={onChange}
            required
          >
            <option value="" disabled>Selecione Um País</option>
            {countries.map((country) => (
              <option key={country.numeric} value={country.name}>
                {country.name}
              </option>))}
          </select>
          <label>Viagem</label>
          <select
            name="trip"
            value={form.trip}
            onChange={onChange}
            required
          >
            <option value="" disabled>Selecione Uma Viagem</option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {`${trip.name} - ${trip.planet}`}
              </option>))}
          </select>
          <button>Aplicar</button>
        </form>
      </main>
    </>
  );
}
