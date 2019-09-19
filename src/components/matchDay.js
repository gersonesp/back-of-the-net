import React from "react";

export default props => {
  const matches = props.matchDayList;

  return matches.map(match => (
    <div id="teamContainer" key={match.idd}>
      <label id="homeTeam">
        <div className="teamName">{match.homeTeam}</div>
        <input />
      </label>

      <label id="awayTeam">
        <div className="teamName">{match.awayTeam}</div>
        <input />
      </label>
    </div>
  ));
};
