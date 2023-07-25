import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardNav from "./components/DashboardNav";
import DashboardRoutes from "./Routes/DashboardRoutes";

const DashboardLayout = () => {
  const path = useLocation()?.pathname.replaceAll("/", "");
  const formattedPathName = path === "home" ? "DASHBOARD" : path?.toUpperCase();
  return (
    <div>
      <div className="flex w-full h-screen">
        <Sidebar />
        <div className="w-full h-screen">
          <DashboardNav page={formattedPathName} />
          <div>{<DashboardRoutes />}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
