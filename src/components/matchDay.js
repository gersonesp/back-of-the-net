import React from "react";

export default props => {
  const matches = props.matchDayList;

  return matches.map(match => (
    <div id="teamContainer" key={match.idd}>
      <label id="homeTeam">
        <div className="teamName">{match.homeTeam}</div>

        <div>
          <button
            name={`${match.homeTeam}-${match.day}`}
            onClick={props.decrease}
          >
            -
          </button>
          <input
            id={`${match.homeTeam}-${match.day}`}
            value={props.state[`${match.homeTeam}-${match.day}`] || 0}
            name={`${match.homeTeam}-${match.day}`}
            onChange={props.handleInput}
            type="number"
            min="0"
            max="10"
          />
          <button
            name={`${match.homeTeam}-${match.day}`}
            onClick={props.increase}
          >
            +
          </button>
        </div>
      </label>

      <label id="awayTeam">
        <div className="teamName">{match.awayTeam}</div>

        <div>
          <button
            name={`${match.awayTeam}-${match.day}`}
            onClick={props.decrease}
          >
            -
          </button>
          <input
            id={`${match.awayTeam}-${match.day}`}
            value={props.state[`${match.awayTeam}-${match.day}`] || 0}
            name={`${match.awayTeam}-${match.day}`}
            onChange={props.handleInput}
            type="number"
            min="0"
            max="10"
          />
          <button
            name={`${match.awayTeam}-${match.day}`}
            onClick={props.increase}
          >
            +
          </button>
        </div>
      </label>
    </div>
  ));
};
