import React, { useEffect, useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { Button, FormFloating, FloatingLabel, Form } from "react-bootstrap";
import { PencaListadoCard } from "../../../../Components/pencaListadoCard/PencaListadoCard";
import { GiMagnifyingGlass } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import {
  getPencasLibres,
  getPencaLibre,
} from "../../../../Services/UsuarioRequests";
import "./ListadoPencas.css";

function ListadoPencas() {
  const [pencas, setPencas] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getAllPencas();
  }, []);

  const getAllPencas = () => {
    getPencasLibres().then((res) => {
      setPencas(res.data);
    });
  };

  const handleChangeFiltro = (e) => {
    setFiltro(e.target.value);
  };

  const handleSubmit = () => {
    getPencaLibre(filtro).then((res) => {
      setPencas(res.data);
    });
  };

  const handleReset = () => {
    getAllPencas();
  };

  return (
    <>
      <Sidebar />
      <div className="container-listado-pencas-participante">
        <Layout>
          <div className="contenido-listado">
            <div className="filtros">
              <div className="top-filtros">
                <FormFloating className="busqueda-penca-participante">
                  <FloatingLabel className="campo-busqueda" label="Nombre">
                    <Form.Control
                      onChange={handleChangeFiltro}
                      type="text"
                      required
                    />
                  </FloatingLabel>
                  <Button
                    onClick={handleSubmit}
                    className="boton-busqueda-penca-participante"
                    variant="danger"
                  >
                    <GiMagnifyingGlass size={30} />
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="boton-busqueda-penca-participante"
                    variant="success"
                  >
                    <GrPowerReset size={30} />
                  </Button>
                </FormFloating>
              </div>
            </div>
            <div className="listado">
              <div className="elementos-listado">
                <div className="row pencas-listado">
                  {pencas.length !== 0 ? (
                    pencas.map((penca) => (
                      <div className="columna-listado" key={penca.id}>
                        <PencaListadoCard
                          id={penca.id}
                          nombre={penca.nombre}
                          esEmpresarial={penca.clave !== undefined}
                          competencia={penca.torneoId}
                          premio={penca.premios}
                          pencaid={penca.id}
                        />
                      </div>
                    ))
                  ) : (
                    <h1>no hay pencas disponibles</h1>
                  )}
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

export default ListadoPencas;
