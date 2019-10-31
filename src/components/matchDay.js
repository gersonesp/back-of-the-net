import React from "react";

export default props => {
  const teamName = {};
  const teams = props.teams;
  if (typeof teams !== "undefined")
    teams.map(team => (teamName[team.id] = team.name));

  const fixtures = props.fixtures;
  const gameweek = props.gameweek;

  return (
    typeof fixtures !== "undefined" &&
    fixtures.map(fixture => {
      let matchDay;

      if (fixture.event === gameweek) {
        return (
          <div id="teamContainer" key={fixture.id}>
            <label id="homeTeam">
              <div className="teamName">{teamName[fixture.team_h]}</div>

              <div>Home team inputs</div>
            </label>

            <label id="awayTeam">
              <div className="teamName">{teamName[fixture.team_a]}</div>

              <div>Away team inputs</div>
            </label>
          </div>
        );
      }

      return matchDay;
    })
  );
};
