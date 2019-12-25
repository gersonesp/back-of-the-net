import React from "react";

export default props => {
  const teamName = {};
  const { teams, fixtures, gameweek, increase, decrease, state } = props;
  if (typeof teams !== "undefined")
    teams.map(team => (teamName[team.id] = team.name));

  const gameweekFixtures = fixtures.filter(
    fixture => fixture.event === gameweek
  );

  const sameTime = {};

  //group gameweek by time of matches and save to sameTime variable
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

  //convert time to readable format
  const convertTime = time => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const dateMilliSeconds = Date.parse(time);
    const fullDate = new Date(dateMilliSeconds);
    const day = fullDate.getUTCDay();
    const date = fullDate.getUTCDate();
    // The getUTCMonth() method returns the month (from 0 to 11) for the specified date, according to universal time.
    const month = fullDate.getUTCMonth() + 1;
    const year = fullDate.getUTCFullYear();

    return `${weekdays[day]} ${month}/${date}/${year}`;
  };

  return Object.values(sameTime).map((sametimeFixture, index) => (
    <div key={index} className="oneMatch">
      <div className="kickoffTime">
        {convertTime(Object.keys(sameTime)[index])}
      </div>
      {sametimeFixture.map(fixture => {
        return (
          <div id="teamContainer" key={fixture.id}>
            <div id="homeTeam">
              <label>
                <div className="teamName">{teamName[fixture.team_h]}</div>
              </label>

              <div>
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
              </div>
            </div>

            <div id="awayTeam">
              <label>
                <div className="teamName">{teamName[fixture.team_a]}</div>
              </label>

              <div>
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ));
};
