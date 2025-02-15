// Importă React, necesar pentru orice aplicație React
import React, { StrictMode } from "react";
// Importă `createRoot` din ReactDOM pentru a randa aplicația în DOM
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// Importă componenta principală a aplicației
import App from "./App";

// Selectează elementul cu id-ul "app" din index.html și creează rădăcina aplicației React
const root = createRoot(document.getElementById("app"));

root.render(
  <StrictMode>
    {/* Montează componenta App în DOM */}
    <App />
  </StrictMode>
);
