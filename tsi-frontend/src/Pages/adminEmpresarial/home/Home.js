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
import { getPencasEmpresariales } from "../../../Services/UsuarioRequests";
import { getUsuarios } from "../../../Services/AdminRequests";
import "./Home.css";

function Home() {
  const userid = localStorage.getItem("id");
  const [pencasEmpresariales, setPencasEmpresariales] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    fnac: "",
    rol: "",
    foto: "",
  });

  useEffect(() => {
    if (pencasEmpresariales.length === 0) {
      getPencasEmpresariales()
        .then((res) => {
          setPencasEmpresariales(res.data);
        })
        .catch((err) => {});
    }
    getUsuarios().then((res) => {
      const user = res.data.find((u) => u.id === parseInt(userid));
      setUsuario(user);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="page-container-home-adminEmpresarial">
        <Sidebar empresa={usuario.empresa !== null ? usuario.empresa : ""} />
        <Layout>
          <div className="home-adminEmpresarial">
            <div>
              <div className="imagen-adminEmpresarial">
                <img src={imagen} alt="imagen" />
              </div>
            </div>
            <div>
              <h1 className="titulo">Pencas Empresariales</h1>
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
                        esCreador={
                          parseInt(penca.creadoPorId, 10) ===
                          parseInt(userid, 10)
                        }
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
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default Home;
