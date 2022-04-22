import prisma from "~/lib/db.server";
import { useLoaderData } from "@remix-run/react";
import { HeroModel } from "~/routes/heroes";

export const loader = async () => await prisma.hero.findMany();

export default function Index() {
  const heroes = useLoaderData<HeroModel[]>();
  return (
    <>
      <div>
        <h1>Super Heroes</h1>
      </div>
      <ul>
        {heroes.map((h) => (
          <div key={h.id}>
            <h2>
              {h.firstName} {h.lastName}
            </h2>
            <h3>{h.knownAs}</h3>
            <h3>{h.house}</h3>
          </div>
        ))}
      </ul>
    </>
  );
}
