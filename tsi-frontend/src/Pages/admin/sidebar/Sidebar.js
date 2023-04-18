import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { NotiError } from "../../../Components/NotiError";
import { ToastContainer } from "react-toastify";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const notificacion = () => {
    NotiError("notificacion de prueba");
  };

  return (
    <>
      <ToastContainer />
      <header className="side-menu-logo">
        <FiArrowRight size={30} onClick={() => openMenu()} />
      </header>

      <Offcanvas show={isOpen} onHide={openMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h6 className="titulo-sidebar">LA PENCANETA</h6>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <br />
          <Button onClick={notificacion}>NOTIFICACION ADMIN</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
