import axios from "axios";
const serverIp = import.meta.env.VITE_API_SERVER_IP || "";
const axiosInstance = axios.create({
  baseURL: serverIp,
  timeout: 5000,
  withCredentials: true,  // 쿠키 자동 포함
});
export default axiosInstance;
