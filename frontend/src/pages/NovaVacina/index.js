import React, { useState } from "react";
import Menu from "../../components/Menu";

import api from "./../../services/api";

export default function NovaVacina({ history }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [doses, setDoses] = useState("");
  const [periodicidade, setPeriodicidade] = useState("dias");
  const [intervalo, setIntervalo] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post("vacine/add", {
        title: titulo,
        description: descricao,
        doses,
        frequency: periodicidade,
        interval: intervalo,
      });
    } catch (err) {
      console.log(err);
    } finally {
      history.push("/Vacinas");
    }
  }

  return (
    <>
      <Menu
        items={[
          {
            name: "Usuários",
            color: "#FFFFFF",
            href: "/Usuarios",
          },
          {
            name: "Vacinas",
            color: "#FFFFFF",
            href: "/Vacinas",
          },
          {
            name: "Agenda",
            color: "#FFFFFF",
            href: "/Agenda",
          },
        ]}
      />

      <p>Nova vacina</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Título *</label>
        <input
          type="text"
          id="titulo"
          placeholder="Título"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />

        <label htmlFor="text">Descrição *</label>
        <input
          type="text"
          id="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />

        <label htmlFor="text">Doses *</label>
        <input
          type="text"
          id="doses"
          placeholder="Número de doses"
          value={doses}
          onChange={(event) => setDoses(event.target.value)}
        />

        <label htmlFor="text">Periodicidade *</label>
        <select
          name="periodicidade"
          id="periodicidade"
          onChange={(event) => setPeriodicidade(event.target.value)}
        >
          <option value="dias">Dias</option>
          <option value="semanas">Semanas</option>
          <option value="meses">Meses</option>
          <option value="anos">Anos</option>
        </select>

        <label htmlFor="text">Intervalo *</label>
        <input
          type="intervalo"
          id="intervalo"
          placeholder="Intervalo"
          value={intervalo}
          onChange={(event) => setIntervalo(event.target.value)}
        />

        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
