import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./context/ThemeProvider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0ClientId, auth0Domain } from "./utils/constants.js";
import AppContextProvider from "./context/appContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <h1>Error:</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      clientId={auth0ClientId}
      domain={auth0Domain}
      redirectUri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AppContextProvider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
