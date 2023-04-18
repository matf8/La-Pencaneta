import React, { useState } from "react";
import { Layout } from "../../Components/Layout";
import { Footer } from "../../Components/footer/Footer";
import { Header } from "../../Components/header/Header";
import { FormFloating, FloatingLabel, Form, Button } from "react-bootstrap";
import frase from "../../Assets/frase-TSI-removebg-preview.png";
import { ToastContainer } from "react-toastify";
import { registro } from "../../Services/LoginRequests";
import { NotiBienvenida } from "../../Components/NotiBienvenida";
import { NotiError } from "../../Components/NotiError";
import "./Registro.css";

function Registro() {
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    fnac: "",
  });

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registro(values).then((res) => {
      if (res.status === 200) {
        NotiBienvenida("Bienvenido a LaPencaneta");
        setTimeout(() => {
          window.location.replace("/");
        }, [3000]);
      } else {
        NotiError("Hubo un error, intenta nuevamente");
      }
    });
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="page-container">
        <Layout>
          <div className="frase">
            <img src={frase} alt="frase" />
          </div>
          <div className="contentRegistro">
            <form onSubmit={handleSubmit}>
              <h6>*Obligatorio</h6>
              <h1 className="titulo-registro">Ingrese sus datos</h1>
              <div className="inputs-registro">
                <div>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Nombre*">
                      <Form.Control
                        onChange={handleChange}
                        name="nombre"
                        type="text"
                        required
                      />
                    </FloatingLabel>
                  </FormFloating>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Apellido*">
                      <Form.Control
                        onChange={handleChange}
                        name="apellido"
                        type="text"
                        required
                      />
                    </FloatingLabel>
                  </FormFloating>
                </div>
                <div>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Telefono">
                      <Form.Control
                        onChange={handleChange}
                        name="telefono"
                        type="number"
                      />
                    </FloatingLabel>
                  </FormFloating>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Fecha de nacimiento*">
                      <Form.Control
                        onChange={handleChange}
                        name="fnac"
                        type="date"
                        required
                      />
                    </FloatingLabel>
                  </FormFloating>
                </div>
                <div>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Correo*">
                      <Form.Control
                        onChange={handleChange}
                        name="email"
                        type="text"
                        required
                      />
                    </FloatingLabel>
                  </FormFloating>
                  <FormFloating className="registroInput">
                    <FloatingLabel label="Password*">
                      <Form.Control
                        onChange={handleChange}
                        name="password"
                        type="password"
                        required
                      />
                    </FloatingLabel>
                  </FormFloating>
                </div>
              </div>
              <Button type="submit" className="submitRegistro">
                Registrarme
              </Button>
            </form>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default Registro;
