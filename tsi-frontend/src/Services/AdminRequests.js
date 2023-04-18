import axios from "axios";
import { getToken } from "./LoginRequests";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export const getUsuarioByCorreo = (correo) => {
  return instance.post(`/buscar-email/${correo}`);
};

export const cambioRol = (id, rol) => {
  const jsonRequest = {
    id: id,
    rol: rol,
  };
  return instance.post("/modificar-rol", jsonRequest);
};

export const cargarResultadoEvento = (evento) => {
  const id = parseInt(evento.eventoDeportivoId, 10);
  const scoreA = parseInt(evento.scoreEquipoA, 10);
  const scoreB = parseInt(evento.scoreEquipoB, 10);
  const jsonRequest = {
    eventoDeportivoId: id,
    scoreEquipoA: scoreA,
    scoreEquipoB: scoreB,
  };
  return instance.put(`/cargar-resultados`, jsonRequest);
};

export const getUsuarios = () => {
  return instance.get("/get-user-empresa");
};
