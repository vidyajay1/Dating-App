// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AlienSsoProvider } from "@alien_org/sso-sdk-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlienSsoProvider
    config={{
      ssoBaseUrl: "https://sso.alien-api.com",
      providerAddress: "000000020400000000004505fd4156fe", // Your Alien address here
    }}
  >
    <App />
  </AlienSsoProvider>
);
