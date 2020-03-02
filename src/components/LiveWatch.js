import React, { Component } from "react";
import { users, storageRef } from "../firebase";

class LiveWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredFixtures:
        JSON.parse(localStorage.getItem("filteredFixtures")) || [],
      images: {},
      userPredictions: JSON.parse(localStorage.getItem("userPredictions")) || {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const allFixtures = this.props.state.allFixtures;
      const gameweek = this.props.state.gameweek;

      const filteredFixtures = allFixtures.filter(
        fixture => fixture.event === gameweek
      );

      filteredFixtures.sort((a, b) => b.event - a.event);

      this.setState(
        {
          filteredFixtures
        },
        localStorage.setItem(
          "filteredFixtures",
          JSON.stringify(this.state.filteredFixtures)
        )
      );
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props) {
      const allFixtures = this.props.state.allFixtures;
      const gameweek = this.props.state.gameweek;

      const filteredFixtures = allFixtures.filter(
        fixture => fixture.event === gameweek
      );

      filteredFixtures.sort((a, b) => b.event - a.event);

      const teams = this.props.state.teams;

      let teamNames = {};
      teams.map(team => (teamNames[team.id] = team.name));

      Object.values(teamNames).map(team => {
        return storageRef
          .child(`${team}.svg`)
          .getDownloadURL()
          .then(url => {
            this.setState({ images: { ...this.state.images, [team]: url } });
          });
      });

      users
        .doc("allPredictions")
        .get()
        .then(doc => {
          this.setState(
            { userPredictions: doc.data(), filteredFixtures },
            () => {
              localStorage.setItem(
                "userPredictions",
                JSON.stringify(this.state.userPredictions)
              );

              localStorage.setItem(
                "filteredFixtures",
                JSON.stringify(this.state.filteredFixtures)
              );
            }
          );
        })
        .catch(error => console.log(error));
    }
  }

  componentWillMount() {
    this._isMounted = false;
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
    const images = this.state.images;
    const allUserPredictions = Object.values(this.state.userPredictions);

    return (
      <div className="LiveWatch">
        <div className="liveWatch-header">Live Scores</div>
        {fixtures.map(fixture => (
          <div key={fixture.id} className="scoreCard">
            <div className="kickoffLive">
              <div className="time">
                {this.convertTime(fixture.kickoff_time)}
              </div>
              <span className="live">{fixture.minutes}</span>
            </div>

            <div className="liveGame">
              <div className="team1">
                {typeof teams[fixture.team_h] !== "undefined"
                  ? teams[fixture.team_h - 1].name
                  : null}
                <img
                  className="teamImage"
                  src={
                    teams[fixture.team_h - 1].name
                      ? images[teams[fixture.team_h - 1].name]
                      : null
                  }
                  alt=""
                />
              </div>
              <div className="liveScore">
                {fixture.team_h_score}-{fixture.team_a_score}
              </div>
              <div className="team2">
                <img
                  className="teamImage"
                  src={
                    teams[fixture.team_a - 1].name
                      ? images[teams[fixture.team_a - 1].name]
                      : null
                  }
                  alt=""
                />
                {typeof teams[fixture.team_a] !== "undefined"
                  ? teams[fixture.team_a - 1].name
                  : null}
              </div>
            </div>

            {allUserPredictions.map((user, i) => {
              const homeTeam = teams[fixture.team_h - 1].name;
              const awayTeam = teams[fixture.team_a - 1].name;
              return (
                <div className="playersPredictions" key={`p-${i}`}>
                  <div className="player">
                    <div className="playerName">{user.name}</div>
                    <div className="playerPrediction">
                      {user.predictions[`${homeTeam}-${fixture.id}`]} -{" "}
                      {user.predictions[`${awayTeam}-${fixture.id}`]}
                    </div>
                    <div />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default LiveWatch;
