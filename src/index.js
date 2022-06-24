import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import './input.css';
import { hydrate, render } from "react-dom";
import { AuthProvider } from "./context/auth-context";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
  
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
      
    </BrowserRouter>
  , rootElement);
} else {
  render(
    <BrowserRouter>
     <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  , rootElement);
}
