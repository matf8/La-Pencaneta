import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./header/Header";
import Home from "./home/Home";
import Perfil from "./perfil/Perfil";
import Penca from "./penca/Penca";
import PencaEmpresarial from "../adminEmpresarial/penca/Penca";
import AltaPenca from "./penca/alta/AltaPenca";
import ListadoPencas from "./penca/listado/ListadoPencas";
import Resultados from "../resultados/Resultados";
import ResultadosCompetencia from "../resultados/resultadosCompetencia/ResultadosCompetencia";
import ResultadosLiga from "../resultados/resultadosLiga/ResultadosLiga";
import SuccessPayPal from "../paypalResponses/SuccessPayPal";
import FailedPayPal from "../paypalResponses/FailedPaypal";
import Predecir from "./penca/predecir/Predecir";
import ReceptorPayPal from "../ReceptorPaypal";
import Foro from "./foro/Foro";
import EditarPerfil from "./perfil/editar/EditarPerfil";
import AltaTema from "./foro/alta/AltaTema";
import EditarTema from "./foro/editar/EditarTema";
import InscribirmeEmpresarial from "./penca/inscribirmeEmpresarial/InscribirmeEmpresarial";

function Participante() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/perfil" element={<Perfil />} />
          <Route exact path="/penca" element={<Penca />} />
          <Route
            exact
            path="/pencaEmpresarial"
            element={<PencaEmpresarial />}
          />
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
          <Route exact path="/failed" element={<FailedPayPal />} />
          <Route exact path="/predecir" element={<Predecir />} />
          <Route exact path="/receptorpaypal" element={<ReceptorPayPal />} />
          <Route exact path="/foro" element={<Foro />} />
          <Route exact path="/editarperfil" element={<EditarPerfil />} />
          <Route exact path="/altatema" element={<AltaTema />} />
          <Route exact path="/editartema" element={<EditarTema />} />
          <Route
            exact
            path="/inscribirmeEmpresarial"
            element={<InscribirmeEmpresarial />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Participante;
