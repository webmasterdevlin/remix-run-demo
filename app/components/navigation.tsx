import React from "react";
import { NavLink } from "@remix-run/react";

type Routes = {
  path: string;
  label: string;
};

const routes: Routes[] = [
  { path: "/", label: "🏠" },
  { path: "heroes", label: "HEROES" },
  { path: "todos", label: "TODOS" },
  { path: "pokemon", label: "POKEMON" },
];

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        {routes.map((r) => {
          return (
            <li>
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
