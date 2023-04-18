import React from "react";
import { Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { IoMdOpen } from "react-icons/io";
import { FaEmpire } from "react-icons/fa";
import "./PencaListadoCard.css";

export const PencaListadoCard = ({
  nombre,
  esEmpresarial,
  competencia,
  premio,
  pencaid,
}) => {
  return (
    <>
      <ToastContainer />
      <Card className="pencaListadoCard">
        {esEmpresarial && (
          <Card.Header className="card-header">
            <FaEmpire size={20} />
          </Card.Header>
        )}
        <Card.Body className="card-listado-body">
          <Card.Title>{nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            premio: {premio}U$D
          </Card.Subtitle>
          <Card.Link
            className="cardButton"
            href={
              "/penca?competencia=" +
              competencia +
              "&esEmpresarial=" +
              esEmpresarial +
              "&pencaid=" +
              pencaid +
              "&unido=" +
              false
            }
          >
            <IoMdOpen />
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};
