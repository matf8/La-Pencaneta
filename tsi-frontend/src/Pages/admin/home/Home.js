import React from "react";
import { Footer } from "../../../Components/footer/Footer";
import { ToastContainer } from "react-toastify";
import Estadisticas from "../estadisticas/Estadisticas";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbTournament } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <>
      <ToastContainer />
      <div className="page-container-home-admin">
        <div className="cuadrantes">
          <div className="subCuadranteUno">
            <a href="/usuarios">
              <div className="cuadranteUno">
                <FaUsersCog size={30} />
                <h1>Usuarios</h1>
              </div>
            </a>
            <a href="/pencas">
              <div className="cuadranteTres">
                <h1>
                  <GiTakeMyMoney size={30} />
                  Pencas
                </h1>
              </div>
            </a>
            <a href="/torneos">
              <div className="cuadranteCuatro">
                <TbTournament size={30} />
                <h1>Torneos</h1>
              </div>
            </a>
          </div>
          <div className="subCuadranteDos">
            <div className="cuadranteCinco">
              <Estadisticas />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
