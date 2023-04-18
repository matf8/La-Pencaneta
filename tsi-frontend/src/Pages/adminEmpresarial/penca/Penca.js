import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../../Components/Layout";
import { Footer } from "../../../Components/footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import "./Penca.css";
import {
  Button,
  ListGroup,
  Modal,
  FloatingLabel,
  FormFloating,
} from "react-bootstrap";
import { UsuarioCard } from "../../../Components/usuarioCard/UsuarioCard";
import { getTorneo } from "../../../Services/TorneoRequests";
import {
  getPencaEmpresarial,
  getPencaPublica,
  usuariosPenca,
  modificarPencaEmpresarial,
} from "../../../Services/PencaRequests";
import { getEventosPenca } from "../../../Services/UsuarioRequests";

import { AiFillMessage } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import { BiPencil, BiRefresh } from "react-icons/bi";
import { CgEnter } from "react-icons/cg";
import { SiBetfair } from "react-icons/si";
import {
  GiCrossedAxes,
  GiSoccerBall,
  GiKey,
  GiQueenCrown,
} from "react-icons/gi";
import { MdOutlineResetTv } from "react-icons/md";
import { RiFontSize, RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbIcons } from "react-icons/tb";
import { NotiError } from "../../../Components/NotiError";
import { ToastContainer } from "react-toastify";

function Penca() {
  const rol = localStorage.getItem("rol");
  const id = localStorage.getItem("id");
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
    clave: "",
    precioEntrada: "",
    premios: "",
    torneoId: "",
    capacidad: "",
    comision: "",
    creadoPorId: "",
    theme: "",
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
    if (esEmpresarial === "true") {
      getPencaEmpresarial(pencaid)
        .then((res) => {
          setPenca(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getPencaPublica(pencaid)
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
        setUsuarios(res.data);
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

  const [showPredicciones, setShowPredicciones] = useState(false);
  const [showMensajes, setShowMensajes] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showClave, setShowClave] = useState(false);

  const handleShowPredicciones = () => {
    setShowPredicciones(!showPredicciones);
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleShowClave = () => {
    setShowClave(!showClave);
  };

  const handleShowMensajes = () => {
    setShowMensajes(!showMensajes);
  };

  const handleChangeMensaje = (e) => {
    setMensaje(e.target.value);
  };

  const handleSendMensaje = () => {
    alert("enviar mensaje: " + mensaje + "\na la penca: " + penca.nombre);
  };

  const handleChangeThemeUno = (e) => {
    e.persist();
    if (penca.theme !== 1) {
      modificarPencaEmpresarial(penca, 1)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          NotiError("Error al cambiar el tema");
        });
    } else {
      NotiError("El tema seleccionado ya está activo");
    }
  };

  const handleChangeThemeDos = (e) => {
    e.persist();
    if (penca.theme !== 2) {
      modificarPencaEmpresarial(penca, 2)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          NotiError("Error al cambiar el tema");
        });
    } else {
      NotiError("El tema seleccionado ya está activo");
    }
  };

  const handleChangeThemeTres = (e) => {
    e.persist();
    if (penca.theme !== 3) {
      modificarPencaEmpresarial(penca, 3)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          NotiError("Error al cambiar el tema");
        });
    } else {
      NotiError("El tema seleccionado ya está activo");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page-container-home-adminEmpresarial">
        <Sidebar />
        <Layout>
          <div className="penca-info">
            <Button onClick={handleShowMensajes} variant="dark">
              <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                {penca.theme === 3 ? <AiFillMessage size={20} /> : "Mensajes"}
              </h6>
            </Button>
            <h2 className={penca.theme === 2 ? "themeDos" : ""}>
              {penca.nombre}
            </h2>
            {id === penca.creadoPorId ? (
              <Button onClick={handleShowClave} variant="dark">
                {penca.theme !== 3 ? (
                  <h6 className={penca.theme === 2 ? "themeDos" : ""}>clave</h6>
                ) : (
                  <GiKey size={20} />
                )}
              </Button>
            ) : null}
            <h2 className={penca.theme === 2 ? "themeDos" : ""}>
              {competencia.nombre}
            </h2>
            {penca.theme !== 3 ? (
              <h2 className={penca.theme === 2 ? "themeDos" : ""}>
                {penca.premios}U$D
              </h2>
            ) : (
              <div className="premio-penca">
                <h2>{penca.premios}</h2>
                <div className="premio-icono">
                  <RiMoneyDollarCircleFill size={40} />
                </div>
              </div>
            )}
            {rol === "AdminEmpresarial" && id === penca.creadoPorId ? (
              <div>
                <Button
                  className="theme-button"
                  onClick={handleChangeThemeUno}
                  variant="dark"
                >
                  <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                    <MdOutlineResetTv size={20} />
                  </h6>
                </Button>
                <Button
                  className="theme-button"
                  onClick={handleChangeThemeDos}
                  variant="dark"
                >
                  <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                    <RiFontSize size={20} />
                  </h6>
                </Button>
                <Button
                  variant="dark"
                  className="theme-button"
                  onClick={handleChangeThemeTres}
                >
                  <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                    <TbIcons size={20} />
                  </h6>
                </Button>
                <Button
                  className="theme-button"
                  onClick={handleShowInfo}
                  variant="dark"
                >
                  <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                    <HiInformationCircle size={20} />
                  </h6>
                </Button>
              </div>
            ) : null}
            {unido === "true" ? (
              <Button onClick={handleShowPredicciones} variant="dark">
                <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                  {penca.theme === 3 ? (
                    <SiBetfair size={20} />
                  ) : (
                    "Mis predicciones"
                  )}
                </h6>
              </Button>
            ) : (
              <Button disabled variant="dark">
                <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                  {penca.theme === 3 ? (
                    <SiBetfair size={20} />
                  ) : (
                    "Mis predicciones"
                  )}
                </h6>
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
                      <h5
                        className={
                          penca.theme === 2
                            ? "versusAlt"
                            : penca.theme === 3
                            ? "versusAlt"
                            : "versus"
                        }
                      >
                        {penca.theme === 3 ? <GiCrossedAxes size={20} /> : "VS"}
                      </h5>
                      <div className="teams-jornadas">
                        <img
                          className="logo-jornadas"
                          src={match.equipoBLogo}
                          alt="logo"
                        />
                      </div>
                      <Button
                        variant="dark"
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
                        {match.tienePreddicion ? (
                          penca.theme === 1 ? (
                            <h6>modificar</h6>
                          ) : penca.theme === 2 ? (
                            <h6 className="themeDos">modificar</h6>
                          ) : penca.theme === 3 ? (
                            <BiPencil />
                          ) : null
                        ) : penca.theme === 1 ? (
                          <h6>predecir</h6>
                        ) : penca.theme === 2 ? (
                          <h6 className="themeDos">predecir</h6>
                        ) : penca.theme === 3 ? (
                          <CgEnter />
                        ) : null}
                      </Button>
                    </div>
                  ))
                ) : (
                  <h3 className={penca.theme === 2 ? "themeDos" : ""}>
                    No hay partidos por el momento
                  </h3>
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
                            <UsuarioCard nombre={usuario.nombre} />
                          </div>
                        ) : null
                      )
                    ) : (
                      <h3 className={penca.theme === 2 ? "themeDos" : ""}>
                        No hay mas usuarios en la penca
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              <div className="actividadDos">
                <ListGroup className="calificacion-penca">
                  <div className="contenido-calificacion">
                    <h3 className={penca.theme === 2 ? "themeDos" : ""}>
                      Calificación
                    </h3>
                    {usuarios &&
                      usuarios.map((usuario) => (
                        <ListGroup.Item
                          key={usuario.id}
                          style={{ backgroundColor: "transparent" }}
                          className="border-0"
                        >
                          <div className="user-item">
                            <h6 className={penca.theme === 2 ? "themeDos" : ""}>
                              {usuario.ranking} - {usuario.nombre}
                            </h6>
                            {penca.theme !== 3 ? (
                              <h6
                                className={penca.theme === 2 ? "themeDos" : ""}
                              >
                                {usuario.puntaje} pts
                              </h6>
                            ) : (
                              <div className="puntaje-usuario">
                                <h6>{usuario.puntaje}</h6>
                                <div className="pelota-puntaje">
                                  {usuario.ranking === 1 ? (
                                    <GiQueenCrown size={20} />
                                  ) : (
                                    <GiSoccerBall size={20} />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))}
                    <ListGroup.Item
                      style={{ backgroundColor: "transparent" }}
                      className="border-0"
                    ></ListGroup.Item>
                  </div>
                </ListGroup>
              </div>
            </div>
          </div>
        </Layout>
      </div>
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
          <div className="predicciones-usuario-empresarial">
            <Modal.Body>
              {jornada.map((match, index) => (
                <div
                  className="prediccion-usuario-penca-empresarial"
                  key={index}
                >
                  <div className="prediccion-equipo-empresarial">
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
      <Modal show={showInfo} onHide={handleShowInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Temas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="informacion-temas-penca-empresarial">
            <div>
              <h4>Tema 1</h4>
              <h6>Este tema es igual al tema standard del participante</h6>
            </div>
            <br />
            <div>
              <h4>Tema 2</h4>
              <h6>Este tema cambia la fuente de las palabras de la penca</h6>
            </div>
            <br />
            <div>
              <h4>Tema 3</h4>
              <h6>
                Este tema le agrega varios iconos a la penca reemplazando las
                palabras
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShowInfo}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMensajes} onHide={handleShowMensajes}>
        <Modal.Header closeButton>
          <Modal.Title>Mensajes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFloating>
            <FloatingLabel label="Contenido">
              <textarea
                onChange={handleChangeMensaje}
                name="contenido"
                style={{ height: "150px" }}
                className="form-control"
                required
              />
            </FloatingLabel>
          </FormFloating>
          <div className="boton-enviar-mensaje">
            <Button onClick={handleSendMensaje}>Enviar</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShowMensajes}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showClave} onHide={handleShowClave}>
        <Modal.Header closeButton>
          <Modal.Title>Clave de {penca.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>La clave de esta penca es: {penca.clave}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShowClave}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default Penca;
