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
import Notes from "./pages/Notes";

import SingleNote from "./pages/SingleNote";
import SingleTreatment from "./pages/SingleTreatment";

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
      { path: "dashboard", element: <Dashboard /> },
      // { path: 'products', element: <ProductList /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "profile", element: <Profile /> },
      { path: "calender", element: <Calender /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
