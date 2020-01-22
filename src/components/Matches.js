import React, { Component } from "react";
import { users, storageRef } from "../firebase";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      images: {},
      predictions: {
        "Sheffield Utd": 0,
        "West Ham": 0,
        "Crystal Palace": 0,
        Arsenal: 0,
        Chelsea: 0,
        Burnley: 0,
        Everton: 0,
        Brighton: 0,
        Leicester: 0,
        Southampton: 0,
        "Man Utd": 0,
        Norwich: 0,
        Wolves: 0,
        Newcastle: 0,
        Spurs: 0,
        Liverpool: 0,
        Bournemouth: 0,
        Watford: 0,
        "Aston Villa": 0,
        "Man City": 0
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateGameWeek = this.updateGameWeek.bind(this);
  }

  componentDidMount() {
    const userId = this.props.state.user.uid;

    if (userId) {
      const user = users.doc(userId);
      user.get().then(doc => {
        if (doc.data()[this.updateGameWeek()]) {
          this.setState({ btnDisabled: true });
          this.setState({ predictions: doc.data()[this.updateGameWeek()] });

          const submitButton = document.querySelector(".submitButton");
          submitButton.style.backgroundColor = "#bababa";
          submitButton.style.cursor = "default";
          submitButton.innerHTML = "SUBMITTED!";

          const scoreButton = document.querySelectorAll(".scoreButton");
          scoreButton.forEach(elem => {
            elem.style.borderColor = "#bababa";
            elem.style.color = "#bababa";
            elem.style.cursor = "default";
          });
        } else {
          console.error("User doesn't exist!");
        }
      });
    }

    Object.keys(this.state.predictions).map(team => {
      return storageRef
        .child(`${team}.svg`)
        .getDownloadURL()
        .then(url => {
          this.setState({ images: { ...this.state.images, [team]: url } });
        });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const userId = this.props.state.user.uid;

      if (userId) {
        const user = users.doc(userId);
        user.get().then(doc => {
          if (doc.data()[this.updateGameWeek()]) {
            this.setState({ btnDisabled: true });
            this.setState({ predictions: doc.data()[this.updateGameWeek()] });

            const submitButton = document.querySelector(".submitButton");
            submitButton.style.backgroundColor = "#bababa";
            submitButton.style.cursor = "default";
            submitButton.innerHTML = "SUBMITTED!";

            const scoreButton = document.querySelectorAll(".scoreButton");
            scoreButton.forEach(elem => {
              elem.style.borderColor = "#bababa";
              elem.style.color = "#bababa";
              elem.style.cursor = "default";
            });
          } else {
            console.error("User doesn't exist!");
          }
        });
      }
    }
  }

  updateGameWeek() {
    const fixtures = this.props.state.fixtures;

    if (fixtures && typeof fixtures !== "undefined") {
      return [
        ...new Set(
          fixtures.filter(fixture => {
            const date = new Date();
            return fixture.kickoff_time >= date.toISOString()
              ? fixture.event
              : null;
          })
        )
      ][0].event;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  submitData() {
    const userId = this.props.state.user.uid;

    users.doc(userId).update({
      [this.updateGameWeek()]: this.state.predictions
    });

    this.setState({ btnDisabled: true });

    const submitButton = document.querySelector(".submitButton");
    submitButton.style.backgroundColor = "#71b350";
    submitButton.style.cursor = "default";
    submitButton.innerHTML = "SUBMITTED!";

    const scoreButton = document.querySelectorAll(".scoreButton");
    scoreButton.forEach(elem => {
      elem.style.borderColor = "#bababa";
      elem.style.color = "#bababa";
      elem.style.cursor = "default";
    });

    setTimeout(() => {
      submitButton.style.backgroundColor = "#bababa";
    }, 3000);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      predictions: { ...this.state.predictions, [event.target.name]: value }
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

  render() {
    const teams = this.props.state.teams;
    const fixtures = this.props.state.fixtures;

    return (
      <form className="matchesList" onSubmit={this.handleSubmit}>
        {typeof fixtures !== "undefined" && (
          <div className="listAllMatches">
            {/* grab only unique values for gameweeks then map array of unique values*/}
            {[...new Set(fixtures.map(fixture => fixture.event))].map(
              (gameweek, index) =>
                gameweek === this.updateGameWeek() ? (
                  <div className="gameweekList" key={index - gameweek}>
                    <div className="gameweekHeader">
                      {this.state.btnDisabled
                        ? `Your predictions for Gameweek ${this.updateGameWeek()} of 38`
                        : `Gameweek ${this.updateGameWeek()} of 38`}
                    </div>

                    <MatchDay
                      state={this.state}
                      teams={teams}
                      fixtures={fixtures}
                      gameweek={this.updateGameWeek()}
                      increase={this.increase}
                      decrease={this.decrease}
                      addTeam={this.addTeam}
                      onChange={this.handleChange}
                    />

                    <div className="button">
                      <button
                        className="submitButton"
                        type="submit"
                        value="Submit"
                        onClick={this.submitData}
                        disabled={this.state.btnDisabled}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                ) : null
            )}
          </div>
        )}
      </form>
    );
  }
}

export default Matches;
