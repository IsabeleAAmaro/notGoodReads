import React from "react";
import "./style.css";

export const Frame = ({
  className,
  frameClassName,
  divClassName,
  text = "Name",
  frameClassNameOverride,
  divClassNameOverride,
  divClassName1,
  onInputChange,
  type = "text"
}) => {
  return (
    <div className={`frame ${className}`}>
      <div className={`name-wrapper ${frameClassName}`}>
        <div className={`name ${divClassName}`}>{text}</div>
      </div>

      <div className={`frame-wrapper ${frameClassNameOverride}`}>
        <div className={`div-wrapper ${divClassNameOverride}`}>
          <input
            type={type}
            placeholder={text}
            className={`input-field ${divClassName1}`}
            onChange={(e) => onInputChange?.(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
