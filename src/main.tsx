import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { DesignModeProvider } from "./components/mode/DesignModeProvider";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <DesignModeProvider>
      <App />
    </DesignModeProvider>
  </StrictMode>,
);
