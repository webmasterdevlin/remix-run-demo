import React from "react";
import { NavLink } from "@remix-run/react";

const Navigation = () => {
  return (
    <nav
      style={{
        height: "2rem",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <NavLink to={"/"}>🏠</NavLink>
      <NavLink to={"heroes"}>HEROES</NavLink>
      <NavLink to={"todos"}>TODOS</NavLink>
      <NavLink to={"pokemon"}>POKEMON</NavLink>
    </nav>
  );
};

export default Navigation;
