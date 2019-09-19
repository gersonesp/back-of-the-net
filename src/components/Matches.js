import React, { Component } from "react";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  render() {
    const listOfMatches = this.props.matches;

    return (
      <form className="matchesList" onSubmit={this.handleSubmit}>
        <h4 className="matchesHeader">Gameweek</h4>

        <div className="listAllMatches">
          {Object.keys(listOfMatches).map((match, i) => (
            <div className="oneMatch" key={i}>
              <div id="day">{match}</div>
              <MatchDay matchDayList={listOfMatches[match]} />
            </div>
          ))}
        </div>

        <button type="submit" value="Submit" id="button">
          Submit
        </button>
      </form>
    );
  }
}

export default Matches;
