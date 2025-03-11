// src/lib/api/ServerAPI.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ServerAPI = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
  },

  post: async <T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data, config);
  },

  put: async <T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data, config);
  },

  patch: async <T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.patch<T>(url, data, config);
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
  },
};

export default ServerAPI;