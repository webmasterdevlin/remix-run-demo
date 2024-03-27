import { authenticator } from "~/utils/auth.server";
import { redirect } from "@remix-run/node";

import type { ActionFunctionArgs } from "@remix-run/node";

export let loader = () => redirect("/login");

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};
