import React, { useEffect, useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { getUsuarios } from "../../../../Services/UsuarioRequests";
import { Dropdown, Button } from "react-bootstrap";
import "./AltaAdmin.css";

export default function AltaAdmin() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsuarios().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleChange = (e) => {
    e.persist();
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    window.location.replace("/usuarios");
  };

  return (
    <>
      <Sidebar />
      <div className="page-container-alta-admin">
        <Layout>
          <div className="contenido-alta-admin">
            <div className="alta-admin-form">
              <div className="lugar-titulo-alta-admin">
                <h3>Alta de admin</h3>
              </div>
              <div className="alta-admin-usuarios">
                <Dropdown
                  as="select"
                  defaultValue="default"
                  className="dropdown-alta-admin"
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Usuarios
                  </option>
                  {users.map(
                    (user) =>
                      user.rol === "Participante" && (
                        <option key={user.id} value={user.id}>
                          {user.email}
                        </option>
                      )
                  )}
                </Dropdown>
              </div>
              <div className="boton-alta-admin">
                <Button type="submit" onClick={handleSubmit} variant="success">
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </Layout>
        <Footer />
      </div>
    </>
  );
}
