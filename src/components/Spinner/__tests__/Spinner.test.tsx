import React from "react";
import { render } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("renders spinner container", () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId("spinner")).toHaveClass("spinner-container");
  });

  it("renders spinner animation element", () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector(".spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("maintains proper styling", () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector(".spinner");
    const styles = window.getComputedStyle(spinnerElement as Element);
    expect(styles.animation).toBeDefined();
  });
});
