import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCVRequest } from "../api/upload.service";

const CvUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Lütfen bir CV dosyası seçin");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await uploadCVRequest(file);
      setResult(res.profile || null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "CV yüklenirken bir hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        {/* ÜST ŞERİT */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-500 to-amber-400" />

        {/* ANA SAYFAYA DÖN */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            ← Ana Sayfaya Dön
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          CV Yükle
        </h1>
        <p className="text-gray-600 mb-8">
          CV’nizi yükleyerek becerilerinizi analiz edelim ve profilinizi
          güçlendirelim.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DOSYA SEÇ */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-teal-500 transition">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />

            <div className="text-center space-y-2">
              <div className="text-4xl">📄</div>
              <p className="font-medium text-gray-700">
                {file ? file.name : "CV dosyanızı seçin"}
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC veya DOCX formatları desteklenir
              </p>
            </div>
          </label>

          {/* HATA */}
          {error && (
            <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-4 rounded-2xl">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* YÜKLE BUTONU */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg transition disabled:opacity-60"
          >
            {loading ? "CV İşleniyor..." : "CV’yi Yükle"}
          </button>
        </form>

        {/* SONUÇ */}
        {result && (
          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-3 text-teal-700 bg-teal-50 p-4 rounded-2xl">
              <span className="text-xl">✅</span>
              <span className="font-medium">
                CV başarıyla işlendi
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Çıkarılan Beceriler
              </h3>

              {Array.isArray(result.skills) &&
              result.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  CV’den beceri çıkarılamadı.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CvUpload;
