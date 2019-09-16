import React, { Component } from "react";

class OneMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePrediction: "",
      awayPrediction: ""
    };
  }
  render() {
    return (
      <form className="oneMatch">
        <div id="time">{this.props.match.hour}</div>
        <div id="homeTeam">{this.props.match.homeTeam}</div>
        <div id="awayTeam">{this.props.match.awayTeam}</div>
      </form>
    );
  }
}

export default OneMatch;
