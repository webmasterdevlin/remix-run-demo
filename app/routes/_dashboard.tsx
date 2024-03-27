import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import Layout from "~/components/layouts";
import Document from "~/components/document";

export default function DashboardLayout() {
  return (
    <div className="flex content-start items-center">
      <h3>Sidebar Navigation Menus here</h3>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title="Something happened">
        <Layout>
          <div>
            <h1>Oops</h1>
            <p>Status: {error.status}</p>
            <p>{error.data.message}</p>
          </div>
        </Layout>
      </Document>
    );
  }
}
