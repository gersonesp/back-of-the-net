import React, { Component } from "react";

class Player extends Component {
  componentDidMount() {
    document.getElementById("players").style.opacity = "1";
    document.getElementById("players").style.borderBottom = "3px solid #8879f2";
  }

  componentWillUnmount() {
    document.getElementById("players").style.opacity = ".7";
    document.getElementById("players").style.borderBottom =
      "3px solid transparent";
  }

  render() {
    return (
      <div>
        <h1 className="playersHeader">Players View</h1>
      </div>
    );
  }
}

export default Player;
