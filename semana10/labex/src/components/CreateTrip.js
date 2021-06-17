import React from "react";
import { createTrip } from "../api";
import useForm from "../hooks/useForm";
import planets from "../utils/planets.json";

export default function CreateTrip() {
  const { form, onChange, cleanForm } = useForm({
    name:           "",
    planet:         "",
    date:           "",
    description:    "",
    durationInDays: ""
  });

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await createTrip(form, token);
      cleanForm();
      alert("Viagem criada com sucesso");
    } catch (error) {
      alert(`Não foi possível criar a viagem\n${error.data.message}`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Nome</label>
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        type="text"
        minLength="5"
        required
      />
      <label>Planeta</label>
      <select
        name="planet"
        value={form.planet}
        onChange={onChange}
        required
      >
        <option value="" disabled>Selecione Um Planeta</option>
        {planets.map((planet) => (
          <option key={planet} value={planet}>
            {planet}
          </option>))}
      </select>
      <label>Data</label>
      <input
        name="date"
        value={form.date}
        onChange={onChange}
        type="date"
        min={new Date().toISOString().split("T")[0]}
        required
      />
      <label>Descrição</label>
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        type="text"
        minLength="30"
        required
      />
      <label>Duração</label>
      <input
        name="durationInDays"
        value={form.durationInDays}
        onChange={onChange}
        type="number"
        min="50"
        required
      />
      <button>Criar</button>
    </form>

  );
}
