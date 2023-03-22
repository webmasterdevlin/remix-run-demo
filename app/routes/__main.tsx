import React from "react";
import { Outlet } from "@remix-run/react";
import Navigation from "~/components/navigation";

export default function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
