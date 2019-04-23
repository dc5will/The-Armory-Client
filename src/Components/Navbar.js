import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {

  return (
    <nav>
      <div className="nav-container">
        <Link className="logo" to="/">
          ArmorySquad
        </Link>

        <ul id="nav" className="top-right">
          <li>
          <i className="fas fa-user"/>
          </li>
          <li>
          <i class="fas fa-bars"/>
          </li>
        </ul>
      </div>
    </nav>
  );
}
