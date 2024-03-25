import axios from "axios";

const axiosInt = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export default axiosInt;
