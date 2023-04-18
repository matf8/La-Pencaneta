import React, { Fragment } from "react";
import "./Cargando.css";

export const Cargando = (props) => (
  <Fragment>
    <div className="text-center">
      {props.text}
      <div className="loader"></div>
    </div>
  </Fragment>
);
