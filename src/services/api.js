import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (credentials) =>
  api.post("/auth/register", credentials);

export const getConfigurations = () => api.get("/configuration");
export const createConfiguration = (configuration) =>
  api.post("/configuration", configuration);
export const updateConfiguration = (buildingType, configuration) =>
  api.put(`/configuration/${buildingType}`, configuration);
export const deleteConfiguration = (buildingType) =>
  api.delete(`/configuration/${buildingType}`);

export const getBuildingTypes = () => api.get("/buildingTypes");
