import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import api from "./../../services/api";

import "./styles.css";

export default function Vacina() {
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
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
  }, []);

  const _deleteVacine = async (_id, index) => {
    try {
      await api.delete(`vacine/${_id}`);
      const novasVacinas = [...vacinas];
      novasVacinas.splice(index, 1);
      setVacinas(novasVacinas);
    } catch (err) {
      console.log(err);
    }
  };

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

      <Link to="/NovaVacina">
        <button className="btn">Cadastrar nova Vacina</button>
      </Link>

      <p>Lista de vacinas</p>
      <ul className="vacines">
        {vacinas.map((vacine, index) => (
          <li key={index}>
            <p>
              <strong>Título: </strong>
              {vacine.titulo}
            </p>
            <p>
              <strong>Descrição: </strong>
              {vacine.descricao}
            </p>
            <p>
              <strong>Doses: </strong>
              {vacine.doses}
            </p>
            <p>
              <strong>Periodicidade: </strong>
              {vacine.periodicidade}
            </p>
            <p>
              <strong>Intervalo: </strong>
              {vacine.intervalo}
            </p>

            <button
              className="delete"
              onClick={() => _deleteVacine(vacine._id, index)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
