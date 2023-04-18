import React from "react";
import { Footer } from "../../Components/footer/Footer";
import { Layout } from "../../Components/Layout";
import { PencaSportCard } from "../../Components/pencaSport/PencaSportCard";
import "./Resultados.css";

function Resultados() {
  return (
    <>
      <div className="page-container-resultados-ligas">
        <Layout>
          <div className="ligas">
            <h1>ligas</h1>
            <div className="listado-ligas">
              <div>
                <PencaSportCard
                  esCompetencia={false}
                  competenciaid="39"
                  nombre="premier league"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={false}
                  competenciaid="140"
                  nombre="laliga"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={false}
                  competenciaid="137"
                  nombre="serie a"
                  mostrar={false}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={false}
                  competenciaid="78"
                  nombre="bundesliga"
                  mostrar={false}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={false}
                  competenciaid="61"
                  nombre="ligue 1"
                  mostrar={false}
                />
              </div>
            </div>
            <h1>torneos</h1>
            <div className="listado-ligas">
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="2"
                  nombre="champions league"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="3"
                  nombre="europa league"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="13"
                  nombre="copa libertadores"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="11"
                  nombre="copa sudamericana"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="848"
                  nombre="conference league"
                  mostrar={true}
                />
              </div>
            </div>
            <h1>selecciones</h1>
            <div className="listado-ligas">
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="1"
                  nombre="copa mundo"
                  mostrar={true}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="9"
                  nombre="copa america"
                  mostrar={false}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="4"
                  nombre="copa europea"
                  mostrar={false}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="20"
                  nombre="copa africana"
                  mostrar={false}
                />
              </div>
              <div>
                <PencaSportCard
                  esCompetencia={true}
                  competenciaid="21"
                  nombre="confederaciones"
                  mostrar={false}
                />
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default Resultados;
