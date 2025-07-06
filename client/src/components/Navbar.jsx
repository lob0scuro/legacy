import React from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <header>
      <img
        src="./eastwood-logo.png"
        alt="Eastwood logo"
        className={clsx("logo", location.pathname === "/" && "landing-logo")}
      />
    </header>
  );
};

export default Navbar;
