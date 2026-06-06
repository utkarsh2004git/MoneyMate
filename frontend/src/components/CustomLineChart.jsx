import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, lineColor }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload;

  if (!data) return null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        minWidth: "180px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: 600,
          color: "#374151",
          fontSize: "14px",
        }}
      >
        {data.month}
      </p>

      <p
        style={{
          margin: "12px 0",
          fontSize: "14px",
          fontWeight: 700,
          color: "#374151",
        }}
      >
        Total:{" "}
        <span style={{ color: lineColor }}>
          ₹{Number(data.totalAmount || 0).toLocaleString()}
        </span>
      </p>

      {data.items?.length > 0 && (
        <>
          <div
            style={{
              height: "1px",
              background: "#E5E7EB",
              marginBottom: "8px",
            }}
          />

          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            Details:
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {data.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "#4B5563" }}>
                  {item.name}
                </span>

                <span
                  style={{
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  ₹{Number(item.amount || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CustomLineChart = ({
  data = [],
  height = 300,
  lineColor = "#3B82F6", // green for income
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="incomeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={lineColor}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={lineColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            domain={[0, (dataMax) => dataMax + 5000]}
          />

          <Tooltip
            content={<CustomTooltip lineColor={lineColor} />}
            cursor={{
              stroke: "#D1D5DB",
              strokeWidth: 1,
            }}
          />

          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke={lineColor}
            strokeWidth={3}
            fill="url(#incomeGradient)"
            fillOpacity={1}
            dot={{
              r: 4,
              fill: lineColor,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: lineColor,
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;