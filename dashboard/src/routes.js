import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import CustomerList from "src/pages/CustomerList";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import Profile from "src/pages/Profile";
import Calender from "src/pages/Calender";
import CalenderDetails from "src/pages/CalenderDetails";
import Notes from "./pages/Notes";

import SingleNote from "./pages/SingleNote";
import SingleTreatment from "./pages/SingleTreatment";

const userId = sessionStorage.getItem("userId");

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      // { path: 'account', element: <Account /> },
      { path: "customers", element: <CustomerList /> },
      { path: "notes", element: <Notes /> },
      { path: "singlenote", element: <SingleNote /> },
      { path: "singletreatment", element: <SingleTreatment /> },
      {
        path: "dashboard",
        element: userId === null ? <Navigate to="/login" /> : <Dashboard />,
      },
      // { path: 'products', element: <ProductList /> },
      {
        path: "settings",
        element: userId === null ? <Navigate to="/login" /> : <Settings />,
      },
      { path: "*", element: <Navigate to="/404" /> },
      {
        path: "profile",
        element: userId === null ? <Navigate to="/login" /> : <Profile />,
      },
      {
        path: "calender",
        element: userId === null ? <Navigate to="/login" /> : <Calender />,
      },
      {
        path: "calender/:id",
        element:
          userId === null ? <Navigate to="/login" /> : <CalenderDetails />,
      },
    ],
  },
  {
    path: "login",
    element: userId === null ? <Login /> : <Navigate to="/app/dashboard" />,
  },
  {
    path: "register",
    element: userId === null ? <Register /> : <Navigate to="/app/dashboard" />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "404", element: <NotFound /> },
      {
        path: "/",
        element:
          userId === null ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/app/dashboard" />
          ),
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
