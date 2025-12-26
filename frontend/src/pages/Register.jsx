import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await register({ name, email, password });

      // ✅ Kayıt sonrası login ekranına dön
      navigate("/login");
    } catch {
      setError("Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        flex items-center justify-center px-6
        bg-gradient-to-br
        from-white
        via-teal-200
        to-cyan-700
      "
    >
      {/* glow efektleri */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-white">

        {/* SOL PANEL */}
        <div className="hidden md:flex flex-col justify-center p-12 text-white
          bg-gradient-to-br from-slate-900 via-teal-800 to-cyan-700">

          <h1 className="text-4xl font-bold mb-6">
            İşsizlik Risk Analizi
          </h1>

          <p className="text-white/80 leading-relaxed">
            Sisteme kayıt ol, profilini oluştur ve
            iş gücü piyasasındaki risk durumunu
            bilimsel analizlerle keşfet.
          </p>

          <ul className="mt-8 space-y-2 text-sm text-white/80">
            <li>• Kişisel risk profili oluşturma</li>
            <li>• Veri temelli analiz ve raporlama</li>
            <li>• Akademik karar destek altyapısı</li>
          </ul>

          <div className="mt-10 h-1 w-24 bg-cyan-300 rounded-full" />
        </div>

        {/* SAĞ PANEL */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Kayıt Ol
          </h2>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* AD SOYAD */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Ad Soyad"
                className="w-full rounded-md border border-slate-300 pl-10 pr-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* E-POSTA */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 6 8 6 8-6" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="E-posta"
                className="w-full rounded-md border border-slate-300 pl-10 pr-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* ŞİFRE */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className="w-full rounded-md border border-slate-300 pl-10 pr-10 py-2.5
                focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-cyan-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a3 3 0 0 0 4.24 4.24" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* KAYIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-to-r from-cyan-600 to-teal-600
              py-2.5 text-white font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Kayıt yapılıyor…" : "Kayıt Ol"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Zaten hesabın var mı?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-700 hover:underline cursor-pointer"
            >
              Giriş Yap
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
