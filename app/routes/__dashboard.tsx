import { Outlet } from "@remix-run/react";
import React from "react";

export default function DashboardLayout() {
  return (
    <>
      {
        // own navigation for the dashboard
      }
      <Outlet />
    </>
  );
}
