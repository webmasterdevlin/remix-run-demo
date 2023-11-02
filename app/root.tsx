/*
Responsible for providing the structure of the application. 
Its default export is a component that renders the full HTML tree
that every other route loads and depends on.
*/
import type { MetaFunction } from "@remix-run/node";
import { LiveReload, Outlet, isRouteErrorResponse, useRouteError} from "@remix-run/react";
import "react-toastify/dist/ReactToastify.css";
import "~/styles/tailwind.css";
import Layout from "./components/layouts";
import Document from "./components/document";


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
        <LiveReload />
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
