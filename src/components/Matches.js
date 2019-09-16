import React, { Component } from "react";
import OneMatch from "./OneMatch";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  render() {
    const matches = this.props.matches;

    return (
      <div className="matchesList">
        <h1 className="matchesHeader">Matches</h1>

        <div className="listAllMatches">
          {matches.map(match => (
            <OneMatch key={match.idd} match={match} />
          ))}
        </div>
      </div>
    );
  }
}

export default Matches;
