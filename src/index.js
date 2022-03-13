import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./user_context";
import { FormProvider } from "./form_ads_context";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <Provider store={store}>
        <AppProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </AppProvider>
      </Provider>
    </UserProvider>
  </Auth0Provider>,

  document.getElementById("root")
);
