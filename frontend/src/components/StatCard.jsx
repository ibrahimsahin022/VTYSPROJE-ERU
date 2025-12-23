export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  )
}
