import React from "react";
import "./App.css";
import { MetaMaskContextProvider } from "./hooks/useMetaMask";
import { ConnectionChecker } from "./components/ConnectionChecker/ConnectionChecker";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

const App = () => {
  return (
    <MetaMaskContextProvider>
      <div className="App">
        <ConnectionChecker>
          <RouterProvider router={router} />
        </ConnectionChecker>
      </div>
    </MetaMaskContextProvider>
  );
};

export default App;
