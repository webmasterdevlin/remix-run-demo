import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { get } from "~/http-client/config";

export const loader: LoaderFunction = async () => {
  const { data } = await get<any[]>(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  );
  return data;
};

export default function Pokemon() {
  const pokemon = useLoaderData<any>();
  // will not work if you disable JavaScript in your browser
  useEffect(() => {
    console.log("pokemon-v2:client");
  }, []);

  return (
    <div>
      <h1>POKEMON</h1>
      {pokemon &&
        pokemon.results.map((pokemon: any) => (
          <div key={pokemon.name}>
            <h2>{pokemon.name}</h2>
          </div>
        ))}
    </div>
  );
}
