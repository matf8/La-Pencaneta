import React from "react";
import { Layout } from "../../Components/Layout";
import { Footer } from "../../Components/footer/Footer";
import { Button } from "react-bootstrap";
import { TiHome } from "react-icons/ti";
import cacha from "../../Assets/cacha.png";
import "./PaypalResponses.css";

export default function SuccessPayPal() {
  return (
    <>
      <div className="page-container-result-paypal">
        <Layout>
          <div className="contenido-respuesta">
            <Button variant="dark" className="home-button-paypal" href="/">
              <TiHome size={30} />
            </Button>
            <div>
              <h1>Gracias por tu compra</h1>
            </div>
            <div className="contenedor-imagen-paypal">
              <img src={cacha} className="imagen-paypal" alt="cacha" />
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}
