import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { get } from "~/http-client/config";

export const loader: LoaderFunction = async () => {
  const { data } = await get<HeroModel[]>("heroes");
  return data.filter((h) => h.house === "Marvel");
};

export default function Heroes() {
  const heroes = useLoaderData<HeroModel[]>();
  return (
    <>
      <div>
        <h1>Marvel Heroes</h1>
        {heroes.map((h) => (
          <div key={h.id}>
            <h2>
              {h.firstName} {h.lastName}
            </h2>
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
