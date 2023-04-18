import React from "react";
import { FormGroup, Input } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import "./Step.css";

const Step1 = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }

  const newHandleChange = (e) => {
    props.newHandleChange(e.target.name, e.target.value);
  };

  return (
    <>
      <p className="negrita">Primero necesitamos un nombre</p>
      <FormGroup className="form-grupo">
        <div className="nombre-alta-penca">
          <Input
            onChange={newHandleChange}
            type="text"
            name="nombrePenca"
            placeholder="la naranja pencanica"
            required
          />
        </div>
        <p className="negrita">Elige torneo y precio de entrada</p>
        <div className="torneo-alta-penca">
          <div className="input-precio-entrada">
            <input
              name="precioEntrada"
              onChange={newHandleChange}
              style={{ width: "100px" }}
              type="number"
            />
            <h6>U$D</h6>
          </div>
          <div>
            <Dropdown
              as="select"
              name="torneo"
              onChange={newHandleChange}
              className="dropdown-torneo-alta-penca"
              defaultValue="default"
            >
              <option value="default" className="opciones" disabled>
                Torneo
              </option>
              {props.torneos.map((torneo) => (
                <option
                  key={torneo.id}
                  value={torneo.id}
                  disabled={torneo.id !== 1}
                >
                  {torneo.nombre}
                </option>
              ))}
            </Dropdown>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step1;
