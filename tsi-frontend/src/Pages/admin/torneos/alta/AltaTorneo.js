import React, { useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { altaTroneo } from "../../../../Services/TorneoRequests";
import { Form, FormFloating, FloatingLabel, Button } from "react-bootstrap";
import "./AltaTorneo.css";
import { NotiBienvenida } from "../../../../Components/NotiBienvenida";
import { NotiError } from "../../../../Components/NotiError";

export default function AltaTorneo() {
  const [torneo, setTorneo] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleChange = (e) => {
    e.persist();
    setTorneo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    altaTroneo(torneo)
      .then((response) => {
        if (response.status === 200) {
          NotiBienvenida("Torneo creado con exito");
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
        } else {
          NotiError("No se pudo crear el torneo");
        }
      })
      .catch((err) => {
        NotiError("Error al crear el torneo");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="page-container-alta-torneo">
        <Layout>
          <div className="contenido-alta-torneo">
            <div className="alta-torneo-form">
              <div className="header-alta-torneo">
                <h3>Alta de torneo</h3>
              </div>
              <div>
                <FormFloating>
                  <FloatingLabel label="Nombre">
                    <Form.Control
                      onChange={handleChange}
                      name="nombre"
                      type="text"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label="Fecha inicio">
                    <Form.Control
                      onChange={handleChange}
                      name="fechaInicio"
                      type="date"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label="Fecha fin">
                    <Form.Control
                      onChange={handleChange}
                      name="fechaFin"
                      type="date"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
              </div>
              <div className="boton-alta-torneo">
                <Button type="submit" onClick={handleSubmit} variant="success">
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </Layout>
        <Footer />
      </div>
    </>
  );
}
