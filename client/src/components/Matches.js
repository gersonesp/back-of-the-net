import React, { Component } from "react";

class Matches extends Component {
  componentDidMount() {
    document.getElementById("matches").style.opacity = "1";
    document.getElementById("matches").style.borderBottom = "3px solid #8879f2";
  }

  componentWillUnmount() {
    document.getElementById("matches").style.opacity = ".7";
    document.getElementById("matches").style.borderBottom =
      "3px solid transparent";
  }

  render() {
    return (
      <div>
        <h1 className="matchesHeader">Matches View</h1>
      </div>
    );
  }
}

export default Matches;
