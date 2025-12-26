import api from "./axios";

export const getProfileRequest = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const updateProfileRequest = async (data) => {
  const res = await api.put("/auth/profile", data);
  return res.data;
};
