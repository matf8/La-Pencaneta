import React from "react";
import {
  Form,
  FloatingLabel,
  FormFloating,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowDown,
  HiInformationCircle,
} from "react-icons/hi";

import { BsArrowDownLeft } from "react-icons/bs";

const Step2 = (props) => {
  const rol = localStorage.getItem("rol");

  if (props.currentStep !== 2) {
    return null;
  }

  const elementBlock = (elmOne, elmTwo, elmThree) => {
    document.getElementById("tipoEmpresarial").style.display = elmOne;
    document.getElementById("tipoPublica").style.display = elmTwo;
    document.getElementById("tipo").style.display = elmThree;
  };

  const toogleDiv = (val) => {
    if (val === "empresarial") {
      elementBlock("block", "none", "none");
    } else if (val === "publica") {
      elementBlock("none", "block", "none");
    } else if (val === "default") {
      elementBlock("none", "none", "block");
    }
  };

  const handleChange = (e) => {
    props.newHandleChange(e.target.name, e.target.value);
    toogleDiv(e.target.value);
  };

  const newHandleChange = (e) => {
    props.newHandleChange(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="form-grupo-dos">
        <div className="tipo-penca-form">
          <h5>elige el tipo de la penca</h5>
          <HiOutlineArrowNarrowDown size={40} />
          <Dropdown
            as="select"
            id="tipoPenca"
            name="tipoPenca"
            onChange={handleChange}
            defaultValue="default"
          >
            <option value="default" className="opciones" disabled>
              Tipo de penca
            </option>
            <option value="empresarial" className="opciones">
              Empresarial
            </option>
            {rol !== "AdminEmpresarial" ? (
              <option value="publica" className="opciones">
                Publica
              </option>
            ) : null}
          </Dropdown>
        </div>
        <div className="info-adicional-penca">
          <div id="tipo">
            <HiOutlineArrowNarrowLeft size={70} />
            <h2>Para continuar, elige el tipo de penca que quieres crear</h2>
          </div>
          <div id="tipoEmpresarial">
            <h3>La penca será empresarial</h3>
            <Form onChange={newHandleChange}>
              <div className="campo-tema">
                <h5>Tema: </h5>
                <div className="tema-eleccion">
                  <Form.Check name="tema" type="radio" value="1" label="1" />
                  <p
                    onClick={props.handleShowUno}
                    name="showUno"
                    className="info-tema"
                  >
                    <HiInformationCircle />
                  </p>
                </div>
                <div className="tema-eleccion">
                  <Form.Check name="tema" type="radio" value="2" label="2" />
                  <p
                    onClick={props.handleShowDos}
                    name="showDos"
                    className="info-tema"
                  >
                    <HiInformationCircle />
                  </p>
                </div>
                <div className="tema-eleccion">
                  <Form.Check name="tema" type="radio" value="3" label="3" />
                  <p
                    onClick={props.handleShowTres}
                    name="showTres"
                    className="info-tema"
                  >
                    <HiInformationCircle />
                  </p>
                </div>
              </div>
            </Form>
            <FormFloating className="pass-penca-empresarial">
              <FloatingLabel
                className="campo-empresa"
                label={props.empresa !== "" ? props.empresa : "Empresa"}
              >
                <Form.Control
                  onChange={newHandleChange}
                  type="text"
                  name="empresa"
                  required={props.tipoPenca === "empresarial"}
                  disabled={props.empresa !== "" ? true : false}
                />
              </FloatingLabel>
              <FloatingLabel className="campo-empresa" label="Clave">
                <Form.Control
                  onChange={newHandleChange}
                  type="text"
                  name="clave"
                  required={props.tipoPenca === "empresarial"}
                />
              </FloatingLabel>
            </FormFloating>
          </div>
          <div id="tipoPublica">
            <h3>
              La penca será pública y cualquiera podrá acceder, clickea en
              siguiente
            </h3>
            <BsArrowDownLeft size={40} />
          </div>
        </div>
      </div>
      <Modal show={props.showUno} onHide={props.handleShowUno}>
        <Modal.Header closeButton>
          <Modal.Title>Tema 1</Modal.Title>
        </Modal.Header>
        <Modal.Body>Descripcion del tema uno</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleShowUno}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={props.showDos} onHide={props.handleShowDos}>
        <Modal.Header closeButton>
          <Modal.Title>Tema 2</Modal.Title>
        </Modal.Header>
        <Modal.Body>Descripcion del tema dos</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleShowDos}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={props.showTres} onHide={props.handleShowTres}>
        <Modal.Header closeButton>
          <Modal.Title>Tema 3</Modal.Title>
        </Modal.Header>
        <Modal.Body>Descripcion del tema tres</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleShowTres}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Step2;
