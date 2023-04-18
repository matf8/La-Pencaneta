import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header/Header";
import Home from "./home/Home";
import Perfil from "./perfil/Perfil";
import ListadoPencas from "../admin/pencas/listado/ListadoPencas";
import ListadoUsuarios from "../admin/usuarios/listado/ListadoUsuarios";
import ListadoTorneos from "../admin/torneos/listado/ListadoTorneos";
import AltaAdmin from "./usuarios/alta/AltaAdmin";
import AltaPenca from "../participante/penca/alta/AltaPenca";
import AltaTorneo from "./torneos/alta/AltaTorneo";
import AltaEventos from "./torneos/eventos/alta/AltaEventos";
import EditarPerfil from "../participante/perfil/editar/EditarPerfil";
import TerminarEventos from "./torneos/eventos/terminar/TerminarEventos";

function Admin() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Fragment>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/perfil" element={<Perfil />} />
            <Route exact path="/pencas" element={<ListadoPencas />} />
            <Route exact path="/usuarios" element={<ListadoUsuarios />} />
            <Route exact path="/torneos" element={<ListadoTorneos />} />
            <Route exact path="/altaAdmin" element={<AltaAdmin />} />
            <Route exact path="/altaTorneo" element={<AltaTorneo />} />
            <Route exact path="/altaPenca" element={<AltaPenca />} />
            <Route exact path="/altaEventos" element={<AltaEventos />} />
            <Route exact path="/editarPerfil" element={<EditarPerfil />} />
            <Route
              exact
              path="/terminarEventos"
              element={<TerminarEventos />}
            />
          </Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Admin;
