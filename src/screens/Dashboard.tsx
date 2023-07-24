import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardNav from "../components/DashboardNav";

const Dashboard = () => {
  return (
    <div>
      <div className="flex w-full h-screen">
        <Sidebar />
        <DashboardNav page={"Orders"} />
      </div>
    </div>
  );
};

export default Dashboard;
