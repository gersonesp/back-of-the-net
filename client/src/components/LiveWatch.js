import React, { Component } from "react";

class LiveWatch extends Component {
  componentDidMount() {
    document.getElementById("livewatch").style.opacity = "1";
  }

  componentWillUnmount() {
    document.getElementById("livewatch").style.opacity = ".7";
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
