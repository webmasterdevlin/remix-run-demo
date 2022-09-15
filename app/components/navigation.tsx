import React from "react";
import { NavLink } from "@remix-run/react";

type Routes = {
  path: string;
  label: string;
};

const routes: Routes[] = [
  { path: "/", label: "🏠" },
  { path: "heroes", label: "heroes" },
  { path: "todos", label: "todos" },
  { path: "pokemon", label: "pokemon" },
  { path: "pokemon-v2", label: "pokemon-v2" },
];

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        {routes.map((r, i) => {
          return (
            <li key={i}>
              <NavLink
                to={r.path}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                {r.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
