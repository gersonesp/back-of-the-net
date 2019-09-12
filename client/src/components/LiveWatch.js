import React, { Component } from "react";

class LiveWatch extends Component {
  componentDidMount() {
    document.getElementById("livewatch").style.opacity = "1";
    document.getElementById("livewatch").style.borderBottom =
      "3px solid #8879f2";
  }

  componentWillUnmount() {
    document.getElementById("livewatch").style.opacity = ".7";
    document.getElementById("livewatch").style.borderBottom =
      "3px solid transparent";
  }

  render() {
    return (
      <div>
        <h1 className="liveWatchHeader">Live Watch</h1>
      </div>
    );
  }
}

export default LiveWatch;
