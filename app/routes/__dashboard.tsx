import React from "react";
import { Link, Outlet, useCatch } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div className="flex content-start items-center">
      <h3>Sidebar Navigation Menus here</h3>
      <Outlet />
    </div>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <div>
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
      <hr />
      <p>
        Back to <Link to="/">safety</Link>.
      </p>
    </div>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to. Back to <Link to="/">safety</Link>.
        </p>
      );
      break;
    case 404:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that does not exist. Back
          to <Link to="/">safety</Link>.
        </p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}
