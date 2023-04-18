import React, { useState, useEffect } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import { Cargando } from "../../../../Components/cargando/Cargando";
import {
  FloatingLabel,
  Form,
  FormFloating,
  Button,
  Table,
} from "react-bootstrap";
import { GrAdd, GrPowerReset } from "react-icons/gr";
import "./ListadoPencas.css";
import { getPencas, getPenca } from "../../../../Services/PencaRequests";

export default function ListadoUsuarios() {
  const [listado, setListado] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getAllPencas();
  }, []);

  const getAllPencas = () => {
    setCargando(true);
    getPencas()
      .then((res) => {
        setListado(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangefiltro = (e) => {
    setFiltro(e.target.value);
  };

  const resetBusqueda = () => {
    getAllPencas();
  };

  const handleBuscarPenca = (e) => {
    setCargando(true);
    getPenca(filtro).then((res) => {
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
              <div className="boton-buscar-admin">
                <Button onClick={handleBuscarPenca} variant="info">
                  Buscar
                </Button>
              </div>
              <div className="boton-buscar-admin">
                <Button variant="success" href="/altaPenca">
                  <GrAdd />
                </Button>
              </div>
              <div className="boton-buscar-admin">
                <Button onClick={resetBusqueda} variant="success">
                  <GrPowerReset />
                </Button>
              </div>
            </div>
            <div className="contenido-listado-admin">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Penca</th>
                    <th>Creador</th>
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
                            <h6>{item.creadoPorId}</h6>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1>No hay usuarios en el sistema</h1>
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
