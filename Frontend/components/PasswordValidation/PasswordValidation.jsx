import React from "react";
import { Condition } from "../Condition";
import "./style.css";

export const PasswordValidation = ({
  status,
  className,
  progressClassName,
  conditionDivClassName,
  conditionLabel = "8 characters minimum",
  conditionDivClassNameOverride,
  conditionLabel1 = "a number",
  conditionDivClassName1,
  conditionLabel2 = "a symbol",
  password = "",
}) => {
  const hasEightChars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*+]/.test(password);

  const validConditions = [hasEightChars, hasNumber, hasSymbol].filter(Boolean).length;
  const progressWidth = `${(validConditions / 3) * 100}%`;

  const getProgressClass = () => {
    if (validConditions === 0) return "";
    if (validConditions === 3) return "complete";
    return "partial";
  };

  return (
    <div className={`password-validation ${className}`}>
      <div className="progress">
        <div
          className={`progress-bar ${getProgressClass()} ${progressClassName}`}
          style={{
            width: progressWidth,
          }}
        />
      </div>

      <div className="frame-2">
        <Condition
          className="condition-instance"
          condition={hasEightChars ? "done" : "undone"}
          divClassName={conditionDivClassName}
          label={conditionLabel}
        />
        <Condition
          className="condition-instance"
          condition={hasNumber ? "done" : "undone"}
          divClassName={conditionDivClassNameOverride}
          label={conditionLabel1}
        />
        <Condition
          className="condition-instance"
          condition={hasSymbol ? "done" : "undone"}
          divClassName={conditionDivClassName1}
          label={conditionLabel2}
        />
      </div>
    </div>
  );
};
