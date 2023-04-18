import React from "react";
import { Carousel } from "react-bootstrap";
import "./Estadisticas.css";

import {
  ArcElement,
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  Legend,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Title,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Estadisticas La Pencanta',
    },
  },
};

const labels = ['Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const data = {
  labels,
  datasets: [
    {
      label: "Publica",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 0.5)',
      data: [5, 2, 2, 3, 4],
    },
    {
      label: "Empresarial",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 0.5',
      data: [1, 6, 3, 5, 10],
    },
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      label: 'UEFA Champions League',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 0.5)',
      data: [8, 2, 2, 3, 4],
    },
    {
      label: 'Torneo Mundial',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 0.5',
      data: [3, 6, 7, 8, 0],
    },
    {
      label: 'Torneo Uruguayo',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 167, 48, 0.5',
      borderColor: 'rgba(255, 167, 48, 0.5',
      data: [2, 4, 1, 6, 2],
    },
    {
      label: 'Copa Auf',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(48, 255, 61, 0.5)',
      borderColor: 'rgba(48, 255, 61, 0.5)',
      data: [3, 3, 4, 1, 1],
    },
  ],
};

export const data3 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'UEFA Champions League',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 0.5)',
      data: [8, 2, 2, 3, 4],
    },
  ],
};
export const data4 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Torneo Mundial',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      data: [3, 6, 7, 8, 0],
    },
  ],
};
export const data5 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Torneo Uruguayo',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 167, 48, 0.5',
      borderColor: 'rgba(255, 167, 48, 0.5',
      data: [2, 4, 1, 6, 2],
    },
  ],
};
export const data6 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Copa Auf',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(48, 255, 61, 0.5)',
      borderColor: 'rgba(48, 255, 61, 0.5)',
      data: [3, 3, 4, 1, 1],
    },
  ],
};



function Estadisticas() {
  return (
    <>
      <Carousel slide={false} className="estadisticas">
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
              <h3 className="tituloEstadistica">Pencas creadas en los ultimos meses</h3>
              <Bar data={data} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
            <h3 className="tituloEstadistica">Torneos antoados en los ultimos meses</h3>
              <Line data={data2} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
            <h3 className="tituloEstadistica">Personas inscriptas al torneo UEFA Champions League</h3>
              <Line data={data3} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
            <h3 className="tituloEstadistica">Personas inscriptas al torneo Mundial</h3>
              <Line data={data4} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
            <h3 className="tituloEstadistica">Personas inscriptas al torneo Uruguayo</h3>
              <Line data={data5} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide">
            <div className="estadistica">
            <h3 className="tituloEstadistica">Personas inscriptas a la Copa AUF</h3>
              <Line data={data6} />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Estadisticas;
