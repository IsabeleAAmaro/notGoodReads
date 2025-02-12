import React from "react";
import "./style.css";

export const Condition = ({
  label = "8 characters minimum",
  condition,
  className,
  divClassName,
}) => {
  return (
    <div className={`condition ${className}`}>
      <div className={`circle ${condition === "done" ? "circle-done" : ""}`} />
      <div className={`element-characters-minimum ${divClassName}`}>
        {label}
      </div>
    </div>
  );
};
