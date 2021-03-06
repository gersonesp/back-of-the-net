import React, { Component } from "react";
import { users, storageRef } from "../firebase";
import MatchDay from "./matchDay";
import { NavLink } from "react-router-dom";

const buttonStyle = {
  backgroundColor: "#bababa",
  cursor: "default"
};

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      images: {},
      predictions: {},
      teams: [],
      userName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.submitData = this.submitData.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  componentDidMount() {
    const userId = this.props.state.user.uid;
    const gameweek = this.props.state.gameweek;

    if (userId && gameweek) {
      const user = users.doc(userId);
      user.get().then(doc => {
        if (doc.data()[gameweek]) {
          this.setState({ btnDisabled: true });
          this.setState({ predictions: doc.data()[gameweek] });
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const userId = this.props.state.user.uid;
      const gameweek = this.props.state.gameweek;
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

      if (userId) {
        const user = users.doc(userId);
        user.get().then(doc => {
          if (doc.data()[gameweek]) {
            this.setState({
              btnDisabled: true,
              predictions: doc.data()[gameweek]
            });
          }
        });

        users
          .doc("name")
          .get()
          .then(doc => {
            const listOfUserNames = doc.data();
            return this.setState({ userName: listOfUserNames[userId] });
          });
      }
    }

    if (prevProps !== this.props) {
      const teams = this.props.state.teams;

      let teamNames = {};
      teams.map(team => (teamNames[team.id] = team.name));

      let initialPredictions = {};
      const gameweekMatches = Object.values(this.props.state.fixtures);

      gameweekMatches.map(matches =>
        // eslint-disable-next-line
        matches.map(match => {
          initialPredictions[`${teamNames[match.team_h]}-${match.id}`] = 0;
          initialPredictions[`${teamNames[match.team_a]}-${match.id}`] = 0;
        })
      );

      this.setState({
        predictions: initialPredictions,
        teams: teamNames
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  submitData() {
    const userId = this.props.state.user.uid;

    users.doc(userId).update({
      [this.props.state.gameweek]: this.state.predictions
    });

    users.doc("allPredictions").update({
      [`${userId}-${this.props.state.gameweek}`]: {
        userId,
        name: this.state.userName,
        gameweek: this.props.state.gameweek,
        predictions: this.state.predictions
      }
    });

    this.setState({ btnDisabled: true });

    const scoreButton = document.querySelectorAll(".scoreButton");
    scoreButton.forEach(elem => {
      elem.style.borderColor = "#bababa";
      elem.style.color = "#bababa";
      elem.style.cursor = "default";
    });
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      predictions: {
        ...this.props.state.predictions,
        [event.target.name]: value
      }
    });
  }

  increase(event) {
    let temp;

    if (this.state.predictions[event.target.name] === 10) {
      return;
    }
    temp = this.state.predictions[event.target.name] + 1;

    this.setState({
      predictions: { ...this.state.predictions, [event.target.name]: temp }
    });
  }

  decrease(event) {
    let temp;

    if (this.state.predictions[event.target.name] === 0) {
      return false;
    } else {
      temp = this.state.predictions[event.target.name] - 1;
    }

    this.setState({
      predictions: { ...this.state.predictions, [event.target.name]: temp }
    });
  }

  //convert time to readable format
  convertTime(time) {
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
  }

  render() {
    const fixtures = this.props.state.fixtures;
    const currentGameweek = this.props.state.gameweek;

    return (
      <form className="matchesList" onSubmit={this.handleSubmit}>
        {
          <div className="listAllMatches">
            <div className="gameweekList">
              <div className="gameweekHeader">
                {this.state.btnDisabled
                  ? `Your predictions for Gameweek ${currentGameweek} of 38`
                  : `Gameweek ${currentGameweek} of 38`}
              </div>

              {Object.values(fixtures).map((matchDay, index) => (
                <div key={index} className="oneMatch">
                  <div className="kickoffTime">
                    {this.convertTime(Object.keys(fixtures)[index])}
                  </div>

                  {matchDay.map(match => (
                    <MatchDay
                      key={match.id}
                      matchId={match.id}
                      state={this.state}
                      teams={this.props.state.listOfTeams}
                      fixtures={fixtures}
                      increase={this.increase}
                      decrease={this.decrease}
                      addTeam={this.addTeam}
                      onChange={this.handleChange}
                      homeTeam={match.team_h}
                      awayTeam={match.team_a}
                    />
                  ))}
                </div>
              ))}

              <div className="button">
                <button
                  className="submitButton"
                  type="submit"
                  value="Submit"
                  onClick={this.submitData}
                  disabled={this.state.btnDisabled}
                  style={this.state.btnDisabled ? buttonStyle : null}
                >
                  {this.state.btnDisabled ? "SUBMITTED!" : "SUBMIT"}
                </button>
              </div>

              {this.state.btnDisabled ? (
                <div className="comparisonMessage">
                  <NavLink to="/livewatch">
                    Compare your predictions with the live score
                  </NavLink>
                </div>
              ) : null}
            </div>
          </div>
        }
      </form>
    );
  }
}

export default Matches;
