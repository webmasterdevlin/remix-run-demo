import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { HeroModel } from "~/routes/heroes/index";
import { get } from "~/http-client/config";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.heroId, "expected params.heroId");

  const response = await get<HeroModel>("heroes/" + params.heroId);
  return response.data;
};

export default function HeroId() {
  const hero = useLoaderData<HeroModel>();
  return (
    <div>
      <h1>Super Heroes</h1>
      <h2>Hero Id: {hero?.id}</h2>
      <h2>Hero Name: {hero?.firstName}</h2>
    </div>
  );
}
