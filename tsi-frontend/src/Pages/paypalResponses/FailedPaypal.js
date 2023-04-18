import React from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../Components/Layout";
import { Footer } from "../../Components/footer/Footer";
import { Button } from "react-bootstrap";
import { TiHome } from "react-icons/ti";
import sadMedel from "../../Assets/sad-medel.png";
import "./PaypalResponses.css";

export default function FailedPayPal() {
  const [searchParams] = useSearchParams();
  var error = searchParams.get("motivo");
  error = error.replace("_", " ");
  return (
    <>
      <div className="page-container-result-paypal">
        <Layout>
          <div className="contenido-respuesta">
            <Button variant="dark" className="home-button-paypal" href="/">
              <TiHome size={30} />
            </Button>
            <div>
              <h1>Hubo un error con la compra: {error}</h1>
            </div>
            <div className="contenedor-imagen-paypal">
              <img src={sadMedel} className="imagen-paypal" alt="medel" />
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}
