import api from "./axios";

export const uploadCVRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload/cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
