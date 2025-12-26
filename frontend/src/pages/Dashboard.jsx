import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLatestAnalysisRequest,
  createAnalysisRequest,
} from "../api/analysis.service";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await getLatestAnalysisRequest();
        setAnalysis(data);
      } catch {
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const handleRunAnalysis = async () => {
    try {
      setRunning(true);
      await createAnalysisRequest();
      const latest = await getLatestAnalysisRequest();
      setAnalysis(latest);
    } finally {
      setRunning(false);
    }
  };

  const riskPercent = Math.round((analysis?.riskScore || 0) * 100);

  const userName =
    user?.fullName || user?.name || user?.username || "Kullanıcı";

  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            İşsizlik
            <span className="ml-2 text-teal-600 tracking-wide">
              Risk Analizi
            </span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100 transition"
            >
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                {avatarLetter}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {userName}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border overflow-hidden">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                >
                  Profilim
                </button>
                <button
                  onClick={() => navigate("/analysis-history")}
                  className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                >
                  Analiz Geçmişi
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full px-5 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-8 py-16 space-y-14">
        {/* PAGE TITLE */}
        <div>
          <h2 className="text-6xl font-extrabold tracking-tight text-gray-900">
            Ana Sayfa
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Yapay zeka destekli kariyer risk analizinizin genel görünümü
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            Yükleniyor...
          </div>
        )}

        {!loading && analysis && (
          <>
            {/* ÜST KARTLAR */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* RİSK GRAFİĞİ */}
              <div className="bg-white rounded-3xl shadow-2xl p-12 flex justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke="url(#riskGrad)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 100}
                      strokeDashoffset={
                        2 * Math.PI * 100 * (1 - riskPercent / 100)
                      }
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="riskGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">%{riskPercent}</span>
                    <span className="mt-2 text-sm font-medium text-teal-700">
                      Risk Skoru
                    </span>
                  </div>
                </div>
              </div>

              {/* ÖZET */}
              <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Genel Değerlendirme
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Yapay zeka modelimiz mevcut kariyer verilerinizi analiz etti.
                </p>

                <div className="grid grid-cols-3 gap-5">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500">Risk Skoru</p>
                    <p className="text-xl font-semibold">%{riskPercent}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500">Seviye</p>
                    <p className="text-xl font-semibold">
                      {analysis.level}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500">Son Analiz</p>
                    <p className="text-xl font-semibold">
                      {new Date(analysis.asOf).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI RİSK ÖNERİLERİ */}
            {Array.isArray(analysis.reasons) && (
              <div className="bg-white rounded-3xl shadow-2xl p-10">
                <h3 className="text-2xl font-semibold mb-6">
                  Yapay Zeka Risk Önerileri
                </h3>

                <div className="space-y-4">
                  {analysis.reasons.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-gray-50">
                      <p className="font-medium">{r.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KARİYER YOL HARİTASI */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-6">
              <h3 className="text-3xl font-bold">
                Yapay Zeka Kariyer Yol Haritası
              </h3>

              <p className="text-gray-700">
                Yapay zeka modeli, mevcut profiliniz ve piyasa trendlerini
                dikkate alarak uzun vadeli bir kariyer yönlendirmesi sunar.
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Mevcut sektörde derinleşme veya yatay geçiş</li>
                <li>Risk seviyesini düşürecek kritik beceriler</li>
                <li>Alternatif kariyer yolları</li>
                <li>Sürdürülebilirlik önerileri</li>
              </ul>
            </div>

            {/* ANALİZ BAŞLAT + CV YÜKLE */}
            <div className="bg-white rounded-3xl shadow-xl p-8 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">Yeni Analiz</h4>
                <p className="text-gray-600 text-sm">
                  Güncel verilerle yeni analiz başlatabilirsiniz.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/upload-cv")}
                  className="px-8 py-4 rounded-2xl bg-teal-100 hover:bg-teal-200 text-teal-800 font-medium transition"
                >
                  CV Yükle
                </button>

                <button
                  onClick={handleRunAnalysis}
                  disabled={running}
                  className="px-10 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {running ? "Analiz Yapılıyor..." : "Analizi Başlat"}
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
