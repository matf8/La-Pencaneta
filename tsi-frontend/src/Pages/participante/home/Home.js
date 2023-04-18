import React, { useState, useEffect } from "react";
import { Layout } from "../../../Components/Layout";
import { Footer } from "../../../Components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import { PencaCard } from "../../../Components/pencaCard/PencaCard";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import imagen from "../../../Assets/imagen-principal-alt.png";
import {
  getPencasEmpresariales,
  getPencasPublicas,
} from "../../../Services/UsuarioRequests";
import "./Home.css";

function Home() {
  const [pencasPublicas, setPencasPublicas] = useState([]);
  const [pencasEmpresariales, setPencasEmpresariales] = useState([]);

  useEffect(() => {
    if (pencasPublicas.length === 0) {
      getPencasPublicas()
        .then((res) => {
          setPencasPublicas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (pencasEmpresariales.length === 0) {
      getPencasEmpresariales()
        .then((res) => {
          setPencasEmpresariales(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-container-home-participante">
        <Sidebar />
        <Layout>
          <div className="home-participante">
            <div>
              <div className="espacio-imagen-participante">
                <img
                  className="imagen-participante"
                  src={imagen}
                  alt="imagen"
                />
              </div>
            </div>
            <div>
              <h1 className="tituloUno">Pencas Empresariales</h1>
              <div className="pencas">
                <div>
                  <Button
                    variant="light"
                    hidden={pencasEmpresariales.length < 4}
                  >
                    <BsFillArrowLeftCircleFill />
                  </Button>
                </div>
                {pencasEmpresariales.length !== 0 ? (
                  pencasEmpresariales.map((penca) => (
                    <div>
                      <PencaCard
                        key={penca.id}
                        id={penca.id}
                        nombre={penca.nombre}
                        precioEntrada={penca.costoEntrada}
                        premio={penca.premios}
                        competencia={penca.torneoId}
                        esEmpresarial={true}
                        pencaid={penca.id}
                        capacidad={penca.capacidad}
                      />
                    </div>
                  ))
                ) : (
                  <div className="out-of-service">
                    <h2>No hay pencas empresariales</h2>
                    <MdHomeRepairService size={120} />
                  </div>
                )}
                <div>
                  <Button
                    variant="light"
                    hidden={pencasEmpresariales.length < 4}
                  >
                    <BsFillArrowRightCircleFill />
                  </Button>
                </div>
              </div>
              <h1 className="tituloDos">Pencas Publicas</h1>
              <div className="pencas">
                {pencasPublicas.length !== 0 ? (
                  pencasPublicas.map((penca) => (
                    <div>
                      <PencaCard
                        key={penca.id}
                        id={penca.id}
                        nombre={penca.nombre}
                        competencia={penca.torneoId}
                        precioEntrada={penca.precioEntrada}
                        esEmpresarial={false}
                        premio={penca.premios}
                        pencaid={penca.id}
                        capacidad={penca.capacidad}
                      />
                    </div>
                  ))
                ) : (
                  <div className="out-of-service">
                    <h2>No hay pencas publicas</h2>
                    <MdHomeRepairService size={120} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default Home;
