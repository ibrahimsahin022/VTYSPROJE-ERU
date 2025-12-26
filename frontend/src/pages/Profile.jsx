import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Profile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    age: "",
    city: "",
    sector: "",
    experienceYears: "",
    skills: "",
    education: {
      degree: "",
      field: "",
      university: "",
      graduationYear: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  /* 🔹 PROFİLİ ÇEK */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        setForm({
          fullName: res.data.fullName || "",
          phone: res.data.phone || "",
          age: res.data.age || "",
          city: res.data.city || "",
          sector: res.data.sector || "",
          experienceYears: res.data.experienceYears || "",
          skills: res.data.skills?.join(", ") || "",
          education: {
            degree: res.data.education?.degree || "",
            field: res.data.education?.field || "",
            university: res.data.education?.university || "",
            graduationYear: res.data.education?.graduationYear || "",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* 🔹 INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("education.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        education: {
          ...form.education,
          [key]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* 🔹 KAYDET */
  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    await api.put("/profile", {
      ...form,
      age: Number(form.age) || undefined,
      experienceYears: Number(form.experienceYears) || undefined,
      education: {
        ...form.education,
        graduationYear: Number(form.education.graduationYear) || undefined,
      },
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      {/* HEADER */}
      <header className="bg-white/70 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">
            Profil <span className="text-teal-600">Bilgilerim</span>
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
      <main className="max-w-6xl mx-auto px-8 py-14">
        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Profil Bilgilerim
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Bu bilgiler yapay zeka destekli risk analizinin temelini oluşturur.
            </p>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-8">
            <Input label="Ad Soyad" name="fullName" value={form.fullName} onChange={handleChange} />
            <Input label="Telefon" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Yaş" name="age" type="number" value={form.age} onChange={handleChange} />
            <Input label="Şehir" name="city" value={form.city} onChange={handleChange} />
            <Input label="Sektör" name="sector" value={form.sector} onChange={handleChange} />
            <Input label="Deneyim (Yıl)" name="experienceYears" type="number" value={form.experienceYears} onChange={handleChange} />

            <Input label="Eğitim Derecesi" name="education.degree" value={form.education.degree} onChange={handleChange} />
            <Input label="Bölüm" name="education.field" value={form.education.field} onChange={handleChange} />
            <Input label="Üniversite" name="education.university" value={form.education.university} onChange={handleChange} />
            <Input label="Mezuniyet Yılı" name="education.graduationYear" type="number" value={form.education.graduationYear} onChange={handleChange} />

            <Textarea label="Beceriler (virgülle ayır)" name="skills" value={form.skills} onChange={handleChange} />
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center pt-6 border-t">
            <p className="text-sm text-gray-500">
              Profil ne kadar doluysa AI analizi o kadar güçlü olur
            </p>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-10 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition disabled:opacity-50"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>

          {success && (
            <div className="text-green-600 font-medium">
              ✔ Profil başarıyla güncellendi
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* 🔹 UI BİLEŞENLERİ */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-2">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

export default Profile;
