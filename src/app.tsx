import React, { useState, useEffect } from "react";
import { fetchGenerationData } from "./services/fetchGenerationData";
import { BarChart } from "./components/BarChart";
import { HorizontalBarChart } from "./components/HorizontalBarChart";
import { Tabs, ChartType } from "./components/Tabs";
import { IEnergyData, IEnergyResult } from "./types/EnergyInterfaces";
import { RadioButton } from "./components/RadioButton";
import { PieChart } from "./components/PieChart";
import "./app.css";
import { Spinner } from "./components/Spinner/Spinner";

type SortOrder = "default" | "asc" | "desc";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const App = () => {
  const [data, setData] = useState<IEnergyResult>({} as IEnergyResult);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [activeTab, setActiveTab] = useState<ChartType>("radial");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const handleFetchGenetarion = async () => {
    try {
      const value = await fetchGenerationData();
      setData(value);
      setDateRange({ from: value.from, to: value.to });
    } catch (error) {
      setData({
        generationmix: [],
        from: "",
        to: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchGenetarion();
  }, []);

  const getSortedData = (dataSet: IEnergyData[]) => {
    if (sortOrder === "default") return dataSet;
    return [...dataSet].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.perc - b.perc;
      }
      return b.perc - a.perc;
    });
  };

  if (loading) {
    return <Spinner />;
  }

  const filters = [
    { value: "default", label: "Default Order" },
    { value: "asc", label: "Min to Max" },
    { value: "desc", label: "Max to Min" },
  ];

  const tabs = [
    { value: "radial", label: "Horizontal Chart" },
    { value: "pie", label: "Pie Chart" },
    { value: "bar", label: "Bar Chart" },
  ];

  const renderChart = () => {
    const sortedData = getSortedData(data.generationmix);
    switch (activeTab) {
      case "radial":
        return <HorizontalBarChart data={sortedData} />;
      case "pie":
        return <PieChart data={sortedData} />;
      case "bar":
        return <BarChart data={sortedData} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1>UK Energy Mix</h1>
      <div className="controls-container">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="filters-container">
          {filters.map(({ value, label }) => (
            <RadioButton
              key={value}
              name="sort-order"
              value={value}
              checked={sortOrder === value}
              onChange={(value) => setSortOrder(value as SortOrder)}
              label={label}
            />
          ))}
        </div>
      </div>
      {dateRange.from && dateRange.to && (
        <div className="date-range">
          {formatDate(dateRange.from)} to {formatDate(dateRange.to)}
        </div>
      )}
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export { App };
