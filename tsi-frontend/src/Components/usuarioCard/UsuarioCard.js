import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { IoMdOpen } from "react-icons/io";
import { getUsuarioById } from "../../Services/UsuarioRequests";
import foto from "../../Assets/avatar-f.png";
import "./UsuarioCard.css";

export const UsuarioCard = (props) => {
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fnac: "",
    rol: "",
    foto: "",
  });

  const handleShow = () => {
    setShow(!show);
  };

  const accesoPerfil = () => {
    getUsuarioById(props.userid)
      .then((res) => {
        if (res.status === 200) {
          setUsuario(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => {
        handleShow();
      });
  };

  return (
    <>
      <ToastContainer />
      <Card className="carta">
        <Card.Body className="carta-body">
          <Card.Title>{props.nombre}</Card.Title>
          <Card.Link className="cardButton" onClick={accesoPerfil}>
            <IoMdOpen />
          </Card.Link>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Perfil de {props.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="perfil-ajeno">
            <div className="seccion-perfil-ajeno">
              <img src={foto} alt="foto" className="imagen-perfil-ajeno" />
            </div>
            <div className="seccion-perfil-ajeno">
              <h6>
                {usuario.nombre} {usuario.apellido}
              </h6>
              <h6>{usuario.email}</h6>
              <h6>{usuario.rol}</h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
