import { useLoaderData } from "@remix-run/react";
import { get } from "~/http-client/config";
import invariant from "tiny-invariant";
import type { HeroModel } from "./_main.heroes._index";
import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
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
