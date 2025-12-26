const RiskCircle = ({ value }) => {
  const percentage = Math.round((value || 0) * 100);
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const color =
    percentage < 34
      ? "#22c55e" // green
      : percentage < 67
      ? "#eab308" // yellow
      : "#ef4444"; // red

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      {/* Percentage */}
      <div className="absolute mt-12 text-center">
        <p className="text-3xl font-bold">{percentage}%</p>
        <p className="text-sm text-gray-500">Risk Skoru</p>
      </div>
    </div>
  );
};

export default RiskCircle;
