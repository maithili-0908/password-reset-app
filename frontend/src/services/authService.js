import axios from "axios";
import { API_URL } from "../config";

export const forgotPassword = email =>
  axios.post(`${API_URL}/forgot-password`, { email });

export const resetPassword = (token, password) =>
  axios.post(`${API_URL}/reset-password/${token}`, { password });

export const validateToken = token =>
  axios.get(`${API_URL}/reset-password/${token}`);