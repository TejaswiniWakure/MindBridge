import React from 'react';

const Chart = ({
  type = 'line', // 'line' or 'bar'
  data = [],
  title = '',
  height = 200,
  className = '',
}) => {
  // Mock data if none is provided
  const chartData = data.length > 0 ? data : [
    { label: 'Mon', value: 30 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 35 },
    { label: 'Thu', value: 60 },
    { label: 'Fri', value: 50 },
    { label: 'Sat', value: 75 },
    { label: 'Sun', value: 65 },
  ];

  const maxVal = Math.max(...chartData.map((d) => d.value), 10);
  const padding = 40;
  const chartHeight = height;
  const chartWidth = 500;
  const graphHeight = chartHeight - padding * 2;
  const graphWidth = chartWidth - padding * 2;

  // Calculate coordinates for SVG rendering
  const points = chartData.map((d, i) => {
    const x = padding + (i * graphWidth) / (chartData.length - 1 || 1);
    const y = chartHeight - padding - (d.value * graphHeight) / maxVal;
    return { x, y, label: d.label, value: d.value };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : '';

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {title && (
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
      )}
      <div className="w-full relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full min-w-[320px] overflow-visible"
        >
          {/* Horizontal Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = padding + ratio * graphHeight;
            const gridVal = Math.round(maxVal * (1 - ratio));
            return (
              <g key={index} className="opacity-40">
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  className="dark:stroke-slate-700"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Render Area & Line Path */}
          {type === 'line' && points.length > 0 && (
            <>
              {/* Gradient Area Fill */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#chartGradient)" />
              {/* Graph Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data Points */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  className="cursor-pointer hover:r-6 hover:stroke-indigo-800 transition-all duration-155"
                />
              ))}
            </>
          )}

          {/* Render Bar Chart */}
          {type === 'bar' && points.map((p, i) => {
            const barWidth = Math.min(24, graphWidth / chartData.length - 8);
            const barHeight = (p.value * graphHeight) / maxVal;
            const barX = p.x - barWidth / 2;
            const barY = chartHeight - padding - barHeight;
            return (
              <g key={i}>
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill="#14b8a6"
                  className="hover:fill-teal-600 transition-colors duration-150 cursor-pointer"
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={chartHeight - padding + 18}
              textAnchor="middle"
              fontSize="10.5"
              fill="#94a3b8"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Chart;
