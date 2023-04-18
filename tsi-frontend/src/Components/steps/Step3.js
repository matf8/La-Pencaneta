import React from "react";
import { FormGroup } from "reactstrap";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { Form } from "react-bootstrap";
import paypalLogo from "../../Assets/paypal-logo.png";

const Step3 = (props) => {
  if (props.currentStep !== 3) {
    return null;
  }

  const newHandleChange = (e) => {
    props.newHandleChange(e.target.name, e.target.value);
  };

  return (
    <>
      <FormGroup className="form-grupo-dos">
        <div className="tipo-penca-form">
          <h3>
            <img src={paypalLogo} alt="logo-paypal" className="logo-paypal" />
          </h3>
        </div>
        <div className="planes-penca">
          <div className="titulo-plaes-pencas">
            <h2>
              <HiUsers /> <HiOutlineArrowNarrowRight />
            </h2>
          </div>
          <div className="opciones-planes-penca">
            <Form.Control
              type="number"
              name="personas"
              onChange={newHandleChange}
              className="dropdown-plan-alta-penca"
              min={1}
              max={50}
            />
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step3;
