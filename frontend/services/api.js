import axios from "axios";

const api = axios.create({
  baseURL: "http://172.22.239.62:3333"
});

export default api;
