import React from "react";
import { get } from "~/http-client/config";

export const loader = async () => {
  const { data } = await get("https://chefgpt.io/api/v2/user/1");
  return data;
};

export default function Profile() {
  return <div>Profile</div>;
}
