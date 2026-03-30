import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./components/Kitchens/KitchensContext.jsx";
import { KitchensProvider } from "./components/Kitchens/KitchensContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <KitchensProvider>
        <App />
      </KitchensProvider>
    </BrowserRouter>
  </StrictMode>,
);
