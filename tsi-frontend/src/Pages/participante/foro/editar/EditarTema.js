import React, { useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { editarTema } from "../../../../Services/ForoRequests";
import { Form, FloatingLabel, Button, FormFloating } from "react-bootstrap";
import "./EditarTema.css";
import { NotiError } from "../../../../Components/NotiError";
import { ToastContainer } from "react-toastify";

export default function EditarTema() {
  const [searchParams] = useSearchParams();
  const temaid = searchParams.get("temaid");
  const [data, setData] = useState({
    titulo: "",
    contenido: "",
  });

  const handleChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.titulo === "" && data.contenido === "") {
      NotiError("Se debe ingresar titulo y/o contenido");
    } else {
      editarTema(temaid, data)
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              window.location.replace("/foro");
            }, 3000);
          }
        })
        .catch((err) => {
          NotiError("Error al editar el tema");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="page-container-alta-tema">
        <Layout>
          <div className="contenido-alta-tema">
            <div className="alta-tema-form">
              <div style={{ textAlign: "center" }}>
                <h1>Editar Tema</h1>
              </div>
              <div>
                <FormFloating>
                  <FloatingLabel label="Titulo">
                    <Form.Control
                      onChange={handleChange}
                      name="titulo"
                      type="text"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label="Contenido">
                    <textarea
                      onChange={handleChange}
                      name="contenido"
                      style={{ height: "150px" }}
                      className="form-control"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
              </div>
              <div className="boton-alta-tema">
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
