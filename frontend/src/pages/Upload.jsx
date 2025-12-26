import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { uploadCVRequest } from "../api/upload.service";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await uploadCVRequest(file);
      setMessage("CV başarıyla yüklendi ✅");
      console.log(res);
    } catch (err) {
      setMessage("Upload başarısız ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4">CV Yükle</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Yükleniyor..." : "Yükle"}
        </button>

        {message && <p className="mt-3">{message}</p>}
      </form>
    </MainLayout>
  );
};

export default Upload;
