import axios from "axios";

const api = axios.create({
  baseURL: "https://ludo-arena-production-aa34.up.railway.app/api",
});

export default api;