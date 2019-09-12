import React, { Component } from "react";

class Matches extends Component {
  componentDidMount() {
    document.getElementById("matches").style.opacity = "1";
  }

  componentWillUnmount() {
    document.getElementById("matches").style.opacity = ".7";
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
