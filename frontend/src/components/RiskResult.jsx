import StatCard from "./StatCard"
import ProgressBar from "./ProgressBar"

export default function RiskResult() {
  const risk = 68 // şimdilik sabit (backend gelince dinamik olur)

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        Risk Analizi Sonucu
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard title="Risk Oranı" value="%68" color="text-red-400" />
        <StatCard title="Durum" value="Yüksek" color="text-orange-400" />
      </div>

      <p className="text-gray-400 mb-2">Genel Risk Seviyesi</p>
      <ProgressBar value={risk} />

      <p className="text-sm text-gray-500 mt-4">
        * Bu sonuç yapay zekâ tahmin modeline dayalıdır.
      </p>
    </div>
  )
}
