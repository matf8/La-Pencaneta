import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../../../Components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { Table } from "react-bootstrap";
import "./ResultadosLiga.css";

function ResultadosLiga() {
  const [params] = useSearchParams();
  const competenciaid = params.get("competencia");
  const nombreLiga = params.get("nombreLiga");
  const [data, setData] = useState(null);
  const [tabla, setTabla] = useState(null);

  useEffect(() => {
    const fecha = new Date().toISOString().split("T")[0];
    fetch(
      `https://v3.football.api-sports.io/fixtures?league=${competenciaid}&season=2022&date=${fecha}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_APISPORT_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.response);
      })
      .catch((err) => {
        console.error(err);
      });
    fetch(
      `https://v3.football.api-sports.io/standings?league=${competenciaid}&season=2022`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_APISPORT_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTabla(data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="page-container-resultados">
        <div className="tabla-resultados">
          <div className="bloque">
            <div className="tablas">
              <h1 className="cabezal">{nombreLiga}</h1>
              <br />
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>team</th>
                    <th>last 5</th>
                    <th>goals Diff</th>
                    <th>points</th>
                  </tr>
                </thead>
                <tbody>
                  {tabla !== null ? (
                    tabla.league.standings[0].map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.rank}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <img
                              className="logo-teams"
                              src={item.team.logo}
                              alt={"logo" + index}
                            />
                            <h6>{item.team.name}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.form}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.goalsDiff}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="fila-tabla">
                            <h6>{item.points}</h6>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1>Cargando</h1>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="bloque">
            <h1 className="cabezal">Resultados en vivo</h1>
            <br />
            {data !== null ? (
              data.map((match, index) => (
                <div className="match" key={index}>
                  <div className="teams-matches">
                    <img
                      className="logo-matches"
                      src={match.teams.home.logo}
                      alt="logo"
                    />
                  </div>
                  <h1 className="score">{match.goals.home}</h1>
                  <h5 className="elapsed">{match.fixture.status.elapsed}'</h5>
                  <h1 className="score">{match.goals.away}</h1>
                  <div className="teams-matches">
                    <img
                      className="logo-matches"
                      src={match.teams.away.logo}
                      alt="logo"
                    />
                  </div>
                </div>
              ))
            ) : (
              <h3>No hay partidos en vivo por el momento</h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResultadosLiga;
