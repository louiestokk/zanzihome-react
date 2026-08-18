'use client';

import React, { useMemo, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "../redux-toolkit/store";
import { UserProvider } from "../user_context";
import { AppProvider } from "../context";
import { FormProvider } from "../form_ads_context";
import { setFirestoreData } from "../redux-toolkit/firebaseDataSlice";

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear chunk reload item from localStorage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("page-has-refreshed-after-chunk-error");
    }

    const fetchFirestoreData = async () => {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("API response error");
        const newData = await res.json();
        dispatch(setFirestoreData(newData));
      } catch (err) {
        console.error("Error fetching Firestore data via API:", err);
      }
    };

    fetchFirestoreData();
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }) {
  const domain = process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN || process.env.REACT_APP_AUTH_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_REACT_APP_AUTH_CLIENT_ID || process.env.REACT_APP_AUTH_CLIENT_ID;

  const redirectUri = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }

    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.URL) return process.env.URL;
    if (process.env.DEPLOY_URL) return process.env.DEPLOY_URL;
    if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL;

    return "http://localhost:3000";
  }, []);

  return (
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={redirectUri}
        cacheLocation="localstorage"
        authorizationParams={{ redirect_uri: redirectUri }}
      >
        <UserProvider>
          <AppProvider>
            <FormProvider>
              <AppInitializer>
                {children}
              </AppInitializer>
            </FormProvider>
          </AppProvider>
        </UserProvider>
      </Auth0Provider>
    </Provider>
  );
}
