import { data } from "autoprefixer";
import axios from "./axios";

// 🔐 LOGIN
export const loginRequest = async (data) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

// 📝 REGISTER
export const registerRequest = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

// 👤 PROFİL
export const getProfile = async () => {
  const res = await axios.get("/profile");
  return res.data;
};

// 🌐 OAUTH
export const loginWithGoogle = () => {
  window.location.href = "http://localhost:4001/auth/google";
};

export const loginWithGithub = () => {
  window.location.href = "http://localhost:4001/auth/github";
};
