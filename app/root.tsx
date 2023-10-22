/*
Responsible for providing the structure of the application. 
Its default export is a component that renders the full HTML tree
that every other route loads and depends on.
*/
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import toastStyles from "react-toastify/dist/ReactToastify.css";
import stylesheet from "~/styles/tailwind.css";
import Layout from "./components/layouts";
import Document from "./components/document";

/*
The links function defines which <link> elements to add
to the page when the user visits a route.
*/
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: toastStyles,
    },
    { rel: "stylesheet", href: stylesheet },
  ];
};

/*
The meta export will set meta tags for your html document.
*/
export const meta: MetaFunction = (metaArgs) => {
  return [
    {
      charset: "utf-8",
      title: "New Remix App",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title="Error">
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
