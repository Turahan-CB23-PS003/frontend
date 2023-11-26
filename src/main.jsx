import React from "react";
import ReactDOM from "react-dom/client";
// import HomePage from "./Homepage.jsx";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'
import UserDashboard from "./Dashboard.jsx";

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserDashboard />
    </ChakraProvider>
  </React.StrictMode>,
);