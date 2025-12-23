import { useMemo, useState } from "react";

const initialForm = {
  age: "",
  education: "",
  ageRange: "",
  gender: "",
  sector: "",
  major: "",
  city: "",
  experienceYears: "",
  jobStartDate: "",
  jobChanges12m: "",
  skill: "",
  certificate: "",
};

export default function App() {
  const [step, setStep] = useState(1); // 1..3
  const [form, setForm] = useState(initialForm);

  // Demo (backend bağlayınca response)
  const [risk, setRisk] = useState(0);

  const riskLabel = useMemo(() => {
    if (risk < 33) return "Düşük Seviye Risk";
    if (risk < 66) return "Orta Seviye Risk";
    return "Yüksek Seviye Risk";
  }, [risk]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const goNext = () => setStep((s) => Math.min(3, s + 1));
  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const calculate = () => {
    // demo toggle
    setRisk((r) => (r === 45 ? 62 : 45));
  };

  const newQuery = () => {
    setForm(initialForm);
    setStep(1);
    setRisk(0);
  };

  return (
    <div className="min-h-screen bg-[#151b22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <Card>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">
                İşsizlik Riski Tahmin Sistemi
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Geleceğinizi güvence altına alın. Önleyici tedbirlerinizi planlayın.
              </p>
            </div>

            <Stepper step={step} />

            <div className="mt-6 space-y-6">
              {step === 1 && (
                <Section title="1. Kişisel ve Temel Bilgiler">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Yaşınız"
                      value={form.age}
                      onChange={update("age")}
                    />
                    <Select
                      placeholder="Eğitim"
                      value={form.education}
                      onChange={update("education")}
                      options={["Lise", "Ön Lisans", "Lisans", "Yüksek Lisans"]}
                    />
                    <Select
                      placeholder="Yaş Aralığı"
                      value={form.ageRange}
                      onChange={update("ageRange")}
                      options={["18-24", "25-34", "35-44", "45+"]}
                    />
                    <Select
                      placeholder="Cinsiyet"
                      value={form.gender}
                      onChange={update("gender")}
                      options={["Kadın", "Erkek", "Diğer"]}
                    />
                  </div>

                  <div className="mt-4 space-y-3">
                    <Input
                      placeholder="En uygun sektör (Örn: Bilişim, Perakende...)"
                      value={form.sector}
                      onChange={update("sector")}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Mezun olduğunuz bölüm"
                        value={form.major}
                        onChange={update("major")}
                      />
                      <Input
                        placeholder="Yaşadığınız şehir"
                        value={form.city}
                        onChange={update("city")}
                      />
                    </div>
                  </div>
                </Section>
              )}

              {step === 2 && (
                <Section title="2. Mevcut İstihdam ve Tecrübe">
                  <div className="space-y-3">
                    <Input
                      placeholder="Toplam tecrübe yılınız"
                      value={form.experienceYears}
                      onChange={update("experienceYears")}
                    />
                    <Input
                      placeholder="Toplam işe giriş tarihi (gg.aa.yyyy)"
                      value={form.jobStartDate}
                      onChange={update("jobStartDate")}
                    />
                    <Input
                      placeholder="Son 12 ayda iş değişikliği sayısı"
                      value={form.jobChanges12m}
                      onChange={update("jobChanges12m")}
                    />
                  </div>
                </Section>
              )}

              {step === 3 && (
                <Section title="3. Yetkinlikler ve Eğitim">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Yetkinlik (örn: Excel)"
                      value={form.skill}
                      onChange={update("skill")}
                    />
                    <Input
                      placeholder="Sertifika/Kurs (opsiyonel)"
                      value={form.certificate}
                      onChange={update("certificate")}
                    />
                  </div>
                </Section>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={step === 1}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold
                             text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Geri
                </button>

                {step < 3 ? (
                  <button
                    onClick={goNext}
                    className="w-full rounded-xl bg-sky-500/90 py-3 text-sm font-semibold text-white
                               hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    İleri
                  </button>
                ) : (
                  <button
                    onClick={calculate}
                    className="w-full rounded-xl bg-sky-500/90 py-3 text-sm font-semibold text-white
                               hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    Riski Hesapla
                  </button>
                )}
              </div>

              <button
                onClick={newQuery}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold
                           text-white/80 hover:bg-white/10"
              >
                Yeni Sorgulama
              </button>
            </div>
          </Card>

          {/* RIGHT */}
          <ResultCard risk={risk} riskLabel={riskLabel} />
        </div>
      </div>
    </div>
  );
}

/* ================= UI ================= */

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur">
      {children}
    </div>
  );
}

function Stepper({ step }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <StepDot done={step > 1} active={step === 1} label="1" />
        <div className="h-1 flex-1 rounded bg-white/10">
          <div className={`h-1 rounded bg-sky-400 ${step >= 2 ? "w-full" : "w-1/3"}`} />
        </div>

        <StepDot done={step > 2} active={step === 2} label="2" />
        <div className="h-1 flex-1 rounded bg-white/10">
          <div className={`h-1 rounded bg-sky-400 ${step === 3 ? "w-full" : "w-0"}`} />
        </div>

        <StepDot active={step === 3} label="3" />
      </div>

      <div className="grid grid-cols-3 items-center text-[11px] text-white/60">
        <span className={`truncate ${step === 1 ? "text-sky-300" : ""}`}>1. Kişisel</span>
        <span className={`truncate text-center ${step === 2 ? "text-sky-300" : ""}`}>2. Tecrübe</span>
        <span className={`truncate text-right ${step === 3 ? "text-sky-300" : ""}`}>3. Yetkinlik</span>
      </div>
    </div>
  );
}

function StepDot({ active, done, label }) {
  return (
    <div
      className={[
        "grid h-9 w-9 shrink-0 place-items-center rounded-full border",
        done
          ? "border-sky-400 bg-sky-400/20 text-sky-200"
          : active
          ? "border-sky-400 bg-white/5"
          : "border-white/15 bg-white/5 text-white/70",
      ].join(" ")}
    >
      {done ? "✓" : <span className="text-sm">{label}</span>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-white/90">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Input({ placeholder, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/50
                 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
    />
  );
}

function Select({ placeholder, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white
                 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
    >
      <option value="" disabled className="bg-[#151b22]">
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#151b22]">
          {o}
        </option>
      ))}
    </select>
  );
}

/* ================= RIGHT PANEL ================= */

function ResultCard({ risk, riskLabel }) {
  const show = risk > 0;

  const factors = [
    { label: "Dijital Yetkinlikler", value: 40 },
    { label: "Eğitim Seviyesi", value: 30 },
    { label: "Toplam Tecrübe Yılı", value: 15 },
    { label: "Sektör Değişikliği", value: 15 },
  ];

  return (
    <Card>
      <h2 className="text-center text-2xl font-semibold">Risk Hesaplama Sonuçları</h2>

      {!show ? (
        <div className="mt-10 text-center text-sm text-white/60">
          Sonuçları görmek için sol tarafta bilgileri doldurup{" "}
          <span className="text-sky-300">Riski Hesapla</span>’ya basın.
        </div>
      ) : (
        <>
          <div className="mt-6">
            <Gauge value={risk} />
            <div className="mt-2 text-center">
              <div className="text-6xl font-bold">{risk}%</div>
              <div className="mt-1 text-sm font-semibold text-sky-300">{riskLabel}</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-center text-sm font-semibold text-white/80">
              Risk Faktörleri Dağılımı
            </h3>
            <div className="mx-auto max-w-md">
              <Bars items={factors} />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-center text-sm font-semibold text-white/80">
              Kişiselleştirilmiş Öneriler / İpuçları
            </h3>

            <Advice
              icon="💡"
              title="Öneri"
              text="Dijital yetkinliklerinizi artırarak riskinizi %15 azaltabilirsiniz. Eğitim rotası: Veri Yönetimi ve Python."
            />
            <div className="mt-3" />
            <Advice
              icon="🛡️"
              title="İpucu"
              text="Son 12 ayda iş değişikliği yapmamanız, riskinizi pozitif etkileyebilir."
            />
          </div>
        </>
      )}
    </Card>
  );
}

/* ================= GAUGE (KIRMIZI DAHİL HEPSİ GÖRÜNÜR) ================= */

function Gauge({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  // -90 (sol) -> +90 (sağ)
  const angle = -90 + (v / 100) * 180;

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {/* arka yay */}
        <path
          d="M10 110 A90 90 0 0 1 190 110"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* YEŞİL */}
        <path
          d="M10 110 A90 90 0 0 1 70 40"
          fill="none"
          stroke="#22c55e"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* SARI */}
        <path
          d="M70 40 A90 90 0 0 1 130 40"
          fill="none"
          stroke="#eab308"
          strokeWidth="18"
          strokeLinecap="butt"
        />
        {/* KIRMIZI */}
        <path
          d="M130 40 A90 90 0 0 1 190 110"
          fill="none"
          stroke="#ef4444"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* İĞNE: pivot (100,110) etrafında döner */}
        <g
          transform={`rotate(${angle} 100 110)`}
          style={{ transition: "transform 350ms ease" }}
        >
          <line
            x1="100"
            y1="110"
            x2="100"
            y2="50"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* pivot */}
        <circle cx="100" cy="110" r="6" fill="rgba(255,255,255,0.9)" />
        <circle cx="100" cy="110" r="11" fill="rgba(255,255,255,0.10)" />
      </svg>
    </div>
  );
}

/* ================= BARS + ADVICE ================= */

function Bars({ items }) {
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label} className="grid grid-cols-[150px_1fr_64px] items-center gap-3">
          <div className="truncate text-xs text-white/80">{it.label}</div>
          <div className="relative h-3 overflow-hidden rounded bg-white/10">
            <div className="h-3 rounded bg-sky-500/90" style={{ width: `${it.value}%` }} />
          </div>
          <div className="text-right text-xs text-white/70">{it.value}%</div>
        </div>
      ))}
    </div>
  );
}

function Advice({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-lg">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-sm text-white/70">{text}</div>
        </div>
      </div>
    </div>
  );
}
