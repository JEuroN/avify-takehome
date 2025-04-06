import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { COLORS } from "../utils/colors";
import { CustomTooltip } from "./CustomTooltip";

interface EnergyData {
  fuel: string;
  perc: number;
}

interface PieChartProps {
  data: EnergyData[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div style={{ width: "100%" }}>
      <RechartsPieChart width={350} height={350}>
        <Pie
          data={data}
          labelLine={true}
          label={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="perc"
          nameKey="fuel"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconSize={14}
          iconType="circle"
          formatter={(name) =>
            `${name} ${data.find((item) => item.fuel === name)?.perc}%`
          }
        />
      </RechartsPieChart>
    </div>
  );
};
