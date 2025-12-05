import axios from "axios";

const API = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com/api/v1",
});

export default API;

export const AuthAPI = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com/api/v1",
});

AuthAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
