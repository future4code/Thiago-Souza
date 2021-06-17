import React from "react";
import { applyTrip } from "../api";
import useForm from "../hooks/useForm";
import Error from "./Error";

export default function ApplicationForm(props) {
  const { form, onChange, cleanForm } = useForm({
    name:            "",
    age:             "",
    applicationText: "",
    profession:      "",
    country:         "",
    trip:            ""
  });

  async function onSubmit(event) {
    event.preventDefault();

    try {
      await applyTrip(form.trip, form);
      cleanForm();
      alert("Aplicação feita com sucesso");
    } catch (error) {
      alert(`Erro na aplicação\n${error.data.message}`);
    }
  }

  if (!props.trips.length)
    return <Error message="Parece que não temos viagens disponíveis"/>;

  return (
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
      <label>Por Que Você É Um Ótimo Candidato</label>
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
        {props.countries.map((country) => (
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
        {props.trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {`${trip.name} - ${trip.planet}`}
          </option>))}
      </select>
      <button>Aplicar</button>
    </form>
  );
}
