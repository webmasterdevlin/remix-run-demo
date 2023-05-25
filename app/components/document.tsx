import {
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from "@remix-run/react";
import type { ReactNode } from "react";

export default function Document({
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
