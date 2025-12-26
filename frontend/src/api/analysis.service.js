import api from "./axios";

/**
 * 🔹 Yeni analiz başlatır
 * Backend: POST /analysis/run
 */
export const createAnalysisRequest = async () => {
  const res = await api.post("/analysis/run");
  return res.data;
};

/**
 * 🔹 Kullanıcının EN SON analizini getirir
 * Backend: GET /analysis/latest
 */
export const getLatestAnalysisRequest = async () => {
  const res = await api.get("/analysis/latest");
  return res.data;
};

/**
 * 🔹 Analiz geçmişi (sayfalı)
 * Backend: GET /analysis/history
 */
export const getAnalysisHistoryRequest = async (page = 1, limit = 10) => {
  const res = await api.get("/analysis/history", {
    params: { page, limit },
  });
  return res.data;
};

/**
 * 🔹 Tek analiz getir
 * Backend: GET /analysis/:id
 */
export const getAnalysisByIdRequest = async (id) => {
  const res = await api.get(`/analysis/${id}`);
  return res.data;
};

/**
 * 🔹 Analiz sil
 * Backend: DELETE /analysis/:id
 */
export const deleteAnalysisRequest = async (id) => {
  const res = await api.delete(`/analysis/${id}`);
  return res.data;
};
