import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getLatestAnalysisRequest } from "../api/analysis.service";

const Analysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await getLatestAnalysisRequest();

        // 👇 API response güvenli okuma
        setAnalysis(res?.data || res || null);
      } catch (err) {
        console.log("Henüz analiz yok");
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-xl font-bold mb-4">Analiz</h1>

      {loading && <p>Yükleniyor...</p>}

      {!loading && !analysis && (
        <p>Henüz analiz yapılmamış.</p>
      )}

      {analysis && (
        <div className="bg-gray-800 p-4 rounded">
          <p>Skor: {analysis.riskScore}</p>
          <p>Seviye: {analysis.level}</p>
        </div>
      )}
    </MainLayout>
  );
};

export default Analysis;
