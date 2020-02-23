import React, { Component } from "react";
// import { users } from "../firebase";

class LiveWatch extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredFixtures: [] };
  }

  componentDidMount() {
    if (this.props && typeof this.props !== "undefined") {
      const allFixtures = this.props.state.allFixtures;
      const gameweek = this.props.state.gameweek;

      const filteredFixtures = allFixtures.filter(
        fixture => fixture.event === gameweek
      );

      filteredFixtures.sort((a, b) => b.event - a.event);

      this.setState({ filteredFixtures });
    }
  }

  convertTime = time => {
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

  render() {
    const fixtures = this.state.filteredFixtures;
    const teams = this.props.state.teams;

    console.log(fixtures);

    return (
      <div className="LiveWatch">
        <div className="liveWatch-header">Live Scores</div>
        {fixtures.map(fixture => (
          <div key={fixture.id} className="scoreCard">
            <div className="kickoffLive">
              <div>{this.convertTime(fixture.kickoff_time)}</div>
              <span>Live</span>
            </div>
            <div className="liveGame">
              <div className="team1">Liverpool</div>
              <div className="liveScore">4-0</div>
              <div className="team2">Everton</div>
            </div>
            <div className="playersPredictions">
              <div className="player">
                <div className="playerName">Dorothy</div>
                <div className="playerPrediction">3-0</div>
              </div>
              <div className="player">
                <div className="playerName">Dorothy</div>
                <div className="playerPrediction">3-0</div>
              </div>
            </div>
          </div>
        ))}
        )
      </div>
    );
  }
}

export default LiveWatch;
