import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RefreshProvider } from "./Contexts/RefreshContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RefreshProvider>
          <App />
      </RefreshProvider>
    </BrowserRouter>
  </StrictMode>
);
