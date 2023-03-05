import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./user_context";
import { FormProvider } from "./form_ads_context";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./redux-toolkit/store";

ReactDOM.render(
  <HelmetProvider>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <UserProvider>
          <AppProvider>
            <FormProvider>
              <App />
            </FormProvider>
          </AppProvider>
        </UserProvider>
      </Provider>
    </Auth0Provider>
  </HelmetProvider>,
  document.getElementById("root")
);
