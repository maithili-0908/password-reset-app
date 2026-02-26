import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/auth`,
});

export const forgotPassword = (email) =>
  API.post("/forgot-password", { email });

export const resetPassword = (token, password) =>
  API.post(`/reset-password/${token}`, { password });