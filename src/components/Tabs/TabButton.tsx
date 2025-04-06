import React from "react";
import "./styles.css";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-button ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
};
