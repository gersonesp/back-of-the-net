import React from "react";

export default props => {
  const teamName = {};

  const {
    teams,
    fixtures,
    gameweek,
    increase,
    decrease,
    state,
    onChange
  } = props;

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
        let homeTeam = teamName[fixture.team_h];
        let awayTeam = teamName[fixture.team_a];

        return (
          <div id="teamContainer" key={fixture.id}>
            <div id="homeTeam">
              <div className="label-image">
                <img
                  className="teamImage"
                  src={state.images[homeTeam]}
                  alt=""
                />
                <label>
                  <div className="teamName">{homeTeam}</div>
                </label>
              </div>

              <div>
                <div>
                  <button
                    className="scoreButton"
                    onClick={decrease}
                    name={homeTeam}
                    disabled={state.btnDisabled}
                  >
                    -
                  </button>
                  <input
                    readOnly
                    type="number"
                    min="0"
                    max="10"
                    name={`${homeTeam}`}
                    value={state.predictions[`${homeTeam}`] || 0}
                    onChange={onChange}
                    disabled={state.btnDisabled}
                  />
                  <button
                    className="scoreButton"
                    onClick={increase}
                    name={homeTeam}
                    disabled={state.btnDisabled}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div id="awayTeam">
              <div className="label-image">
                <img
                  className="teamImage"
                  src={state.images[awayTeam]}
                  alt=""
                />
                <label>
                  <div className="teamName">{awayTeam}</div>
                </label>
              </div>

              <div>
                <div>
                  <button
                    className="scoreButton"
                    onClick={decrease}
                    name={`${awayTeam}`}
                    disabled={state.btnDisabled}
                  >
                    -
                  </button>
                  <input
                    readOnly
                    type="number"
                    min="0"
                    max="10"
                    name={`${awayTeam}`}
                    value={state.predictions[`${awayTeam}`] || 0}
                    onChange={onChange}
                    disabled={state.btnDisabled}
                  />
                  <button
                    className="scoreButton"
                    onClick={increase}
                    name={`${awayTeam}`}
                    disabled={state.btnDisabled}
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
