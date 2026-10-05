import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const serverApi = axios.create({
  baseURL: "https://notehub-vnly.onrender.com/api",
  withCredentials: true,
});

export default api;
