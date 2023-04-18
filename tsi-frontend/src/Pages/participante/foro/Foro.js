import React, { useEffect, useState } from "react";
import { Layout } from "../../../Components/Layout";
import { Footer } from "../../../Components/footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "react-bootstrap";
import { TemaCard } from "../../../Components/temaCard/TemaCard";
import { getTemas } from "../../../Services/ForoRequests";
import "./Foro.css";

export default function Foro() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    getTemas()
      .then((res) => {
        setTemas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="page-container-foro">
        <Layout>
          <div className="foro">
            <div className="cabezal-foro">
              <h1>Foro de LaPencaneta</h1>
              <Button
                className="boton-nuevo-tema"
                href="/altatema"
                variant="dark"
              >
                Nuevo tema
              </Button>
            </div>
            <div className="contenido-foro">
              {temas.length !== 0 ? (
                temas.map((tema) => (
                  <TemaCard
                    titulo={tema.titulo}
                    contenido={tema.contenido}
                    user={tema.usuarioForoId}
                    temaid={tema.id}
                  />
                ))
              ) : (
                <h3>No hay ningun tema</h3>
              )}
            </div>
          </div>
        </Layout>
        <Footer />
      </div>
    </>
  );
}
