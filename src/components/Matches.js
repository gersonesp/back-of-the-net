import React, { Component } from "react";
import { users } from "../firebase";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
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
          submitButton.style.backgroundColor = "green";
          submitButton.style.cursor = "default";
          submitButton.innerHTML = "Submitted!";
        } else {
          console.log("No such document!");
        }
      });
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

    console.log(this.state);

    this.setState({ btnDisabled: true });

    // document.getElementsByClassName(".matchesList");

    const submitButton = document.querySelector(".submitButton");
    submitButton.style.backgroundColor = "green";
    submitButton.style.cursor = "default";
    submitButton.innerHTML = "Submitted!";
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      predictions: { ...this.state.predictions, [event.target.name]: value }
    });
  }

  increase(event) {
    let temp;

    if (this.state.btnDisabled) {
      alert("You already submitted your predictions!");
    } else {
      if (this.state.predictions[event.target.name] === 10) {
        return;
      }
      temp = this.state.predictions[event.target.name] + 1;

      this.setState({
        predictions: { ...this.state.predictions, [event.target.name]: temp }
      });
    }
  }

  decrease(event) {
    let temp;

    if (this.state.btnDisabled) {
      alert("You already submitted your predictions!");
    } else {
      if (this.state.predictions[event.target.name] === 0) {
        return false;
      } else {
        temp = this.state.predictions[event.target.name] - 1;
      }

      this.setState({
        predictions: { ...this.state.predictions, [event.target.name]: temp }
      });
    }
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
                      Gameweek {this.updateGameWeek()} of 38
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
                        Submit
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
