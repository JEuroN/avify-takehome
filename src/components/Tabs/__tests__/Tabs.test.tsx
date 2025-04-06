import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Tabs } from "../Tabs";

describe("Tabs", () => {
  const mockTabs = [
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3" },
  ];

  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all tabs", () => {
    const { getByText } = render(
      <Tabs tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );

    mockTabs.forEach((tab) => {
      expect(getByText(tab.label)).toBeInTheDocument();
    });
  });

  it("calls onTabChange when clicking inactive tab", () => {
    const { getByText } = render(
      <Tabs tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );

    fireEvent.click(getByText("Tab 2"));
    expect(mockOnTabChange).toHaveBeenCalledWith("tab2");
  });

  it("applies correct container styles", () => {
    const { container } = render(
      <Tabs tabs={mockTabs} activeTab="tab1" onTabChange={mockOnTabChange} />
    );

    expect(container.firstChild).toHaveClass("tabs-container");
  });

  it("handles empty tabs array", () => {
    const { container } = render(
      <Tabs tabs={[]} activeTab="" onTabChange={mockOnTabChange} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes.length).toBe(0);
  });
});
