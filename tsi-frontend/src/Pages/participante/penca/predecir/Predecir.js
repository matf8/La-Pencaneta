import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../../../../Components/footer/Footer";
import { Layout } from "../../../../Components/Layout";
import { Button } from "react-bootstrap";
import { addPrediccion } from "../../../../Services/UsuarioRequests";
import "./Predecir.css";
import { NotiBienvenida } from "../../../../Components/NotiBienvenida";

export default function Predecir() {
  const [params] = useSearchParams();
  const fixture = params.get("fixture");
  const idEvento = params.get("idEvento");
  const pencaId = params.get("pencaId");

  const [partido, setPartido] = useState(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const handleChangeScoreA = (e) => {
    setScoreA(e.target.value);
  };

  const handleChangeScoreB = (e) => {
    setScoreB(e.target.value);
  };

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/fixtures?id=${fixture}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${process.env.REACT_APP_APISPORT_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPartido(data.response);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const handlePredecir = () => {
    addPrediccion(scoreA, scoreB, idEvento, pencaId)
      .then((res) => {
        if (res.status === 200) {
          NotiBienvenida("predicción realizada con éxito");
          window.history.back();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page-container-predecir">
        <Layout>
          {partido !== null ? (
            <div className="predecir-participante">
              <div className="prediccion-partido">
                <div className="equipos-partido">
                  <img
                    className="logo-partido"
                    src={partido[0].teams.home.logo}
                    alt="logo"
                  />
                </div>
                <input
                  onChange={handleChangeScoreA}
                  className="puntaje"
                  type="number"
                  placeholder="0"
                />
                <Button
                  variant="dark"
                  className="tiempo"
                  onClick={() => handlePredecir()}
                >
                  Predecir
                </Button>
                <input
                  onChange={handleChangeScoreB}
                  className="puntaje"
                  type="number"
                  placeholder="0"
                />
                <div className="equipos-partido">
                  <img
                    className="logo-partido"
                    src={partido[0].teams.away.logo}
                    alt="logo"
                  />
                </div>
              </div>
              <div className="info-partido-participante">
                <div className="info-partido-predecir-participante">
                  <div className="info-equipo">
                    {partido[0].lineups.length !== 0 ? (
                      partido[0].lineups[0].startXI.map((jugador, index) => {
                        return (
                          <div key={index}>
                            <h1>{jugador.player.name}</h1>
                          </div>
                        );
                      })
                    ) : (
                      <h1>No hay jugadores</h1>
                    )}
                  </div>
                  <div className="info-partido">
                    <h3>{partido[0].fixture.venue.name}</h3>
                    <h3>{partido[0].fixture.date.split("T")[0]}</h3>
                  </div>
                  <div className="info-equipo">
                    {partido[0].lineups.length !== 0 ? (
                      partido[0].lineups[1].startXI.map((jugador, index) => {
                        return (
                          <div key={index}>
                            <h1>{jugador.player.name}</h1>
                          </div>
                        );
                      })
                    ) : (
                      <h1>No hay jugadores</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1>Cargando...</h1>
          )}
        </Layout>
      </div>
      <Footer />
    </>
  );
}
