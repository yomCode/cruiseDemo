import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const DashboardRoutes = () => {
  const Dashboard = lazy(() => import("../screens/Dashboard"));
  const Orders = lazy(() => import("../screens/Orders"));
  const Transactions = lazy(() => import("../screens/Transactions"));
  const Settings = lazy(() => import("../screens/Settings"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
};

export default DashboardRoutes;
