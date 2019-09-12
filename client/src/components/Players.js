import React, { Component } from "react";

class Player extends Component {
  componentDidMount() {
    document.getElementById("players").style.opacity = "1";
  }

  componentWillUnmount() {
    document.getElementById("players").style.opacity = ".7";
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
