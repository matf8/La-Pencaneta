export const formatearFecha = (stringFecha) => {
  const splitFecha = stringFecha.split("T");
  const fecha = splitFecha[0];
  const partesFecha = fecha.split("-");
  const fechaRetorno =
    partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
  return fechaRetorno;
};

export const calcularSemana = () => {
  const desde = new Date();
  const hasta = new Date();
  hasta.setDate(desde.getDate() + 7);
  return { desde, hasta };
};
