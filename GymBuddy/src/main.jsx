import React from "react";
import ReactDOM from "react-dom/client"; // Use the correct import for React 18
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <Router>
    <App />
  </Router>
);