"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  date: string;
  sales: number;
};

export default function ResponsiveLineChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Sales ($)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
