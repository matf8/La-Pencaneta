import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Home`,
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

export const renovarTokens = () => {
  return instance.get("/refresh");
};

//esta funcion es para cerrar sesion
export const clearState = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("nombre");
  localStorage.removeItem("correo");
  localStorage.removeItem("rol");
  sessionStorage.clear();
  window.location.replace("/");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRol = () => {
  return localStorage.getItem("rol");
};

export const getNombre = () => {
  return localStorage.getItem("nombre");
};

export const getCorreo = () => {
  return localStorage.getItem("correo");
};

export const getId = () => {
  return localStorage.getItem("id");
};

export const login = (authRequest) => {
  return instance.post("/login", authRequest);
};

export const loginFacebook = (datos) => {
  const jsonRequest = {
    access_token: datos.accessToken,
  };
  return instance.post("/loginFB", jsonRequest);
};

export const registro = (datosUser) => {
  return instance.post("/registro", datosUser);
};
