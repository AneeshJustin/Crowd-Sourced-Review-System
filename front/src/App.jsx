import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import CreatePage from "./pages/Add";
import Feed from "./pages/Feed";
import AuthForm from "./userAuth/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: !isLoggedIn ? (
        <AuthForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/",
      element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "add", element: <CreatePage /> },
        { path: "feed/:type", element: <Feed /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
