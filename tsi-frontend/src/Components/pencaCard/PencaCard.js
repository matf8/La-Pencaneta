import React from "react";
import { Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { IoMdOpen } from "react-icons/io";
import { FaEmpire, FaUserCircle } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import "./PencaCard.css";

export const PencaCard = ({
  nombre,
  esEmpresarial,
  competencia,
  precioEntrada,
  pencaid,
  capacidad,
  esCreador,
}) => {
  return (
    <>
      <ToastContainer />
      <Card className="cartaPenca">
        {esEmpresarial && esCreador ? (
          <Card.Header className="card-header">
            <GrUserAdmin size={20} />
            <FaEmpire size={20} />
          </Card.Header>
        ) : esEmpresarial && !esCreador ? (
          <Card.Header className="card-header">
            <FaUserCircle size={20} />
            <FaEmpire size={20} />
          </Card.Header>
        ) : null}
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            precio de entrada: {precioEntrada}USD
          </Card.Subtitle>
          <Card.Text>capacidad: {capacidad}</Card.Text>
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
              true
            }
          >
            <IoMdOpen />
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};
