import React from "react";

export default props => {
  const teamName = {};
  const { teams, fixtures, gameweek, increase, decrease, state } = props;
  if (typeof teams !== "undefined")
    teams.map(team => (teamName[team.id] = team.name));

  // if (typeof fixtures !== "undefined") {
  //   fixtures.map(gameweek => {
  //     if (gameweek.kickoff_time <= new Date().toDateString()) {
  //       console.log(gameweek.kickoff_time);
  //     }
  //   });
  // }
  return (
    typeof fixtures !== "undefined" &&
    fixtures.map(fixture => {
      let matchDay;

      if (fixture.event === gameweek) {
        return (
          <div id="teamContainer" key={fixture.id}>
            <label id="homeTeam">
              <div className="teamName">{teamName[fixture.team_h]}</div>

              <div>
                <button
                  onClick={decrease}
                  name={`${teamName[fixture.team_h]}-${fixture.id}`}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  name={`${teamName[fixture.team_h]}-${fixture.id}`}
                  value={state[`${teamName[fixture.team_h]}-${fixture.id}`]}
                  defaultValue={0}
                />
                <button
                  onClick={increase}
                  name={`${teamName[fixture.team_h]}-${fixture.id}`}
                >
                  +
                </button>
              </div>
            </label>

            <label id="awayTeam">
              <div className="teamName">{teamName[fixture.team_a]}</div>

              <div>
                <button
                  onClick={decrease}
                  name={`${teamName[fixture.team_a]}-${fixture.id}`}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  name={`${teamName[fixture.team_a]}-${fixture.id}`}
                  value={state[`${teamName[fixture.team_a]}-${fixture.id}`]}
                  defaultValue={0}
                />
                <button
                  onClick={increase}
                  name={`${teamName[fixture.team_a]}-${fixture.id}`}
                >
                  +
                </button>
              </div>
            </label>
          </div>
        );
      }

      return matchDay;
    })
  );
};
