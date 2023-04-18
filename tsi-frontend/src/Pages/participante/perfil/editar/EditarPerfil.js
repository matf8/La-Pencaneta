import React, { useEffect, useState } from "react";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import foto from "../../../../Assets/avatar-m.png";
import Sidebar from "../../sidebar/Sidebar";
import { getUsuario, editarPerfil } from "../../../../Services/UsuarioRequests";
import { Form, FormFloating, FloatingLabel, Button } from "react-bootstrap";
import "./EditarPerfil.css";
import { NotiBienvenida } from "../../../../Components/NotiBienvenida";

export default function EditarPerfil() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    foto: "",
  });

  useEffect(() => {
    getUsuario().then((res) => {
      setUser(res.data);
    });
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUpload = async (data) => {
    const file = data.target.files[0];
    const base64 = await convertBase64(file);
    user.foto = base64;
  };

  const handleChange = (e) => {
    e.persist();
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editarPerfil(user).then((res) => {
      if (res.status === 200) {
        NotiBienvenida("Perfil editado con éxito");
        setTimeout(() => {
          window.location.replace("/perfil");
        }, 3000);
      }
    });
  };

  return (
    <>
      <Sidebar />
      <div className="page-container-editar-perfil">
        <Layout>
          <div className="contenido-editar-perfil">
            <div className="editar-perfil-form">
              <div className="lugar-foto">
                {user.foto !== "" ? (
                  <img src={foto} alt="foto" className="foto-editar-perfil" />
                ) : (
                  <h3>Editar perfil</h3>
                )}
              </div>
              <div>
                <FormFloating>
                  <FloatingLabel label={user.nombre}>
                    <Form.Control
                      onChange={handleChange}
                      name="nombre"
                      type="text"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label={user.apellido}>
                    <Form.Control
                      onChange={handleChange}
                      name="apellido"
                      type="text"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label={user.telefono}>
                    <Form.Control
                      onChange={handleChange}
                      name="telefono"
                      type="number"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
                <FormFloating>
                  <FloatingLabel label="Foto de perfil">
                    <Form.Control
                      name="foto de perfil"
                      onChange={handleUpload}
                      type="file"
                      required
                    />
                  </FloatingLabel>
                </FormFloating>
              </div>
              <div className="boton-editar-perfil">
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
