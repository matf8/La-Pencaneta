import { Navbar, Nav } from "react-bootstrap";
import { clearState } from "../../../Services/LoginRequests";
import "./Header.css";

export const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="page-head container-fluid">
        <Navbar.Brand href="/">
          <h6 className="titulo-header-admin">La Pencaneta</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/perfil">
                <h5>Perfil</h5>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  clearState();
                }}
              >
                <h5>Cerrar sesión</h5>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
