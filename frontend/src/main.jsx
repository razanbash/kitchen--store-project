import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { KitchensProvider } from "./context/KitchensContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <KitchensProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "10px",
                  fontSize: "15px",
                },
              }}
            />
            <App />
          </KitchensProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
