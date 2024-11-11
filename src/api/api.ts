//api.ts

import { AxiosRequestConfig } from "axios";
import apiFacade from "./apiFacade.ts";

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiFacade.get<T>(url, config);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    return await apiFacade.post<T>(url, data, config);
  },
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    return await apiFacade.post<T>(url, data, config);
  },
};

export default api;