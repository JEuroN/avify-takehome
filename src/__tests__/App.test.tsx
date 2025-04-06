import React from "react";
import { render, screen, fireEvent, waitFor } from "./test-utils";
import { App } from "../app";
import { fetchGenerationData } from "../services/fetchGenerationData";
import { IEnergyResult } from "../types/EnergyInterfaces";

jest.mock("../services/fetchGenerationData");
const mockFetchGenerationData = fetchGenerationData as jest.MockedFunction<typeof fetchGenerationData>;

const mockData: IEnergyResult = {
  to: "2025-04-06T01:30Z",
  from: "2025-04-06T01:00Z",
  generationmix: [
    { fuel: "nuclear", perc: 20.5 },
    { fuel: "gas", perc: 30.2 },
    { fuel: "wind", perc: 25.8 },
  ],
};

describe("App", () => {
  beforeEach(() => {
    mockFetchGenerationData.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows spinner while loading", () => {
    render(<App />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders data after loading", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("UK Energy Mix")).toBeInTheDocument();
    });

    expect(screen.getByText(`05/04/25, 21:00 to 05/04/25, 21:30`)).toBeInTheDocument();
  });

  it("switches between chart types", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const chartTypes = ["Horizontal Chart", "Pie Chart", "Bar Chart"];
    for (const type of chartTypes) {
      fireEvent.click(screen.getByRole("button", { name: type }));
      expect(screen.getByRole("button", { name: type })).toHaveClass("active");
    }
  });

  it("changes sort order", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const sortOrders = ["Min to Max", "Max to Min", "Default Order"];
    for (const order of sortOrders) {
      fireEvent.click(screen.getByLabelText(order));
      expect(screen.getByLabelText(order)).toBeChecked();
    }
  });

  it("handles API error gracefully", async () => {
    mockFetchGenerationData.mockRejectedValue(new Error("API Error"));
    render(<App />);
    
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });
});