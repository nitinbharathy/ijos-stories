import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ServicePage } from "./ServicePage.jsx";
import { getService } from "./serviceData.js";
import "./design-tokens.css";
import "./styles.css";

const service = getService(window.location.pathname.replace(/^\/+|\/+$/g, ""));

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {service ? <ServicePage service={service} /> : <App />}
  </React.StrictMode>,
);
