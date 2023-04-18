/*
ligas:
39: premier league
140: laliga
137: serie a
78: bundesliga
61: ligue 1

competencias:
2: champions league
3: europa league
13: copa libertadores
11: copa sudamericana
848: conference league

selecciones:
1: copa mundo
9: copa america
4: copa europea
20: copa africana
21: confederaciones
*/

export const getJornada = (liga, inicio, fin) => {
  fetch(
    `https://v3.football.api-sports.io/fixtures?season=2022&league=${liga}&from=${inicio}&to=${fin}`,
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
      switch (liga) {
        case "2":
          localStorage.setItem(
            "jornadaCompetenciaChampions",
            JSON.stringify(data.response)
          );
          break;
        case "3":
          localStorage.setItem(
            "jornadaCompetenciaEuropa",
            JSON.stringify(data.response)
          );
          break;
        case "13":
          localStorage.setItem(
            "jornadaCompetenciaLibertadores",
            JSON.stringify(data.response)
          );
          break;
        case "11":
          localStorage.setItem(
            "jornadaCompetenciaSudamericana",
            JSON.stringify(data.response)
          );
          break;
        case "848":
          localStorage.setItem(
            "jornadaCompetenciaConference",
            JSON.stringify(data.response)
          );
          break;
        case "1":
          localStorage.setItem(
            "jornadaCompetenciaMundial",
            JSON.stringify(data.response)
          );
          break;
        case "9":
          localStorage.setItem(
            "jornadaCompetenciaCopaAmerica",
            JSON.stringify(data.response)
          );
          break;
        case "4":
          localStorage.setItem(
            "jornadaCompetenciaCopaEuropea",
            JSON.stringify(data.response)
          );
          break;
        case "20":
          localStorage.setItem(
            "jornadaCompetenciaCopaAfrica",
            JSON.stringify(data.response)
          );
          break;
        case "21":
          localStorage.setItem(
            "jornadaCompetenciaConfederaciones",
            JSON.stringify(data.response)
          );
          break;
        case "39":
          localStorage.setItem(
            "jornadaLigaInglesa",
            JSON.stringify(data.response)
          );
          break;
        case "140":
          localStorage.setItem(
            "jornadaLigaEspanola",
            JSON.stringify(data.response)
          );
          break;
        case "137":
          localStorage.setItem(
            "jornadaLigaItaliana",
            JSON.stringify(data.response)
          );
          break;
        case "78":
          localStorage.setItem(
            "jornadaLigaAlemana",
            JSON.stringify(data.response)
          );
          break;
        case "61":
          localStorage.setItem(
            "jornadaLigaFrancesa",
            JSON.stringify(data.response)
          );
          break;
        default:
          break;
      }
      return data.response;
    })
    .catch((err) => {
      console.error(err);
    });
};
