import React from "react";
import { TabButton } from "./TabButton";
import "./styles.css";

export type ChartType = "radial" | "pie" | "bar";

interface TabsProps {
  activeTab: ChartType;
  onTabChange: (tab: ChartType) => void;
  tabs: { value: ChartType; label: string }[];
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="tabs-container">
      {tabs.map(({ value, label }) => (
        <TabButton
          key={value}
          active={activeTab === value}
          onClick={() => onTabChange(value)}
        >
          {label}
        </TabButton>
      ))}
    </div>
  );
};
