import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <NavLink to="/" className="heading">
          <h5>Back of The Net</h5>
        </NavLink>

        <ul>
          <li>
            <NavLink
              exact
              to="/"
              id="matches"
              activeStyle={{ opacity: "1", borderBottom: "3px solid #8879f2" }}
            >
              Matches
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/players"
              id="players"
              activeStyle={{ opacity: "1", borderBottom: "3px solid #8879f2" }}
            >
              Players
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/livewatch"
              id="livewatch"
              activeStyle={{ opacity: "1", borderBottom: "3px solid #8879f2" }}
            >
              Live Watch
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
