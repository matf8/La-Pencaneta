import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "../../../../Components/Layout";
import { Footer } from "../../../../Components/footer/Footer";
import MasterForm from "../../../../Components/masterForm/MasterForm";
import frase from "../../../../Assets/imagen-alta-penca.png";
import { FaUserAlt, FaMoneyBill } from "react-icons/fa";
import { GrInfo } from "react-icons/gr";
import { HiReceiptTax } from "react-icons/hi";
import "./AltaPenca.css";

function AltaPenca() {
  const [params] = useSearchParams();
  const empresa = params.get("empresa");
  const [showInfoPrecio, setShowInfoPrecio] = useState(false);
  const [showInfoPremio, setShowInfoPremio] = useState(false);

  const [precio, setPrecio] = useState(0);
  const [precioEmpresarial, setPrecioEmpresarial] = useState(0);

  return (
    <>
      <div className="page-container-home-alta-penca">
        <Layout>
          <div className="elementos-alta-penca">
            <div>
              <div className="superior">
                <div className="frase-alta-penca">
                  <img src={frase} alt="frase" />
                </div>
              </div>
            </div>
            <div className="formulario">
              <div className="containerAlta">
                <div>
                  <MasterForm
                    setPrecio={setPrecio}
                    empresa={empresa !== null ? empresa : ""}
                    precio={precio}
                    precioEmpresarial={precioEmpresarial}
                    setPrecioEmpresarial={setPrecioEmpresarial}
                  />
                </div>
              </div>
              <div className="tabla">
                <h2>Planes & precios</h2>
                <div className="planes-pencas">
                  <div className="titulo">
                    <div className="ayuda">
                      <div className="lamparita">
                        <h3>Empresas</h3>
                        <GrInfo
                          onClick={() => setShowInfoPrecio(!showInfoPrecio)}
                        />
                      </div>
                      {showInfoPrecio ? (
                        <h6>La ganancia interna es toda de la empresa</h6>
                      ) : (
                        <h6>ㅤㅤㅤㅤㅤ</h6>
                      )}
                    </div>
                  </div>
                  <div className="planes-precios-pencas">
                    <div className="plan-penca">
                      <div className="descripcion-plan">
                        <h5>
                          c/
                          <FaUserAlt size={20} />
                        </h5>
                        <h5>20U$D</h5>
                      </div>
                    </div>
                    <div className="plan-penca">
                      <div className="descripcion-plan">
                        <h5>
                          <FaMoneyBill size={20} />
                        </h5>
                        <h5>{precioEmpresarial}U$D</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="premios-pencas">
                  <div className="titulo">
                    <div className="ayuda">
                      <div className="lamparita">
                        <h3>Públicas</h3>
                        <GrInfo
                          onClick={() => setShowInfoPremio(!showInfoPremio)}
                        />
                      </div>
                      {showInfoPremio ? (
                        <h6>Tomamos un porcentaje de la ganacia interna</h6>
                      ) : (
                        <h6>ㅤㅤㅤㅤㅤ</h6>
                      )}
                    </div>
                  </div>
                  <div className="planes-premios-pencas">
                    <div className="plan-premios">
                      <div className="descripcion-precios">
                        <h5>
                          c/
                          <FaUserAlt size={20} />
                        </h5>
                        <h5>5U$D</h5>
                      </div>
                    </div>
                    <div className="plan-premios">
                      <div className="descripcion-precios">
                        <h5>
                          <FaMoneyBill size={20} />
                        </h5>
                        <h5>{precio}U$D</h5>
                      </div>
                    </div>
                    <div className="plan-premios">
                      <div className="descripcion-precios">
                        <h5>
                          <HiReceiptTax />
                        </h5>
                        <h5>{precio + precio * 0.2}U$D</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
}

export default AltaPenca;
