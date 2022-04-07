import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { formatDate } from "../../services/functions";
import api from "./../../services/api";

import "./styles.css";

export default function Agenda() {
  const [calendario, setCalendario] = useState([]);

  useEffect(() => {
    async function getCalendar() {
      try {
        const response = await api.get("calendar");

        const calendar = response.data.calendar.map((calendar) => {
          return {
            nome: calendar.user.name,
            data: calendar.date,
            hora: calendar.hour,
            vacina: calendar.vacine.title,
            dose: calendar.dose,
            status: calendar.status,
            _id: calendar._id,
          };
        });

        console.log(calendar);

        setCalendario(calendar);
      } catch (err) {
        console.log(err);
      }
    }

    getCalendar();
  }, []);

  const _getByStatus = async (status) => {
    try {
      const response = await api.get(`calendar/status/${status}`);

      const calendar = response.data.calendar.map((calendar) => {
        return {
          nome: calendar.user.name,
          data: calendar.date,
          hora: calendar.hour,
          vacina: calendar.vacine.title,
          dose: calendar.dose,
          status: calendar.status,
          _id: calendar._id,
        };
      });

      setCalendario(calendar);
    } catch (err) {
      console.log(err);
    }
  };

  const _cancelCalendar = async (_id, index) => {
    try {
      await api.put("calendar", { _id, status: "Cancelada" });
      const novoCalendario = [...calendario];
      novoCalendario[index].status = "Cancelada";
      setCalendario(novoCalendario);
    } catch (err) {
      console.log(err);
    }
  };

  const _finishCalendar = async (_id, index) => {
    try {
      await api.put("calendar", { _id, status: "Realizada" });
      const novoCalendario = [...calendario];
      novoCalendario[index].status = "Realizada";
      setCalendario(novoCalendario);
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

      <p>Lista de agendamentos</p>
      <p className="filters">Filtros</p>
      {/* <button className="today">Hoje</button> */}
      <button className="done" onClick={() => _getByStatus("Realizada")}>
        Realizadas
      </button>
      <button className="canceled" onClick={() => _getByStatus("Cancelada")}>
        Canceladas
      </button>
      <ul className="users">
        {calendario.map((vacina, index) => (
          <li key={index}>
            <p>
              <strong>Nome do usuário: </strong>
              {vacina.nome}
            </p>
            <p>
              <strong>Data da vacina: </strong>
              {formatDate(new Date(vacina.data))}
            </p>
            <p>
              <strong>Vacina: </strong>
              {vacina.vacina}
            </p>
            <p>
              <strong>Número da dose: </strong>
              {vacina.dose}
            </p>
            <p>
              <strong>Status: </strong>
              {vacina.status}
            </p>
            <button
              className="done"
              onClick={() => _finishCalendar(vacina._id, index)}
            >
              Realizar
            </button>

            <button
              className="cancel"
              onClick={() => _cancelCalendar(vacina._id, index)}
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
