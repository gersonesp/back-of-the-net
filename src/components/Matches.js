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
    console.log(this.props.matches.length > 0 && this.props.matches);
    const matches = this.props.matches;

    return (
      <div className="matchesList">
        <h1 className="matchesHeader">Matches View</h1>

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
