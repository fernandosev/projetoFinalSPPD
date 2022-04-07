import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu";

import api from "./../../services/api";

export default function NovaAgenda({ history }) {
  const { search } = useLocation();
  const userID = new URLSearchParams(search).get("_id");

  const [usuario, setUsuario] = useState({});
  const [vacinas, setVacinas] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState(0);

  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get(`user/${userID}`);

        setUsuario({
          nome: response.data.user.name,
          dataNasc: response.data.user.birthDate,
          sexo: response.data.user.gender,
          logradouro: response.data.user.street,
          numero: response.data.user.number,
          setor: response.data.user.sector,
          cidade: response.data.user.city,
          _id: userID,
        });
      } catch (err) {
        console.log(err);
      }
    }

    async function getAllVacines() {
      try {
        const response = await api.get("vacines");

        const vacines = response.data.vacines.map((vacine) => {
          return {
            titulo: vacine.title,
            decricao: vacine.description,
            doses: vacine.doses,
            periodicidade: vacine.frequency,
            intervalo: vacine.interval,
            _id: vacine._id,
          };
        });

        setVacinas(vacines);
      } catch (err) {
        console.log(err);
      }
    }

    getAllVacines();
    getUser();
  }, [userID]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post("calendar/add", {
        date: data,
        hour: hora,
        observations: observacoes,
        user: userID,
        vacine: vacinas[vacinaSelecionada]._id,
        doses: vacinas[vacinaSelecionada].doses,
        interval: vacinas[vacinaSelecionada].intervalo,
        frequency: vacinas[vacinaSelecionada].periodicidade,
      });
    } catch (err) {
      console.log(err);
    } finally {
      history.push("/Agenda");
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

      <p>Novo agendamento</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Data *</label>
        <input
          type="date"
          id="data"
          placeholder="Data da vacinação"
          value={data}
          onChange={(event) => setData(event.target.value)}
        />

        <label htmlFor="text">Hora *</label>
        <input
          type="text"
          id="hora"
          placeholder="Hora da vacina (número inteiro)"
          value={hora}
          onChange={(event) => setHora(event.target.value)}
        />

        <label htmlFor="text">Vacina *</label>
        <select
          name="vacina"
          id="vacina"
          onChange={(event) => setVacinaSelecionada(event.target.value)}
        >
          {vacinas.map((vacine, index) => (
            <option key={index} value={index}>
              {vacine.titulo}
            </option>
          ))}
        </select>

        <label htmlFor="text">Usuário *</label>
        <input type="text" id="usuario" value={usuario.nome} disabled />

        <label htmlFor="text">Observações</label>
        <textarea
          type="text"
          id="observacoes"
          placeholder="observações"
          value={observacoes}
          onChange={(event) => setObservacoes(event.target.value)}
        />

        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
