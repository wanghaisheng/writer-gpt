import axios from "axios";
import Cookies from "js-cookie";

import { publicApi } from "@config/env";

export const APIClient = (() => {
  const instance = axios.create({
    baseURL: publicApi,
    headers: {
      "Content-Type": "application/json"
    }
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = Cookies.get("token");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  });

  return instance;
})();
