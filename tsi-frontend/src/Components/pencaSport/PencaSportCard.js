import React from "react";
import { Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { IoMdOpen } from "react-icons/io";
import "./PencaSportCard.css";

export const PencaSportCard = ({
  nombre,
  esCompetencia,
  competenciaid,
  mostrar,
}) => {
  return (
    <>
      <ToastContainer />
      <Card className="cartaPencaSport">
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          {mostrar === true ? (
            <Card.Link
              className="cardButton"
              href={
                esCompetencia
                  ? "/resultadosCompetencia?competencia=" +
                    competenciaid +
                    "&nombreCompetencia=" +
                    nombre
                  : "/resultadosLiga?competencia=" +
                    competenciaid +
                    "&nombreLiga=" +
                    nombre
              }
            >
              <IoMdOpen />
            </Card.Link>
          ) : (
            <h6>no disponible</h6>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
