import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" className="heading">
          <h5>Back of The Net</h5>
        </Link>

        <ul>
          <li>
            <Link to="/" id="matches">
              Matches
            </Link>
          </li>

          <li>
            <Link to="/players" id="players">
              Players
            </Link>
          </li>

          <li>
            <Link to="/livewatch" id="livewatch">
              Live Watch
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
