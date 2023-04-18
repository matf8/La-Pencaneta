import React, { useState, useEffect } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import { Cargando } from "../../../../Components/cargando/Cargando";
import { getUsuarios } from "../../../../Services/AdminRequests";
import {
  getUsuarioByCorreo,
  cambioRol,
} from "../../../../Services/AdminRequests";
import {
  FloatingLabel,
  Form,
  FormFloating,
  Button,
  Table,
} from "react-bootstrap";
import { GrAdd, GrPowerReset } from "react-icons/gr";
import { NotiBienvenida } from "../../../../Components/NotiBienvenida";
import { NotiError } from "../../../../Components/NotiError";
import { ToastContainer } from "react-toastify";
import "./ListadoUsuarios.css";

export default function ListadoUsuarios() {
  const [listado, setListado] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setCargando(true);
    getUsuarios()
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
    getAllUsers();
  };

  const handleBuscarUsuario = (e) => {
    setCargando(true);
    getUsuarioByCorreo(filtro).then((res) => {
      setListado([res.data]);
      setCargando(false);
    });
  };

  const handleCambioRol = (id) => {
    cambioRol(id, "AdminEmpresarial")
      .then((res) => {
        if (res.status === 200) {
          NotiBienvenida("Rol cambiado correctamente");
          getAllUsers();
        }
      })
      .catch((err) => {
        NotiError("Error al cambiar el rol");
      });
  };

  if (cargando) {
    return <Cargando />;
  }

  return (
    <>
      <ToastContainer />
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
                <Button variant="info" onClick={handleBuscarUsuario}>
                  Buscar
                </Button>
              </div>
              <div className="boton-buscar-admin">
                <Button variant="success" href="/altaAdmin">
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
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
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
                            <h6>{item.apellido}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.email}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.rol}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            {item.rol === 0 && item.empresa !== null ? (
                              <h6
                                className="cambio-rol"
                                onClick={() => handleCambioRol(item.id)}
                              >
                                Cambiar rol
                              </h6>
                            ) : null}
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
