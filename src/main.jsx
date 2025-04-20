import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
axios.defaults.baseURL = "http://localhost:3002";
// axios.defaults.baseURL = "https://pruebadeploy-393802.uw.r.appspot.com"
// axios.defaults.baseURL = "https://arriendalobackend-production.up.railway.app" 
// axios.defaults.baseURL = "https://arriendalo-server-production.up.railway.app" 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
