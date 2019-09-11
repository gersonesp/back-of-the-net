import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <h1>Back of The Net</h1>
        </Link>

        <ul>
          <li>
            <Link to="/matches">Matches</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/livewatch">Live Watch</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
