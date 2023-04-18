import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { getToken, getRol } from "./Services/LoginRequests";
import { Cargando } from "./Components/cargando/Cargando";
import Admin from "./Pages/admin/Admin";
import AdminEmpresarial from "./Pages/adminEmpresarial/AdminEmpresarial";
import Participante from "./Pages/participante/Participante";
import Login from "./Pages/login/Login";
import Registro from "./Pages/registro/Registro";
import RecuperarPass from "./Pages/password/RecuperarPass";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  if (getToken() !== null) {
    const role = getRol();
    switch (role) {
      case "Participante":
        return <Participante />;
      case "AdminEmpresarial":
        return <AdminEmpresarial />;
      case "Admin":
        return <Admin />;
      default:
        return (
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/"
                element={<Cargando text="Iniciando sesion" />}
              />
            </Routes>
          </BrowserRouter>
        );
    }
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/registroParticipante" element={<Registro />} />
          <Route exact path="/recuperarPassword" element={<RecuperarPass />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
