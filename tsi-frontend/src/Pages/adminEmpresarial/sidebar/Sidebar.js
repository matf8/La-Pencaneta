import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "./Sidebar.css";

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToastContainer />
      <header className="side-menu-logo-adminEmpresarial">
        <FiArrowRight
          className="flechita-adminEmpresarial"
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
          <div className="accion-sidebar-adminEmpresarial">
            <div>
              <h6>Quieres crear una nueva penca?</h6>
            </div>
            <div>
              <Button
                variant="warning"
                href={"/altaPenca?empresa=" + props.empresa}
              >
                Crear penca
              </Button>
            </div>
          </div>
          <div className="accion-sidebar-adminEmpresarial">
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
