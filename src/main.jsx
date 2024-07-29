import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FirebaseProvider } from "./context/Firebase.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  Register,
  HomePage,
  AuthLayout,
  RoomSection,
} from "./components";
import CabinBoardsDevices from "./components/Cabin/CabinCards/CabinBoardsDevices/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/cabin/:id",
        element: (
          <AuthLayout authentication>
            <RoomSection />
          </AuthLayout>
        ),
      },
      {
        path: "/device",
        element: (
          <AuthLayout authentication>
            <CabinBoardsDevices />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </FirebaseProvider>
  </React.StrictMode>
);
