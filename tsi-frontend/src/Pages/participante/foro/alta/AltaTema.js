import React, { useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { altaTema } from "../../../../Services/ForoRequests";
import { Form, FloatingLabel, Button, FormFloating } from "react-bootstrap";
import "./AltaTema.css";

export default function AltaTema() {
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
    altaTema(data).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          window.location.replace("/foro");
        }, 3000);
      }
    });
  };

  return (
    <>
      <Sidebar />
      <div className="page-container-alta-tema">
        <Layout>
          <div className="contenido-alta-tema">
            <div className="alta-tema-form">
              <div style={{ textAlign: "center" }}>
                <h1>Alta de Tema</h1>
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
