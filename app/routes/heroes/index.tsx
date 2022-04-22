import type { LoaderFunction } from "@remix-run/node";
import axios from "axios";

export const loader: LoaderFunction = async () => {
  const { data } = await axios.get<HeroModel[]>("http://localhost:5000/heroes");
  return data;
};

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  knownAs: string;
  house: string;
};
