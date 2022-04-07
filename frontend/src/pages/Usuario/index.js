import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { formatDate } from "../../services/functions";
import api from "./../../services/api";

import "./styles.css";

export default function Usuario() {
  const [users, setUsers] = useState([
    {
      nome: "Fernando Severino",
      dataNasc: "22/12/1998",
      sexo: "Masculino",
      logradouro: "Av. Planície",
      numero: "1587",
      setor: "Itatiaia",
      cidade: "Goiânia",
      uf: "GO",
    },
  ]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await api.get("users");

        const users = response.data.users.map((user) => {
          return {
            nome: user.name,
            dataNasc: user.birthDate,
            sexo: user.gender,
            logradouro: user.street,
            numero: user.number,
            setor: user.sector,
            cidade: user.city,
            _id: user._id,
          };
        });

        setUsers(users);
      } catch (err) {
        console.log(err);
      }
    }

    getAllUsers();
  }, []);

  const _deleteUser = async (_id, index) => {
    try {
      await api.delete(`user/${_id}`);
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);
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

      <Link to="/NovoUsuario">
        <button className="btn">Cadastrar novo Usuário</button>
      </Link>

      <p>Lista de usuários</p>
      <ul className="users">
        {users.map((user, index) => (
          <li key={index}>
            <p>
              <strong>Nome: </strong>
              {user.nome}
            </p>
            <p>
              <strong>Data de nascimento: </strong>
              {formatDate(new Date(user.dataNasc))}
            </p>
            <p>
              <strong>Sexo: </strong>
              {user.sexo}
            </p>
            <p>
              <strong>Logradouro: </strong>
              {user.logradouro}
            </p>
            <p>
              <strong>Número: </strong>
              {user.numero}
            </p>
            <p>
              <strong>Setor: </strong>
              {user.setor}
            </p>
            <p>
              <strong>Cidade: </strong>
              {user.cidade}
            </p>
            <p>
              <strong>UF: </strong>
              {user.uf}
            </p>
            <button
              className="delete"
              onClick={() => _deleteUser(user._id, index)}
            >
              Excluir
            </button>
            <Link to={`/NovaAgenda?_id=${user._id}`}>
              <button className="calendar">Novo agendamento</button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
