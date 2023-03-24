import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  // baseURL: "http://host.docker.internal:8080/",
  baseURL: "http://192.168.2.47:8080/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth-token');

    if (authToken) {
      config.headers = {
        'Authorization': `Token ${authToken}`,
        'Content-type': 'application/json',
      }
    }   

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;