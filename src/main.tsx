import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <BrowserRouter>
      <Auth0Provider
        domain="trilha-info.us.auth0.com"
        clientId="ZPGRWe1CKiY84dCDtfTm6yy3ibSQbH4s"
        redirectUri={window.location.origin + "/login"}
        audience="TrilhaInfoApi"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ChakraProvider>
);
