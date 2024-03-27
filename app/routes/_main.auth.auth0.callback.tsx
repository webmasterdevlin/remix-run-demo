import { authenticator } from "~/utils/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

export let loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};
