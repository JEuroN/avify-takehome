import React from "react";
import "./styles.css";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" data-testid="custom-tooltip">
        <p className="tooltip-label" data-testid="tooltip-label">
          {`${label || payload[0].name}: ${Number(payload[0].value).toFixed(
            2
          )}%`}
        </p>
      </div>
    );
  }

  return null;
};
