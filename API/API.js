import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;

export const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

AuthAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AuthAPI.interceptors.response.use(
  (res) => {
    return res;
  },

  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/login";
    }
    if (err.response?.status === 404) {
      toast.warning("404 not found");
    }
  }
);
