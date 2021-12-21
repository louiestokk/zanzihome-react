import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider, userProvider } from "./user_context";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProvider>
  </Auth0Provider>,

  document.getElementById("root")
);
