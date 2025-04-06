import React from "react";
import { render } from "@testing-library/react";
import { CustomTooltip } from "../CustomTooltip";

describe("CustomTooltip", () => {
  const mockPayload = [
    {
      value: 25.5,
      name: "nuclear",
      payload: {
        fuel: "nuclear",
        perc: 25.5,
      },
    },
  ];

  it("renders nothing when inactive", () => {
    const { container } = render(
      <CustomTooltip active={false} payload={mockPayload} label="nuclear" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing without payload", () => {
    const { container } = render(
      <CustomTooltip active={true} payload={[]} label="nuclear" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("displays correct content with label", () => {
    const { getByTestId } = render(
      <CustomTooltip active={true} payload={mockPayload} label="nuclear" />
    );
    const label = getByTestId("tooltip-label");
    expect(label.textContent).toBe("nuclear: 25.50%");
  });

  it("uses payload name when no label provided", () => {
    const { getByTestId } = render(
      <CustomTooltip active={true} payload={mockPayload} />
    );
    const label = getByTestId("tooltip-label");
    expect(label.textContent).toBe("nuclear: 25.50%");
  });

  it("formats decimal numbers correctly", () => {
    const longDecimalPayload = [
      {
        value: 25.5678,
        name: "nuclear",
        payload: {
          fuel: "nuclear",
          perc: 25.5678,
        },
      },
    ];

    const { getByTestId } = render(
      <CustomTooltip active={true} payload={longDecimalPayload} />
    );
    const label = getByTestId("tooltip-label");
    expect(label.textContent).toBe("nuclear: 25.57%");
  });
});
