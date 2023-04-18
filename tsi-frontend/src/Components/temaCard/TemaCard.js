import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { NotiError } from "../NotiError";
import { ToastContainer } from "react-toastify";
import { getId } from "../../Services/LoginRequests";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { deleteTema } from "../../Services/ForoRequests";
import { getUsuarioById } from "../../Services/UsuarioRequests";
import "./TemaCard.css";

export const TemaCard = (props) => {
  const user = parseInt(getId(), 10);

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    getUsuarioById(props.user)
      .then((res) => {
        setNombre(res.data.nombre);
      })
      .catch((err) => {
        NotiError("No se pudo obtener el nombre del usuario");
      });
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const eliminarTema = () => {
    deleteTema(props.temaid)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        NotiError("No se pudo eliminar el tema");
      });
  };

  return (
    <>
      <ToastContainer />
      <Card className="carta-tema">
        <Card.Body className="carta-tema-body">
          <div className="header-tema-card">
            <Card.Title>
              <div className="header-tema-card">
                <h5 className="titulo-tema">{props.titulo}</h5>
                <h6>por {nombre}</h6>
              </div>
            </Card.Title>
            <div className="acciones-tema-card">
              <Button onClick={handleOpen} disabled={user !== props.user}>
                <BsTrashFill size={20} />
              </Button>
              <Button
                href={"/editartema?temaid=" + props.temaid}
                disabled={user !== props.user}
              >
                <AiFillEdit size={20} />
              </Button>
            </div>
          </div>
          <Card.Text>
            <div className="contenido-tema">
              <h6>{props.contenido}</h6>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal show={open} onHide={handleOpen}>
        <Modal.Header closeButton>
          <Modal.Title>{props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se eliminará el tema</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={eliminarTema}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
