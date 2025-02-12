import React from "react";
import "./style.css";

export const ButtonText = ({
  type,
  icon,
  theme,
  iconOnly,
  className,
  divClassName,
  text = "Button",
  onClick,
}) => {
  return (
    <button className={`button-text ${className}`} onClick={onClick}>
      <div className={`button-2 ${divClassName}`}>{text}</div>
    </button>
  );
};
