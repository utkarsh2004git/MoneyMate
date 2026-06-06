import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  // Fallback in case data is empty or still loading
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-slate-500">
        No chart data available
      </div>
    );
  }

  return (
    // The wrapper defines the height so ResponsiveContainer knows how to scale
    <div className="w-full h-72 md:h-80 relative ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Main Donut Ring */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%" // Creates the donut hole
            outerRadius="85%" // Outer edge of the chart
            paddingAngle={3}  // Adds a small gap between slices
            dataKey="amount"  // Tells Recharts to use the 'amount' field for slice size
            nameKey="name"    // Tells Recharts to use the 'name' field for labels/tooltips
            stroke="none"     // Removes the default border around slices
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Hover Tooltip */}
          <Tooltip
            formatter={(value) => `₹${value.toLocaleString()}`} // Adds Rupee symbol to hover state
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />

          {/* Bottom Legend */}
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
          />

          {/* Centered Text Logic */}
          {showTextAnchor && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {/* Top line (e.g., "Total Balance") */}
              <tspan
                x="50%"
                dy="-25" // Shifts text up slightly
                className="text-sm fill-slate-500 font-medium"
              >
                {label}
              </tspan>
              {/* Bottom line (e.g., "₹50,000") */}
              <tspan
                x="50%"
                dy="24" // Shifts text down to sit below the label
                className="text-2xl fill-slate-800 font-bold"
              >
                {totalAmount}
              </tspan>
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;