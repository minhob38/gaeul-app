import { checkInitialAuth } from "@apis/functions";
import axios from "axios";
import { ACCESS_TOKEN_HEADER, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "./auth";

// export const API_SERVER_ADDRESS = "http://3.39.126.180";
// export const API_SERVER_ADDRESS =
//   process.env.NODE_ENV === "production"
//     ? "https://api.onepick.info"
//     : "https://dev-api.onepick.info";
export const API_SERVER_ADDRESS = "http://localhost:8080";

const instance = axios.create({
  baseURL: API_SERVER_ADDRESS,
  validateStatus: (status) => {
    return status >= 200 || status === 302 || (status >= 400 && status < 500);
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: any) => {
    const isAuthApi = config.url.includes("/signin") || config.url.includes("/signup");
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    console.log(accessToken);

    if (!isAuthApi && accessToken) {
      config.headers[ACCESS_TOKEN_HEADER] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log("@@@ axios error");
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
