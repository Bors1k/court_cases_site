import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  // baseURL: "http://10.48.6.82:8080/",
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