import React, { useState, useEffect } from "react";
import { Layout } from "../../../Components/Layout";
import { Footer } from "../../../Components/footer/Footer";
import foto from "../../../Assets/avatar-f.png";
import "./Perfil.css";
import { getUsuario } from "../../../Services/UsuarioRequests";
import { formatearFecha } from "../../../Functions/Funciones";
import { Button } from "react-bootstrap";

function Perfil() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fnac: "",
    rol: "",
    foto: "",
  });
  useEffect(() => {
    getUsuario().then((res) => {
      setUsuario(res.data);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="page-container-perfil">
        <Layout>
          <div className="contenidoPerfil">
            <h2 className="perfil-titulo">Perfil</h2>
            <div className="form-perfil">
              <div>
                <div className="foto-perfil">
                  <div>
                    <img className="foto" alt="foto" src={foto} />
                  </div>
                  <div>
                    <h3 className="info-destacada">{usuario.rol}</h3>
                  </div>
                </div>
              </div>
              <div>
                <div className="datosPerfil">
                  <h6 className="info-field">
                    {usuario.nombre} {usuario.apellido}
                  </h6>
                  <h6 className="info-field">{usuario.telefono}</h6>
                  <h6 className="info-field">{usuario.email}</h6>
                  <h6 className="info-field">{formatearFecha(usuario.fnac)}</h6>
                </div>
              </div>
              <div>
                <div className="acciones">
                  <div>
                    <p className="nombres-acciones">Editar perfil</p>
                    <Button variant="danger" href="/editarPerfil">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
