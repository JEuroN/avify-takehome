import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { COLORS } from "../utils/colors";
import { CustomTooltip } from "./CustomTooltip";

interface EnergyData {
  fuel: string;
  perc: number;
}

interface BarChartProps {
  data: EnergyData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const transformedData = data.map((item, index) => ({
    name: item.fuel,
    value: item.perc,
    fill: COLORS[index % COLORS.length],
  }));
  return (
    <div>
      <RechartsBarChart
        width={350}
        height={350}
        data={transformedData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          style={{ fontSize: "0.8rem" }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {transformedData.map((entry, index) => (
            <Bar
              key={`cell-${index}`}
              dataKey="value"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </div>
  );
};
