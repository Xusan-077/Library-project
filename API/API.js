import axios from "axios";

const API = axios.create({
  baseURL: "http://176.57.208.162:8000/api/v1",
});

export default API;
