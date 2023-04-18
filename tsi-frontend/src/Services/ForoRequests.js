import axios from "axios";
import { getToken } from "./LoginRequests";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Foro`,
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

export const getTemas = () => {
  return instance.get("/all");
};

export const altaTema = (data) => {
  return instance.post("/crear-foro", data);
};

export const getTema = (id) => {
  return instance.get(`/${id}`);
};

export const deleteTema = (id) => {
  return instance.delete(`/${id}`);
};

export const editarTema = (id, data) => {
  return instance.put(`/${id}`, data);
};

export const addComentario = (comentario) => {
  return instance.post("/crear-comentario", comentario);
};

export const getComentariosTema = (tema) => {
  return instance.get(`/comentarios/${tema}`);
};
