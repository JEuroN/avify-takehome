import React from "react";
import { render, fireEvent } from "../../../__tests__/test-utils";
import { RadioButton } from "../RadioButton";

describe("RadioButton", () => {
  const defaultProps = {
    name: "test-radio",
    value: "test-value",
    checked: false,
    onChange: jest.fn(),
    label: "Test Label",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label", () => {
    const { getByText } = render(<RadioButton {...defaultProps} />);
    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("renders in unchecked state by default", () => {
    const { getByRole } = render(<RadioButton {...defaultProps} />);
    expect(getByRole("radio")).not.toBeChecked();
  });

  it("renders in checked state when specified", () => {
    const { getByRole } = render(<RadioButton {...defaultProps} checked={true} />);
    expect(getByRole("radio")).toBeChecked();
  });

  it("calls onChange handler when clicked", () => {
    const { getByRole } = render(<RadioButton {...defaultProps} />);
    fireEvent.click(getByRole("radio"));
    expect(defaultProps.onChange).toHaveBeenCalledWith("test-value");
  });

  describe("Disabled state", () => {
    it("renders in disabled state", () => {
      const { getByRole } = render(
        <RadioButton {...defaultProps} disabled={true} />
      );
      expect(getByRole("radio")).toBeDisabled();
    });
  });
});
