import React, { useState } from "react";
import { Layout } from "../../Components/Layout";
import { Footer } from "../../Components/footer/Footer";
import { Header } from "../../Components/header/Header";
import logo from "../../Assets/logo-pencaneta.png";
import "./Login.css";
import { login, loginFacebook } from "../../Services/LoginRequests";
import { FormFloating, FloatingLabel, Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { NotiError } from "../../Components/NotiError";
import { NotiBienvenida } from "../../Components/NotiBienvenida";
import { Cargando } from "../../Components/cargando/Cargando";
import FacebookLogin from "react-facebook-login";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setCredentials((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(credentials)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("nombre", res.data.nombre);
          localStorage.setItem("correo", res.data.email);
          localStorage.setItem("rol", res.data.rol);
          localStorage.setItem("id", res.data.id);
          window.location.replace("/");
        } else {
          NotiError("hubo un error, intenta nuevamente");
        }
      })
      .catch((err) => {
        setLoading(false);
        NotiError("hubo un error, intenta nuevamente");
      });
  };

  const responseFacebook = (response) => {
    setLoading(true);
    loginFacebook(response).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        NotiBienvenida("Bienvenido a LaPencaneta");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("nombre", res.data.nombre);
        localStorage.setItem("correo", res.data.email);
        localStorage.setItem("rol", res.data.rol);
        localStorage.setItem("id", res.data.id);
        setTimeout(() => {
          window.location.replace("/");
        }, [3000]);
      } else {
        NotiError("hubo un error inesperado");
      }
    });
  };

  if (loading) {
    return <Cargando />;
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="page-container">
        <Layout>
          <div className="contentLogin">
            <div className="logo">
              <img className="logo-login" src={logo} alt="logo" />
            </div>
            <Form className="inputsLogin" onSubmit={handleSubmit}>
              <h2 className="loginText">Ingrese con su correo</h2>
              <FormFloating className="loginInput">
                <FloatingLabel label="Correo*">
                  <Form.Control
                    onChange={handleChange}
                    name="email"
                    type="text"
                    required
                  />
                </FloatingLabel>
              </FormFloating>
              <FormFloating className="loginInput">
                <FloatingLabel label="Password*">
                  <Form.Control
                    onChange={handleChange}
                    name="password"
                    type="password"
                    required
                  />
                </FloatingLabel>
              </FormFloating>
              <p>
                <a href="/recuperarPassword" className="link">
                  olvidaste tu contraseña?
                </a>
              </p>
              <div className="botones-submit">
                <FacebookLogin
                  size="small"
                  appId={process.env.REACT_APP_FACEBOOK_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
                <Button type="submit" className="submitLogin">
                  Ingresar
                </Button>
              </div>
            </Form>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}
