import axios from "axios";
import { getToken } from "./LoginRequests";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Usuarios`,
  headers: {
    "Content-Type": "application/json",
  },
});

const instancePredicciones = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Predicciones`,
  headers: {
    "Content-Type": "application/json",
  },
});

instancePredicciones.interceptors.request.use(
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

export const getUsuario = () => {
  return instance.get("/");
};

export const getUsuarioById = (id) => {
  return instance.get(`/${id}`);
};

export const getPencasEmpresariales = () => {
  return instance.get("/get-empresariales");
};

export const getPencasPublicas = () => {
  return instance.get("/get-pozocompartidos");
};

export const getUsuarios = () => {
  return instance.get("/all");
};

export const editarPerfil = (data) => {
  return instance.put("/", data);
};

export const getPredicciones = () => {
  return instancePredicciones.get("/");
};

export const addPrediccion = (scoreA, scoreB, evento, penca) => {
  const jsonAltaPrediccion = {
    scoreEquipoA: scoreA,
    scoreEquipoB: scoreB,
    eventoDeportivoId: evento,
    pencaId: penca,
  };
  return instancePredicciones.post("/", jsonAltaPrediccion);
};

export const addPenca = (penca) => {
  return instance.put(`/add-penca/${penca}`);
};

export const addPencaEmpresarial = (clave) => {
  return instance.put(`/add-penca-empresarial/${clave}`);
};

export const getEventosPenca = (penca) => {
  return instance.get(`/get-eventos-penca/${penca}`);
};

export const getPencasLibres = () => {
  return instance.get("/get-pencas-libres");
};

export const getPencaLibre = (nombre) => {
  return instance.get(`/get-pencas-libres/${nombre}`);
};
