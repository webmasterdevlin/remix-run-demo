import React from "react";
import { Outlet } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div className="flex content-start items-center">
      <h3>Sidebar Navigation Menus here</h3>
      <Outlet />
    </div>
  );
}
