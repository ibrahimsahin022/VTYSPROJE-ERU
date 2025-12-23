export default function RiskForm() {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        Bilgilerinizi Girin
      </h2>

      <form className="space-y-4">
        <input
          type="number"
          placeholder="Yaş"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Eğitim Seviyesi</option>
          <option>Lise</option>
          <option>Üniversite</option>
          <option>Yüksek Lisans</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold"
        >
          Riski Hesapla
        </button>
      </form>
    </div>
  )
}
