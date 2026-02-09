import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

export const forgotPassword = async (email) => {
  const res = await axios.post(
    `${API_BASE_URL}/forgot-password`,
    { email }
  );
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await axios.post(
    `${API_BASE_URL}/reset-password/${token}`,
    { password }
  );
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `${API_BASE_URL}/login`,
    data
  );
  return res.data;
};