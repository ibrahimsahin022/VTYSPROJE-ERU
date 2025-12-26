import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAnalysisHistoryRequest,
  deleteAnalysisRequest,
} from "../api/analysis.service";
import { useAuth } from "../context/AuthContext";

const levelColors = {
  Düşük: "bg-green-100 text-green-700",
  Orta: "bg-yellow-100 text-yellow-700",
  Yüksek: "bg-red-100 text-red-700",
};

const AnalysisHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [page]);

  const fetchHistory = async () => {
    try {
      const res = await getAnalysisHistoryRequest(page, 10);
      setHistory(res.items || res || []);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu analizi silmek istediğinize emin misiniz?")) return;

    await deleteAnalysisRequest(id);
    setHistory((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">
            Analiz
            <span className="ml-2 text-teal-600">Geçmişi</span>
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
          >
            ← Ana Sayfa
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight">
            Geçmiş Analizler
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Yapay zeka tarafından oluşturulan önceki risk analizlerinizi
            kronolojik olarak görüntüleyin.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            Yükleniyor...
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="bg-white rounded-3xl p-10 shadow-xl text-gray-600">
            Henüz analiz geçmişiniz bulunmuyor.
          </div>
        )}

        {/* TIMELINE */}
        <div className="relative border-l-2 border-teal-200 ml-6 space-y-12">
          {history.map((item, index) => {
            const riskPercent = Math.round((item.riskScore || 0) * 100);

            return (
              <div key={item._id || index} className="relative pl-10">
                {/* DOT */}
                <div className="absolute -left-[14px] top-2 w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>

                {/* CARD */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(item.asOf).toLocaleDateString("tr-TR")}
                      </p>
                      <h3 className="text-2xl font-semibold mt-1">
                        Risk Skoru %{riskPercent}
                      </h3>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        levelColors[item.level] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.level || "Bilinmiyor"}
                    </span>
                  </div>

                  {/* PROGRESS */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          riskPercent < 34
                            ? "bg-green-500"
                            : riskPercent < 67
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${riskPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* REASONS */}
                  {Array.isArray(item.reasons) &&
                    item.reasons.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <h4 className="font-medium text-gray-900">
                          Yapay Zeka Açıklamaları
                        </h4>

                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {item.reasons.map((r, i) => (
                            <li key={i}>{r.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* ACTIONS */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {history.length >= 10 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-10 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition"
            >
              Daha Fazla Yükle
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisHistory;
