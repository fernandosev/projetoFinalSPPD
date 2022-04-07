import React, { useState } from "react";
import Menu from "../../components/Menu";

import api from "./../../services/api";

export default function NovoUsuario({ history }) {
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [sexo, setSexo] = useState("feminino");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [setor, setSetor] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("ac");
  const [alergias, setAlergias] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post("/user/add", {
        name: nome,
        birthDate: dataNasc,
        gender: sexo,
        street: logradouro,
        number: numero,
        sector: setor,
        city: cidade,
        state: uf,
        alergics: alergias.split(","),
      });
    } catch (err) {
      console.log(err);
    } finally {
      history.push("/Usuarios");
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

      <p>Novo usuário</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Nome *</label>
        <input
          type="text"
          id="nome"
          placeholder="Seu nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <label htmlFor="date">Data de nascimento *</label>
        <input
          type="date"
          id="dataNasc"
          placeholder="Data de nascimento"
          value={dataNasc}
          onChange={(event) => setDataNasc(event.target.value)}
        />

        <label htmlFor="text">Sexo *</label>
        <select
          name="sexo"
          id="sexo"
          onChange={(event) => setSexo(event.target.value)}
        >
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
        </select>

        <label htmlFor="text">Logradouro *</label>
        <input
          type="text"
          id="logradouro"
          placeholder="Logradouro"
          value={logradouro}
          onChange={(event) => setLogradouro(event.target.value)}
        />

        <label htmlFor="text">Número *</label>
        <input
          type="text"
          id="numero"
          placeholder="Número"
          value={numero}
          onChange={(event) => setNumero(event.target.value)}
        />

        <label htmlFor="text">Setor</label>
        <input
          type="text"
          id="setor"
          placeholder="Setor"
          value={setor}
          onChange={(event) => setSetor(event.target.value)}
        />

        <label htmlFor="text">Cidade *</label>
        <input
          type="text"
          id="cidade"
          placeholder="Cidade"
          value={cidade}
          onChange={(event) => setCidade(event.target.value)}
        />

        <label htmlFor="text">Estado *</label>
        <select
          name="estado"
          id="estado"
          onChange={(event) => setUF(event.target.value)}
        >
          <option value="ac">Acre - AC</option>
          <option value="al">Alagoas - AL</option>
          <option value="ap">Amapá - AP</option>
          <option value="am">Amazonas - AM</option>
          <option value="ba">Bahia - BA</option>
          <option value="ce">Ceará - CE</option>
          <option value="df">Distrito Federal - DF</option>
          <option value="es">Espírito Santo - ES</option>
          <option value="go">Goiás - GO</option>
          <option value="ma">Maranhão - MA</option>
          <option value="mt">Mato Grosso - MT</option>
          <option value="ms">Mato Grosso do Sul - MS</option>
          <option value="mg">Minas Gerais - MG</option>
          <option value="pa">Pará - PA</option>
          <option value="pb">Paraíba - PB</option>
          <option value="pr">Paraná - PR</option>
          <option value="pe">Pernanbuco - PE</option>
          <option value="pi">Piauí -PI </option>
          <option value="rj">Rio de Janeiro - RJ</option>
          <option value="rn">Rio Grande do Norte - RN</option>
          <option value="rs">Rio Grande do Sul - RS</option>
          <option value="ro">Rondônia - RO</option>
          <option value="rr">Roraima - RR</option>
          <option value="sc">Santa Catarina - SC</option>
          <option value="sp">São Paulo - SP</option>
          <option value="se">Sergipe - SE</option>
          <option value="to">Tocantins - TO</option>
        </select>

        <label htmlFor="text">Alergias (separadas por vírgula)</label>
        <textarea
          type="text"
          id="alergias"
          placeholder="Suas alergias"
          value={alergias}
          onChange={(event) => setAlergias(event.target.value)}
        />

        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
