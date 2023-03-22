/*
Responsible for providing the structure of the application. 
Its default export is a component that renders the full HTML tree
that every other route loads and depends on.
*/
import type { ReactNode } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import toastStyles from "react-toastify/dist/ReactToastify.css";
import stylesheet from "~/styles/tailwind.css";

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
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title = `Remix: So great, it's funny!`,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body className="dark">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="container prose w-full p-4">{children}</div>;
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see. Back to <Link to="/">safety</Link>.
          </p>
        </div>
      </Layout>
    </Document>
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
