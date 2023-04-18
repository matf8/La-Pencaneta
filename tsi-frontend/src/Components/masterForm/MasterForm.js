import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";

import MultiStepProgressBar from "../multiStepProgressBar/MultiStepProgressBar";
import { inscribirsePenca, pagarPenca } from "../../Services/PayPalRequests";
import { NotiError } from "../NotiError";
import {
  crearPencaPublica,
  crearPencaEmpresarial,
} from "../../Services/PencaRequests";
import { getTorneos } from "../../Services/TorneoRequests";

import "./MasterForm.css";

function MasterForm(props) {
  const rol = localStorage.getItem("rol");
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    getTorneos().then((res) => {
      setTorneos(res.data);
    });
  }, []);

  const [showUno, setShowUno] = useState(false);
  const [showDos, setShowDos] = useState(false);
  const [showTres, setShowTres] = useState(false);

  const handleShowUno = () => setShowUno(!showUno);
  const handleShowDos = () => setShowDos(!showDos);
  const handleShowTres = () => setShowTres(!showTres);

  const [state, setState] = useState({
    currentStep: 1,
  });

  const [nombrePenca, setNombrePenca] = useState("");
  const [torneo, setTorneo] = useState(-1);
  const [tipoPenca, setTipoPenca] = useState("");
  const [tema, setTema] = useState("");
  const [empresa, setEmpresa] = useState(
    props.empresa !== "" ? props.empresa : ""
  );
  const [clave, setClave] = useState("");
  const [precioEntrada, setPrecioEntrada] = useState(0);
  const [personas, setPersonas] = useState(0);

  const newHandleChange = (name, value) => {
    switch (name) {
      case "nombrePenca":
        setNombrePenca(value);
        break;
      case "torneo":
        setTorneo(value);
        break;
      case "tipoPenca":
        setTipoPenca(value);
        break;
      case "tema":
        setTema(value);
        break;
      case "empresa":
        setEmpresa(value);
        break;
      case "clave":
        setClave(value);
        break;
      case "precioEntrada":
        setPrecioEntrada(value);
        break;
      case "personas":
        setPersonas(value);
        if (tipoPenca === "empresarial") {
          props.setPrecioEmpresarial(value * 20);
        } else if (tipoPenca === "publica") {
          props.setPrecio(value * 5);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tipoPenca === "empresarial") {
      crearPencaEmpresarial(
        nombrePenca,
        props.precioEmpresarial,
        precioEntrada,
        torneo,
        tema,
        empresa,
        clave,
        personas
      ).then((res) => {
        if (res.status === 200 && rol !== "Admin") {
          inscribirsePenca(props.precioEmpresarial, res.data)
            .then((response) => {
              pagarPenca();
            })
            .catch((err) => {
              NotiError("Error al inscribirse en la penca");
            });
        }
      });
    } else if (tipoPenca === "publica") {
      crearPencaPublica(
        nombrePenca,
        props.precio,
        precioEntrada,
        torneo,
        personas
      ).then((res) => {
        if (res.status === 200 && rol !== "Admin") {
          inscribirsePenca(props.precio, res.data)
            .then((response) => {
              pagarPenca();
            })
            .catch((err) => {
              NotiError("Error al inscribirse en la penca");
            });
        }
      });
    }
  };

  const next = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    setState({
      currentStep: currentStep,
    });
  };

  const prev = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setState({
      currentStep: currentStep,
    });
  };

  return (
    <div className="tarjeta">
      <Form onSubmit={handleSubmit}>
        <Card style={{ width: "750px", height: "400px" }}>
          <CardHeader className="header-alta-penca">Crear una penca</CardHeader>
          <CardBody>
            <CardTitle>
              <MultiStepProgressBar currentStep={state.currentStep} />
            </CardTitle>
            <CardText />
            <Step1
              currentStep={state.currentStep}
              newHandleChange={newHandleChange}
              torneos={torneos}
            />
            <Step2
              currentStep={state.currentStep}
              newHandleChange={newHandleChange}
              tipoPenca={state.tipoPenca}
              showUno={showUno}
              handleShowUno={handleShowUno}
              showDos={showDos}
              handleShowDos={handleShowDos}
              showTres={showTres}
              handleShowTres={handleShowTres}
              empresa={empresa !== "" ? empresa : ""}
            />
            <Step3
              currentStep={state.currentStep}
              newHandleChange={newHandleChange}
            />
          </CardBody>
          <CardFooter>
            {state.currentStep !== 1 && (
              <Button
                className="boton-anterior"
                color="secondary float-left"
                onClick={prev}
              >
                Anterior
              </Button>
            )}
            {state.currentStep < 3 && (
              <Button
                className="boton-siguiente"
                color="primary float-right"
                onClick={next}
                disabled={
                  state.currentStep === 1 && nombrePenca === ""
                    ? true
                    : state.currentStep === 1 && torneo === -1
                    ? true
                    : state.currentStep === 1 && precioEntrada === 0
                    ? true
                    : state.currentStep === 2 && tipoPenca === ""
                    ? true
                    : state.currentStep === 2 &&
                      tipoPenca === "empresarial" &&
                      tema === ""
                    ? true
                    : state.currentStep === 2 &&
                      tipoPenca === "empresarial" &&
                      empresa === "" &&
                      clave === ""
                    ? true
                    : false
                }
              >
                Siguiente
              </Button>
            )}
            {state.currentStep > 2 && (
              <Button
                className="boton-siguiente"
                color="primary float-right"
                disabled={personas < 2}
              >
                Terminar
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}

export default MasterForm;
