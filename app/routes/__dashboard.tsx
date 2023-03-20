import { Outlet } from "@remix-run/react";
import React from "react";
import Navigation from "~/components/navigation";

export default function DashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
