import axios from "axios";
import { API_URL } from "../utils/constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;

    config.headers = {
      ...config.headers,
      Authorization: authorization,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        originalRequest._retry = true;
        try {
          const data = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken: localStorage.getItem("refreshToken"),
          });
          const newAccessToken = data.data.accessToken;
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Error refreshing token:", err);
          return Promise.reject(err);
        }
      }
    }
  }
);
