import React from "react";
import "./styles.css";

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="spinner"></div>
    </div>
  );
};
