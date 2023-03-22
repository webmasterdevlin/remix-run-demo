import { useEffect, useState } from "react";
import { get } from "~/http-client/config";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<any>(null);
  // will not work if you disable JavaScript in your browser
  useEffect(() => {
    console.log("pokemon:client");
    get<any[]>("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20").then(
      (res: any) => {
        setPokemon(res.data);
      }
    );
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
