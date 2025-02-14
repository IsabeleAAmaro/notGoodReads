import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignUpTela } from "./screens/SignUpPage/SignUpTela.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <SignUpTela />
  </StrictMode>,
);
