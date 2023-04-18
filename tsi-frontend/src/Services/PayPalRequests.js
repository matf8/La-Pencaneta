import axios from "axios";
import { getToken } from "./LoginRequests";

// 4032030295652276
// 04/24
// 866

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PAYPAL}`,
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

export const inscribirsePenca = (total, pencaid) => {
  let object = {
    monto: total,
    pencaId: pencaid,
    token: getToken(),
  };
  return instance.post("/inscribirse", object);
};

export const crearPenca = (total) => {
  let object = {
    monto: total,
    token: getToken(),
  };
  return instance.post("/crear", object);
};

export const pagarPenca = () => {
  return window.location.replace(`${process.env.REACT_APP_PAYPAL}/pay`);
};
