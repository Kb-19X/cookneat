import axios from "axios";

const API_BASE_URL = "https://cookneat-server.onrender.com/api"; // Base API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Ajout automatique du token JWT dans les headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const getProfile = () => api.get("/auth/profile");
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userInfo) => api.post("/auth/register", userInfo);

// Recettes
export const getRecettes = () => api.get("/recipes");
export const deleteRecette = (id) => api.delete(`/recipes/${id}`);

// Users (admin)
export const getUsers = () => api.get("/admin/users");
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const changeUserRole = (userId, newRole) =>
  api.put(`/admin/users/${userId}/role`, { role: newRole });

// Stats (admin)
export const getStats = () => api.get("/admin/stats");

export default api;
