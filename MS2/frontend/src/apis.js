import axios from "axios";

// const baseUrl = "http://localhost:8080/api/";
const baseUrl = "https://bss-ms2.web.app/api/";

export const baseApiInstance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
