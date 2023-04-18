import React from "react";
import { Layout } from "../../Components/Layout";
import { Footer } from "../../Components/footer/Footer";
import { Header } from "../../Components/header/Header";
import logo from "../../Assets/logo-pencaneta.png";
import "./RecuperarPass.css";
import { FormFloating, FloatingLabel, Form, Button } from "react-bootstrap";
import { NotiError } from "../../Components/NotiError";
import { ToastContainer } from "react-toastify";

function RecuperarPass() {
  const handleSubmit = (e) => {
    e.preventDefault();
    NotiError("recuperacion de pass(correo)");
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="page-container">
        <Layout>
          <div className="contentRp">
            <Form className="inputsRp" onSubmit={handleSubmit}>
              <img className="logo-rp" src={logo} alt="logo" />
              <h2 className="rpText">Recuperar contraseña</h2>
              <FormFloating className="rpInput">
                <FloatingLabel label="Correo*">
                  <Form.Control type="text" required />
                </FloatingLabel>
              </FormFloating>
              <Button type="submit" className="submitRp">
                Siguiente
              </Button>
            </Form>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default RecuperarPass;
