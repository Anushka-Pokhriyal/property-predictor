import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor for error normalization
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.errors?.[0] ||
      err.response?.data?.error ||
      err.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export const predictPrice = (data) => api.post("/predict", data);
export const fetchHistory = (page = 1, limit = 8) =>
  api.get(`/history?page=${page}&limit=${limit}`);
export const deleteHistory = (id) => api.delete(`/history/${id}`);

export default api;