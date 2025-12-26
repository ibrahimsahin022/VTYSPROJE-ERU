import React from "react";

const AnalysisPdf = React.forwardRef(({ analysis, user }, ref) => {
  if (!analysis) return null;

  const riskPercent = Math.round((analysis.riskScore || 0) * 100);

  return (
    <div
      ref={ref}
      style={{ width: "800px", padding: "40px", fontFamily: "Arial" }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 28, marginBottom: 5 }}>
          İşsizlik Risk Analizi
        </h1>
        <p style={{ color: "#555" }}>
          Yapay Zeka Destekli Kariyer Değerlendirme Raporu
        </p>
      </div>

      {/* USER INFO */}
      <div style={{ marginBottom: 25 }}>
        <p>
          <strong>Ad Soyad:</strong> {user?.fullName || "-"}
        </p>
        <p>
          <strong>Rapor Tarihi:</strong>{" "}
          {new Date(analysis.asOf).toLocaleDateString("tr-TR")}
        </p>
      </div>

      {/* RISK */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          marginBottom: 30,
        }}
      >
        <h2>Genel Risk Durumu</h2>
        <p style={{ fontSize: 18 }}>
          <strong>Risk Skoru:</strong> %{riskPercent}
        </p>
        <p>
          <strong>Risk Seviyesi:</strong> {analysis.level}
        </p>
      </div>

      {/* AI REASONS */}
      {Array.isArray(analysis.reasons) && analysis.reasons.length > 0 && (
        <div>
          <h2>Yapay Zeka Açıklamaları</h2>
          <ul>
            {analysis.reasons.map((r, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ marginTop: 40, fontSize: 12, color: "#777" }}>
        Bu rapor yapay zeka tarafından otomatik olarak oluşturulmuştur.
      </div>
    </div>
  );
});

export default AnalysisPdf;
