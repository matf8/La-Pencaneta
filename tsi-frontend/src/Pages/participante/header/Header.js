import { Navbar, Nav } from "react-bootstrap";
import { clearState } from "../../../Services/LoginRequests";
import { RiAndroidLine } from "react-icons/ri";
import "./Header.css";

export const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="page-head container-fluid">
        <Navbar.Brand href="/">
          <h6 className="titulo-header-participante">La Pencaneta</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/foro">
                <h6>
                  <a
                    href="https://drive.google.com/uc?id=13NNYnQld3WeAPrOtNEdQCRrAcYFABxJ6&export=download&confirm=t"
                    className="androidLogo"
                  >
                    <RiAndroidLine size={25} />
                  </a>
                </h6>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/foro">
                <h5>Foro</h5>
              </Nav.Link>
            </Nav.Item>
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
