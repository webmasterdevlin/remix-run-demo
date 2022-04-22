import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { HeroModel } from "~/routes/heroes/heroes";
import { get } from "~/http-client/config";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.heroId, "expected params.heroId");

  console.log("loading hero: ", params.heroId);

  const { data } = await get<HeroModel>("heroes/" + params.heroId);

  return data;
};

export default function HeroId() {
  const hero = useLoaderData<HeroModel>();
  return (
    <div>
      <h2>Super Heroes</h2>
      <h1>HeroId: {hero?.firstName}</h1>
    </div>
  );
}
