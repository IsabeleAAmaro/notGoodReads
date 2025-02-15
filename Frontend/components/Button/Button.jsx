/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Button = ({
  property1,
  property2,
  property3,
  property4,
  className,
  divClassName,
  text = "Button",
}) => {
  return (
    <button className={`button ${className}`}>
      <div className={`text-wrapper-2 ${divClassName}`}>{text}</div>
    </button>
  );
};