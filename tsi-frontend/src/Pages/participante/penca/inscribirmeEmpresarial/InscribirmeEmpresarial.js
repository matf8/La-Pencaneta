import React, { useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { addPencaEmpresarial } from "../../../../Services/UsuarioRequests";
import { Form, FormFloating, FloatingLabel, Button } from "react-bootstrap";
import "./InscribirmeEmpresarial.css";
import { NotiBienvenida } from "../../../../Components/NotiBienvenida";
import { NotiError } from "../../../../Components/NotiError";
import { ToastContainer } from "react-toastify";

export default function InscribirmeEmpresarial() {
  const [clave, setClave] = useState("");

  const handleChange = (e) => {
    e.persist();
    setClave(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPencaEmpresarial(clave)
      .then((response) => {
        if (response.status === 200) {
          NotiBienvenida("Inscripcion exitosa");
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
        } else {
          NotiError("No existe una penca con esa clave");
        }
      })
      .catch((err) => {
        NotiError("Error al inscribirse en la penca");
      });
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="page-container-inscribirme-empresarial">
        <Layout>
          <div className="contenido-inscribirme-empresarial">
            <div className="inscribirme-empresarial-form">
              <div className="header-inscribirme-empresarial">
                <h3>Inscribirme</h3>
              </div>
              <div>
                <FormFloating>
                  <FloatingLabel label="Clave">
                    <Form.Control
                      onChange={handleChange}
                      name="clave"
                      type="text"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
              </div>
              <div className="boton-inscribirme-empresarial">
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
