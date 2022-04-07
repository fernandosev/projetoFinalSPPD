import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NovoUsuario from "./pages/NovoUsuario";
import Usuario from "./pages/Usuario";
import Vacina from "./pages/Vacina";
import NovaVacina from "./pages/NovaVacina";

import NovaAgenda from "./pages/NovaAgenda";
import Agenda from "./pages/Agenda";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Usuario} />
        <Route path="/Usuarios" exact component={Usuario} />
        <Route path="/NovoUsuario" exact component={NovoUsuario} />

        <Route path="/Vacinas" exact component={Vacina} />
        <Route path="/NovaVacina" exact component={NovaVacina} />

        <Route path="/NovaAgenda" exact component={NovaAgenda} />
        <Route path="/Agenda" exact component={Agenda} />
      </Switch>
    </BrowserRouter>
  );
}
