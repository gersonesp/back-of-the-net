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

  const gameweekFixtures = fixtures.filter(
    fixture => fixture.event === gameweek
  );

  const sameTime = {};

  //group gameweek by  time of matches and save to sameTime variable
  gameweekFixtures.map(fixture => {
    if (sameTime.hasOwnProperty(fixture.kickoff_time)) {
      return (sameTime[fixture.kickoff_time] = [
        ...sameTime[fixture.kickoff_time],
        fixture
      ]);
    } else {
      return (sameTime[fixture.kickoff_time] = [fixture]);
    }
  });

  return Object.values(sameTime).map((sametimeFixture, index) => (
    <div key={index} className="oneMatch">
      <div className="kickoffTime">{Object.keys(sameTime)[index]}</div>
      {sametimeFixture.map(fixture => {
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
      })}
    </div>
  ));
};
