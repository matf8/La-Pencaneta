import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToastContainer />
      <header className="side-menu-logo-participante">
        <FiArrowRight
          className="flechita-participante"
          size={30}
          onClick={() => openMenu()}
        />
      </header>

      <Offcanvas show={isOpen} onHide={openMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h5 className="titulo-sidebar">LA PENCANETA</h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="accion-sidebar-participante">
            <div>
              <h6>Quieres crear una nueva penca?</h6>
            </div>
            <div>
              <Button variant="warning" href="/altaPenca">
                Crear penca
              </Button>
            </div>
          </div>
          <div className="accion-sidebar-participante">
            <div>
              <h6>Quieres listar todas las pencas?</h6>
            </div>
            <div>
              <Button variant="warning" href="/listadoPencas">
                Ver pencas
              </Button>
            </div>
          </div>
          <div className="accion-sidebar-participante">
            <div>
              <h6>Inscribirme a una penca empresarial</h6>
            </div>
            <div>
              <Button variant="warning" href="/inscribirmeEmpresarial">
                Inscribirme
              </Button>
            </div>
          </div>
          <div className="accion-sidebar-participante">
            <div>
              <h6>Quieres ver los partidos en vivo?</h6>
            </div>
            <div>
              <Button variant="warning" href="/resultados">
                Resultados
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
