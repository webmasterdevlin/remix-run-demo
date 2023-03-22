import { json } from "@remix-run/node";

export const loader = () => {
  return json([
    {
      firstName: "Lex",
      lastName: "Luther",
      house: "DC",
      knownAs: "Lex",
      id: "6ad1b9ca-031a-4687-b4fb-6ce9cfe93960",
    },
    {
      firstName: "Max",
      lastName: "Eisenhardt",
      house: "Marvel",
      knownAs: "Magneto",
      id: "c2696868-7a2e-40b6-a879-389fc6ee0171",
    },
  ]);
};
