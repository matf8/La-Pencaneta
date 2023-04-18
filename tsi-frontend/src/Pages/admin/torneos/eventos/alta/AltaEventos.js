import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../Components/Layout";
import { Footer } from "../../../../../Components/footer/Footer";
import { useSearchParams } from "react-router-dom";
import {
  getEventosAPITorneo,
  addEventosTorneo,
} from "../../../../../Services/TorneoRequests";
import { Button, Table, Modal } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import { NotiError } from "../../../../../Components/NotiError";
import { NotiBienvenida } from "../../../../../Components/NotiBienvenida";
import { ToastContainer } from "react-toastify";
import "./AltaEventos.css";

export default function AltaEventos() {
  const [searchParams] = useSearchParams();
  const idTorneo = searchParams.get("torneo");
  const nombreTorneo = searchParams.get("nombreTorneo");
  const [eventos, setEventos] = useState([]);
  const [nuevosEventos, setNuevosEventos] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (idTorneo === "1") {
      //el mundial y nada mas que el mundial
      getEventosAPITorneo().then((res) => {
        setEventos(res.data);
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleShow = () => {
    setShow(!show);
  };

  const handleAgregarEvento = (id) => {
    if (nuevosEventos.find((evento) => evento === id) === undefined) {
      NotiBienvenida("Evento agregado correctamente");
      setNuevosEventos([...nuevosEventos, id]);
    } else {
      NotiError("El evento ya esta agregado");
    }
  };

  const handleQuitarEvento = (id) => {
    if (nuevosEventos.find((evento) => evento === id) !== undefined) {
      NotiBienvenida("Evento quitado correctamente");
      setNuevosEventos(nuevosEventos.filter((evento) => evento !== id));
    } else {
      NotiError("El evento no esta agregado");
    }
  };

  const handleSubmit = () => {
    if (nuevosEventos.length > 0) {
      addEventosTorneo(idTorneo, nuevosEventos)
        .then((res) => {
          if (res.status === 200) {
            NotiBienvenida("Eventos agregados correctamente");
            setNuevosEventos([]);
          }
        })
        .catch((err) => {
          NotiError("Error al agregar los eventos");
        });
    } else {
      NotiError("No se agregaron eventos");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page-container-alta-eventos">
        <Layout>
          <div className="contenido-alta-eventos">
            <div className="cabezal-alta-eventos">
              <h1>{nombreTorneo}</h1>
              <Button
                className="boton-ver-eventos"
                onClick={handleShow}
                variant="dark"
              >
                Ver eventos
              </Button>
            </div>
            <div className="cuerpo-alta-eventos">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Local</th>
                    <th>Visitante</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.length > 0 ? (
                    eventos.map((evento, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fila-tabla">
                            <h6>{evento.idRemoto1}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{evento.equipoA}</h6>
                            <img
                              className="logo-equipos"
                              src={evento.equipoALogo}
                              alt="escudo"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{evento.equipoB}</h6>
                            <img
                              className="logo-equipos"
                              src={evento.equipoBLogo}
                              alt="escudo"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6
                              className="evento-acciones"
                              onClick={() =>
                                handleAgregarEvento(evento.idRemoto1)
                              }
                            >
                              <MdAdd size={30} />
                            </h6>
                            <h6
                              className="evento-acciones"
                              onClick={() =>
                                handleQuitarEvento(evento.idRemoto1)
                              }
                            >
                              <MdAdd
                                style={{ transform: "rotate(45deg)" }}
                                size={30}
                              />
                            </h6>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>
                      <h1>no hay eventos</h1>
                    </div>
                  )}
                </tbody>
              </Table>
            </div>
            <br />
            <Button onClick={handleSubmit} variant="dark">
              Agregar
            </Button>
          </div>
        </Layout>
      </div>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Eventos agregados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {nuevosEventos.length > 0 ? (
            nuevosEventos.map((evento, index) => (
              <div key={index}>
                <h6>{evento}</h6>
              </div>
            ))
          ) : (
            <div>
              <h1>no hay eventos</h1>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShow}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}
