import React from "react";

const Cell = ({ value, onClick, disabled, highlight }) => {
  return (
    <div
      className={`cell ${disabled ? "disabled" : ""} ${highlight ? "highlight" : ""}`}
      onClick={onClick}
      style={{
        transform: disabled ? "scale(0.95)" : "scale(1)",
        transition: "all 0.2s ease"
      }}
    >
      {value && (
        <div style={{ fontSize: "32px" }}>
          {value}
        </div>
      )}
    </div>
  );
};

export default Cell;