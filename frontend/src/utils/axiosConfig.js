import axios from "axios";

export const instance = axios.create({
  baseURL: "https://ed15-197-232-113-163.ngrok-free.app/api",
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (!config.headers.Authorization) {
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : "";
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
