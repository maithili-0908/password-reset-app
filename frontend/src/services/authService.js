import axios from "axios";

const API = axios.create({
  baseURL: "https://password-reset-backend.onrender.com/api/auth"
});

export const forgotPassword = (email) =>
  API.post("/forgot-password", { email });

export const resetPassword = (token, password) =>
  API.post(`/reset-password/${token}`, { password });

export const loginUser = (data) =>
  API.post("/login", data);