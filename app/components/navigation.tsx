import { NavLink } from "@remix-run/react";

type Routes = {
  path: string;
  label: string;
};

const routes: Routes[] = [
  { path: "/", label: "🏠" },
  { path: "villains", label: "villains" },
  { path: "pokemon", label: "pokemon" },
  { path: "pokemon-v2", label: "pokemon-v2" },
  { path: "heroes", label: "heroes" },
  { path: "todos", label: "todos" },
  { path: "settings", label: "settings" },
  { path: "profile", label: "profile" },
];

const Navigation = () => {
  return (
    <nav
      className={"flex w-full flex-row flex-wrap items-center justify-between"}
    >
      <div>
        {routes.map((r, i) => {
          return (
            <NavLink
              key={i}
              to={r.path}
              target={r.path === "villains" ? "_blank" : ""}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <button className="btn capitalize">{r.label}</button>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
