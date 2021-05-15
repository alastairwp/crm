import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/person/all">
          CRM
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="./person/all">
              People
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="./new">
              New
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
