import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../Components/Layout";
import { Footer } from "../../../../../Components/footer/Footer";
import { useSearchParams } from "react-router-dom";
import { getEventosTorneo } from "../../../../../Services/TorneoRequests";
import {
  Button,
  Table,
  Modal,
  Form,
  FormFloating,
  FloatingLabel,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { cargarResultadoEvento } from "../../../../../Services/AdminRequests";
import "./TerminarEventos.css";

export default function TerminarEventos() {
  const [searchParams] = useSearchParams();
  const idTorneo = searchParams.get("torneo");
  const nombreTorneo = searchParams.get("nombreTorneo");
  const [eventos, setEventos] = useState([]);
  const [show, setShow] = useState(false);
  const [evento, setEvento] = useState({
    eventoDeportivoId: "",
    scoreEquipoA: "",
    scoreEquipoB: "",
  });

  useEffect(() => {
    getEventosTorneo(idTorneo).then((res) => {
      setEventos(res.data);
    });
    // eslint-disable-next-line
  }, []);

  const handleShow = () => {
    setShow(!show);
  };

  const handleChangeEvento = (e) => {
    setEvento((evento) => ({
      ...evento,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEvento = () => {
    cargarResultadoEvento(evento)
      .then((res) => {
        if (res.status === 200) {
          setShow(false);
          window.location.reload();
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <ToastContainer />
      <div className="page-container-terminar-eventos">
        <Layout>
          <div className="contenido-terminar-eventos">
            <div className="cabezal-terminar-eventos">
              <h1>{nombreTorneo}</h1>
            </div>
            <div className="cuerpo-terminar-eventos">
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
                            <h6>{evento.id}</h6>
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
                              onClick={handleShow}
                            >
                              {evento.scoreEquipoA === null ||
                              evento.scoreEquipoB === null
                                ? "Terminar"
                                : "Modificar"}
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
          </div>
        </Layout>
      </div>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Terminar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="terminar-evento-form">
            <FormFloating>
              <FloatingLabel className="terminar-evento-input" label="id">
                <Form.Control
                  onChange={handleChangeEvento}
                  name="eventoDeportivoId"
                  placeholder={evento.id}
                  required
                />
              </FloatingLabel>
            </FormFloating>
            <FormFloating>
              <FloatingLabel className="terminar-evento-input" label="local">
                <Form.Control
                  onChange={handleChangeEvento}
                  name="scoreEquipoA"
                  placeholder={
                    evento.scoreEquipoA !== null ? evento.scoreEquipoA : ""
                  }
                  required
                />
              </FloatingLabel>
            </FormFloating>
            <FormFloating>
              <FloatingLabel
                className="terminar-evento-input"
                label="visitante"
              >
                <Form.Control
                  onChange={handleChangeEvento}
                  name="scoreEquipoB"
                  placeholder={
                    evento.scoreEquipoB !== null ? evento.scoreEquipoA : ""
                  }
                  required
                />
              </FloatingLabel>
            </FormFloating>
          </div>
          <div className="boton-submit-resultado-evento">
            <Button onClick={handleSubmitEvento}>Enviar</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShow}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}
