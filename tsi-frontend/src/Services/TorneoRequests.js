import axios from "axios";
import { getToken } from "./LoginRequests";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Torneos`,
  headers: {
    "Content-Type": "application/json",
  },
});

const instanceEventos = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/EventoDeportivos`,
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

instanceEventos.interceptors.request.use(
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

instanceEventos.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export const getTorneos = () => {
  return instance.get();
};

export const getTorneo = (id) => {
  return instance.get(`/${id}`);
};

export const getTorneoByNombre = (nombre) => {
  return instance.get(`/buscar/${nombre}`);
};

export const altaTroneo = (torneo) => {
  return instance.post("/", torneo);
};

export const getEventosAPITorneo = () => {
  const jsonEventos = {
    soloMundial: true,
    sinIniciar: true,
    numeroDias: 7,
  };
  return instanceEventos.post(`/get-eventos-online`, jsonEventos);
};

export const addEventosTorneo = (idTorneo, eventos) => {
  const torneo = parseInt(idTorneo, 10);
  const jsonAltaEventos = {
    torneoId: torneo,
    eventosOnline: eventos,
  };
  return instanceEventos.post(`/add-eventos-online-torneo`, jsonAltaEventos);
};

export const getEventosTorneo = (torneo) => {
  return instance.get(`/eventos-en-torneo/${torneo}`);
};
