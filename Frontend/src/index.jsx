import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignUpTela } from "./screens/SignUpTela/SignUpTela.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <SignUpTela />
  </StrictMode>,
);
