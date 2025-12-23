export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
      <div
        className="h-4 rounded-full bg-indigo-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
