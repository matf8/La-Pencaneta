import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../../Components/Layout";
import { Footer } from "../../../Components/footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import "./Penca.css";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { UsuarioCard } from "../../../Components/usuarioCard/UsuarioCard";
import { getTorneo } from "../../../Services/TorneoRequests";
import {
  getPencaEmpresarial,
  getPencaPublica,
  usuariosPenca,
} from "../../../Services/PencaRequests";
import { addPenca } from "../../../Services/UsuarioRequests";
import { getEventosPenca } from "../../../Services/UsuarioRequests";
import { NotiError } from "../../../Components/NotiError";
import { inscribirsePenca, pagarPenca } from "../../../Services/PayPalRequests";
import { BiRefresh } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

function Penca() {
  const [params] = useSearchParams();
  const idCompetencia = params.get("competencia");
  const esEmpresarial = params.get("esEmpresarial");
  const pencaid = params.get("pencaid");
  const unido = params.get("unido");
  const [jornada, setJornada] = useState(null);
  const [competencia, setCompetencia] = useState([]);
  const [penca, setPenca] = useState({
    id: "",
    nombre: "",
    precioEntrada: "",
    premios: "",
    torneoId: "",
  });
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getTorneo(idCompetencia)
      .then((res) => {
        setCompetencia(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (esEmpresarial === "false") {
      getPencaPublica(pencaid)
        .then((res) => {
          setPenca(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getPencaEmpresarial(pencaid)
        .then((res) => {
          setPenca(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    usuariosPenca(pencaid)
      .then((res) => {
        const usuariosOrdenados = res.data.sort((a, b) => {
          return b.puntaje - a.puntaje;
        });
        setUsuarios(usuariosOrdenados);
      })
      .catch((err) => {
        console.log(err);
      });
    getEventosPenca(pencaid)
      .then((res) => {
        const respuesta = res.data.filter((match) => match.statusED !== 1);
        setJornada(respuesta);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  const [show, setShow] = useState(false);
  const [showPredicciones, setShowPredicciones] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowPredicciones = () => {
    setShowPredicciones(!showPredicciones);
  };

  const handleUnirme = () => {
    inscribirsePenca(penca.precioEntrada, penca.id)
      .then((res) => {
        if (res.status === 200) {
          addPenca(penca.id).then((res) => {
            if (res.status === 200) {
              pagarPenca();
            }
          });
        }
      })
      .catch((err) => {
        NotiError("Error al inscribirse en la penca");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="page-container-home-participante">
        <Sidebar />
        <Layout>
          <div className="penca-info">
            <Button
              onClick={handleShow}
              variant="dark"
              disabled={unido === "true"}
            >
              Unirme
            </Button>
            <h2>{penca.nombre}</h2>
            <h2>{competencia.nombre}</h2>
            <h2>{penca.premios}U$D</h2>
            {unido === "true" ? (
              <Button variant="dark" onClick={handleShowPredicciones}>
                mis predicciones
              </Button>
            ) : (
              <Button disabled variant="dark">
                Mis predicciones
              </Button>
            )}
          </div>
          <div className="penca-status-activity">
            <div className="penca-status">
              <div className="titulo-penca">
                {jornada !== null ? (
                  jornada.map((match) => (
                    <div className="match-jornada" key={match.idRemoto1}>
                      <div className="teams-jornadas">
                        <img
                          className="logo-jornadas"
                          src={match.equipoALogo}
                          alt="logo"
                        />
                      </div>
                      <h5 className="versus">VS</h5>
                      <div className="teams-jornadas">
                        <img
                          className="logo-jornadas"
                          src={match.equipoBLogo}
                          alt="logo"
                        />
                      </div>
                      <Button
                        variant="dark"
                        disabled={unido === "false"}
                        className="boton-predecir"
                        href={
                          "/predecir?fixture=" +
                          match.idRemoto1 +
                          "&idEvento=" +
                          match.id +
                          "&pencaId=" +
                          penca.id
                        }
                      >
                        {match.tienePreddicion ? "Cambiar" : "Predecir"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <h3>No hay partidos por el momento</h3>
                )}
              </div>
            </div>
            <div className="penca-activity">
              <div className="actividadUno">
                <div className="participantes-listado">
                  <div className="row justify-content-center usuarios">
                    {usuarios.length > 1 ? (
                      usuarios.map((usuario) =>
                        usuario.nombre !== localStorage.getItem("nombre") ? (
                          <div
                            className="columna-usuarios-penca"
                            key={usuario.id}
                          >
                            <UsuarioCard
                              userid={usuario.id}
                              nombre={usuario.nombre}
                            />
                          </div>
                        ) : null
                      )
                    ) : (
                      <h3>No hay mas usuarios en la penca</h3>
                    )}
                  </div>
                </div>
              </div>
              <div className="actividadDos">
                <ListGroup className="calificacion-penca">
                  <div className="contenido-calificacion">
                    <h3>Calificacion</h3>
                    {usuarios &&
                      usuarios.map((usuario) => (
                        <ListGroup.Item
                          key={usuario.id}
                          style={{ backgroundColor: "transparent" }}
                          className="border-0"
                        >
                          <div className="user-item">
                            <h6>
                              {usuario.ranking} - {usuario.nombre}
                            </h6>
                            <h6>{usuario.puntaje} pts</h6>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </div>
                </ListGroup>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Unirme a una penca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Unirte a esta penca cuesta {penca.precioEntrada}U$D</h6>
          <h6>
            Al pagar, deberas usar el mismo correo que esta registrado en
            lapencaneta
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            No
          </Button>
          <Button variant="danger" onClick={handleUnirme}>
            Si, unirme
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPredicciones} onHide={handleShowPredicciones}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="predicciones-header">
              {penca.nombre}
              <Button
                onClick={() => window.location.reload()}
                className="predicciones-refresh"
              >
                <BiRefresh size={30} />
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        {jornada !== null ? (
          <div className="predicciones-usuario">
            <Modal.Body>
              {jornada.map((match, index) => (
                <div className="prediccion-usuario-penca" key={index}>
                  <div className="prediccion-equipo">
                    <img
                      className="logo-jornadas"
                      src={match.equipoALogo}
                      alt="logo-local"
                    />
                    <h5>{match.prediccionA}</h5>
                  </div>
                  <h1> - </h1>
                  <div className="prediccion-equipo">
                    <h5>{match.prediccionB}</h5>
                    <img
                      className="logo-jornadas"
                      src={match.equipoBLogo}
                      alt="logo-visitante"
                    />
                  </div>
                </div>
              ))}
            </Modal.Body>
          </div>
        ) : (
          <Modal.Body>
            <h3>No hay predicciones</h3>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="danger" onClick={handleShowPredicciones}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default Penca;
