import React, { useState, useEffect } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import { Cargando } from "../../../../Components/cargando/Cargando";
import { getTorneos } from "../../../../Services/TorneoRequests";
import { getTorneoByNombre } from "../../../../Services/TorneoRequests";
import {
  FloatingLabel,
  Form,
  FormFloating,
  Button,
  Table,
} from "react-bootstrap";
import { GrAdd, GrPowerReset } from "react-icons/gr";
import "./ListadoTorneos.css";

export default function ListadoEmpresas() {
  const [listado, setListado] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getAllTorneos();
  }, []);

  const getAllTorneos = () => {
    setCargando(true);
    getTorneos()
      .then((res) => {
        setListado(res.data);
        setCargando(false);
      })
      .catch((err) => {});
  };

  const handleChangefiltro = (e) => {
    setFiltro(e.target.value);
  };

  const resetBusqueda = () => {
    getAllTorneos();
  };

  const handleBuscarTorneo = (e) => {
    setCargando(true);
    getTorneoByNombre(filtro).then((res) => {
      setListado([res.data]);
      setCargando(false);
    });
  };

  if (cargando) {
    return <Cargando />;
  }

  return (
    <>
      <div className="page-container-listado">
        <Layout>
          <div className="listado-admin">
            <div className="filtro-listado-admin">
              <FormFloating className="buscar-admin">
                <FloatingLabel className="texto-admin" label="Correo">
                  <Form.Control
                    onChange={handleChangefiltro}
                    type="text"
                    required
                  />
                </FloatingLabel>
              </FormFloating>
              <div className="boton-buscar-admin" onClick={handleBuscarTorneo}>
                <Button variant="info">Buscar</Button>
              </div>
              <div className="boton-buscar-admin">
                <Button variant="success" href="/altaTorneo">
                  <GrAdd />
                </Button>
              </div>
              <div className="boton-buscar-admin">
                <Button variant="success" onClick={resetBusqueda}>
                  <GrPowerReset />
                </Button>
              </div>
            </div>
            <div className="contenido-listado-admin">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Agregar eventos</th>
                    <th>Terminar evento</th>
                  </tr>
                </thead>
                <tbody>
                  {listado ? (
                    listado.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.id}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.nombre}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <a
                              style={{ color: "orange" }}
                              href={
                                "/altaEventos?torneo=" +
                                item.id +
                                "&nombreTorneo=" +
                                item.nombre
                              }
                            >
                              administrar
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <a
                              style={{ color: "orange" }}
                              href={
                                "/terminarEventos?torneo=" +
                                item.id +
                                "&nombreTorneo=" +
                                item.nombre
                              }
                              className="terminar-evento"
                            >
                              administrar
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1>No hay empresas en el sistema</h1>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}
