import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../utils/colors";
import { CustomTooltip } from "./CustomTooltip";

interface EnergyData {
  fuel: string;
  perc: number;
}

interface HorizontalBarChartProps {
  data: EnergyData[];
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
}) => {
  const transformedData = data.map((item, index) => ({
    name: item.fuel,
    value: item.perc,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <BarChart
        width={350}
        height={350}
        data={transformedData}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickFormatter={(value) => `${value.toFixed(2)}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={80}
          style={{ fontSize: "0.8rem" }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {transformedData.map((entry, index) => (
            <Bar key={`cell-${index}`} dataKey="value" />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};
