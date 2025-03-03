import React, { useState } from "react";
import "./ReadingStatusSelector.css";

const ReadingStatusSelector = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("wantToRead");

  // Handle button click and update state
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onStatusChange(status); // Send status to parent component
  };

  return (
    <div className="status-selector">
      <button
        className={`status-button ${selectedStatus === "wantToRead" ? "selected wantToRead" : ""}`}
        onClick={() => handleStatusChange("wantToRead")}
      >
        Want to Read
      </button>

      <button
        className={`status-button ${selectedStatus === "reading" ? "selected reading" : ""}`}
        onClick={() => handleStatusChange("reading")}
      >
        Reading Now
      </button>

      <button
        className={`status-button ${selectedStatus === "completed" ? "selected completed" : ""}`}
        onClick={() => handleStatusChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default ReadingStatusSelector;
