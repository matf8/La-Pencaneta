import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header/Header";
import Home from "./home/Home";
import Perfil from "../participante/perfil/Perfil";
import Penca from "./penca/Penca";
import AltaPenca from "../participante/penca/alta/AltaPenca";
import ListadoPencas from "../participante/penca/listado/ListadoPencas";
import Resultados from "../resultados/Resultados";
import ResultadosCompetencia from "../resultados/resultadosCompetencia/ResultadosCompetencia";
import ResultadosLiga from "../resultados/resultadosLiga/ResultadosLiga";
import SuccessPayPal from "../paypalResponses/SuccessPayPal";
import Predecir from "../participante/penca/predecir/Predecir";
import Foro from "../participante/foro/Foro";
import EditarPerfil from "../participante/perfil/editar/EditarPerfil";

function AdminEmpresarial() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Fragment>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/perfil" element={<Perfil />} />
            <Route exact path="/editarperfil" element={<EditarPerfil />} />
            <Route exact path="/penca" element={<Penca />} />
            <Route exact path="/altaPenca" element={<AltaPenca />} />
            <Route exact path="/listadoPencas" element={<ListadoPencas />} />
            <Route exact path="/resultados" element={<Resultados />} />
            <Route
              exact
              path="/resultadosCompetencia"
              element={<ResultadosCompetencia />}
            />
            <Route exact path="/resultadosLiga" element={<ResultadosLiga />} />
            <Route exact path="/success" element={<SuccessPayPal />} />
            <Route exact path="/predecir" element={<Predecir />} />
            <Route exact path="/foro" element={<Foro />} />
          </Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AdminEmpresarial;
