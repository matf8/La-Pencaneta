import axios from "axios";
import { getToken } from "./LoginRequests";

const instancePublica = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/PozoCompartidos`,
  headers: {
    "Content-Type": "application/json",
  },
});

const instanceEmpresarial = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Empresariales`,
  headers: {
    "Content-Type": "application/json",
  },
});

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Pencas`,
  headers: {
    "Content-Type": "application/json",
  },
});

instancePublica.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      /* const refreshToken = getRefreshToken();
      if (refreshToken) {
        config.headers["RefreshAuthentication"] = "Bearer " + refreshToken;
      } */
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instancePublica.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

instanceEmpresarial.interceptors.request.use(
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

instanceEmpresarial.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
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

export const getPencasPublicas = () => {
  return instancePublica.get("/all");
};

export const getPencasEmpresariales = () => {
  return instanceEmpresarial.get("/all");
};

export const getPencaPublica = (id) => {
  return instancePublica.get(`/${id}`);
};

export const getPencaEmpresarial = (id) => {
  return instanceEmpresarial.get(`/${id}`);
};

export const crearPencaPublica = (
  nombre,
  premios,
  precioEntrada,
  torneo,
  personas
) => {
  const prices = JSON.stringify(premios);
  const capacidad = parseInt(personas, 10);
  const jsonRequest = {
    nombre: nombre,
    premios: prices,
    precioEntrada: precioEntrada,
    torneoId: torneo,
    capacidad: capacidad,
  };
  return instancePublica.post("/", jsonRequest);
};

export const crearPencaEmpresarial = (
  nombre,
  premios,
  precioEntrada,
  torneo,
  tema,
  empresa,
  clave,
  personas
) => {
  const prices = JSON.stringify(premios);
  const idTorneo = parseInt(torneo, 10);
  const entrada = parseFloat(precioEntrada, 10);
  const capacidad = parseInt(personas, 10);
  const theme = parseInt(tema, 10);
  const jsonRequest = {
    nombre: nombre,
    premios: prices,
    torneoId: idTorneo,
    costoEntrada: entrada,
    comision: 0,
    capacidad: capacidad,
    themeDescripcion: "",
    clave: clave,
    theme: theme,
    empresa: empresa,
  };
  return instanceEmpresarial.post("/", jsonRequest);
};

export const usuariosPenca = (id) => {
  return instance.get(`/usuarios-en-penca/${id}`);
};

export const getPencas = () => {
  return instance.get("/all");
};

export const getPenca = (id) => {
  return instance.get(`/${id}`);
};

export const modificarPencaEmpresarial = (penca, tema) => {
  const jsonRequest = {
    nombre: penca.nombre,
    premios: penca.premios,
    costoEntrada: penca.costoEntrada,
    comision: penca.comision,
    capacidad: penca.capacidad,
    theme: tema,
  };
  return instanceEmpresarial.put(`/${penca.id}`, jsonRequest);
};
