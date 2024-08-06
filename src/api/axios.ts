import axios from "axios";
import {
  getLocalStorage,
  setTokenLocalStorage,
} from "@/utils/editLocalStorage";

// BASE_URL tanımı, gerçek URL'nizle değiştirin
export const BASE_URL = "https://api.management.parse25proje.link/api";

// Axios istemcisini özelleştir
export const serviceAxios = axios.create({ baseURL: BASE_URL });

serviceAxios.interceptors.request.use((config) => {
  const accessToken = getLocalStorage("accessToken");
  const registerToken = getLocalStorage("registerToken");
  if (accessToken || registerToken) {
    config.headers.Authorization = `Bearer ${registerToken || accessToken}`;
  }
  return config;
});

serviceAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error.response);
    switch (error.response.status) {
      case 401:
        if (window.location.pathname !== "/auth/login") {
          setTokenLocalStorage("accessToken", "");
          window.location.href = "/auth/login";
        }
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
