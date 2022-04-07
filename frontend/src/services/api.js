import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3333/vaccination/`,
  headers: new Headers({
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Request-Method": "GET, POST, DELETE",
  }),
});

export default api;
