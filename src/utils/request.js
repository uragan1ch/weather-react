import { API_URL } from "./constants";
import { axiosInstance } from "./instance";

export const login = (params) => {
  return axiosInstance.post(`${API_URL}/auth/sign-in`, params);
};

export const reg = (params) => {
  return axiosInstance.post(`${API_URL}/auth/sign-up`, params);
};

export const putUser = (params) => {
  return axiosInstance.put(`${API_URL}/user/me`, params);
};

export const getUser = (params) => {
  return axiosInstance.get(`${API_URL}/user/me`, params);
};

export const getCurrentWeather = (params) => {
  return axiosInstance.get(`${API_URL}/weather/current?q=${params}`);
};

export const getForecastWeather = (params) => {
  return axiosInstance.get(`${API_URL}/weater/forecast.json`, params);
};
