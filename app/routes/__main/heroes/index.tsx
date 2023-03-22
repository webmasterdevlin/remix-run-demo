import { NavLink, useLoaderData } from "@remix-run/react";
import { get } from "~/http-client/config";

// server code which does not get bundled
// this will be converted to a server JSON data if Heroes is not present
export const loader = async () => {
  console.log("heroes:server");
  const { data } = await get<HeroModel[]>("heroes");
  return data.filter((h) => h.house === "Marvel");
};

export default function Heroes() {
  const heroes = useLoaderData<typeof loader>();

  return (
    <>
      <div>
        <h1>Marvel Heroes</h1>
        {heroes.map((h) => (
          <div key={h.id}>
            <NavLink to={h.id}>
              <h2>
                {h.firstName} {h.lastName}
              </h2>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  knownAs: string;
  house: string;
};
