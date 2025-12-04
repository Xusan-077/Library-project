import axios from "axios";

const API = axios.create({
  baseURL: "http://176.57.208.162:8000/api/v1",
});

export const Profile_API = axios.create({
  baseURL: "http://org-ave-jimmy-learners.trycloudflare.com/api/v1",
});
Profile_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
