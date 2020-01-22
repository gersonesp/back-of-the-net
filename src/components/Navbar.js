import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const signout = this.props.signout;

    return (
      <div className="navbar">
        <div className="heading">
          <NavLink to="/" className="homeLink">
            <h5>Back of The Net</h5>
          </NavLink>

          <div className="navButton">
            <button type="button" onClick={signout}>
              Sign out
            </button>
          </div>
        </div>

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
              to="/livewatch"
              id="livewatch"
              activeStyle={{ opacity: "1", borderBottom: "3px solid #8879f2" }}
            >
              Live Watch
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              to="/table"
              id="table"
              activeStyle={{ opacity: "1", borderBottom: "3px solid #8879f2" }}
            >
              Table
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
