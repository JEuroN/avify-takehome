import React from "react";
import "./styles.css";

interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  checked,
  onChange,
  disabled,
  label,
  name,
  className,
  style,
}) => {
  return (
    <label className={`radio-label ${className || ""}`} style={style}>
      <div className="radio-container">
        <input
          type="radio"
          disabled={disabled}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          className="radio-input"
        />
        <div className="radio-circle" />
        {checked && <div className="radio-dot" />}
      </div>
      {label}
    </label>
  );
};
