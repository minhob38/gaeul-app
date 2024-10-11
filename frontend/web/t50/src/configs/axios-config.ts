import { checkInitialAuth } from "@apis/functions";
import axios from "axios";

// export const API_SERVER_ADDRESS = "http://3.39.126.180";
// export const API_SERVER_ADDRESS =
//   process.env.NODE_ENV === "production"
//     ? "https://api.onepick.info"
//     : "https://dev-api.onepick.info";
export const API_SERVER_ADDRESS = "https://api.onepick.info";

const instance = axios.create({
  baseURL: "https://api.onepick.info",
  validateStatus: (status) => {
    return status >= 200 || status === 302 || (status >= 400 && status < 500);
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// axios.defaults.validateStatus = (status) => {
//   return status >= 200 || status === 302;
// };

export default instance;
