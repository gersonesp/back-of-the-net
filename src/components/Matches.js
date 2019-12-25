import React, { Component } from "react";
import { predictions } from "../firebase";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateGameWeek = this.updateGameWeek.bind(this);
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
    document.querySelector(".matchesList").reset();
  }

  submitData() {
    console.log(this.state);
    predictions.set(
      {
        [this.updateGameWeek()]: this.state
      },
      true
    );
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      predictions: { ...this.state.predictions, [event.target.name]: value }
    });
  }

  increase(event) {
    let temp;
    if (!this.state.hasOwnProperty([event.target.name])) {
      temp = 1;
    } else {
      if (this.state[event.target.name] === 10) {
        return;
      }
      temp = this.state[event.target.name] + 1;
    }

    this.setState({
      [event.target.name]: temp
    });
  }

  decrease(event) {
    let temp;
    if (
      !this.state.hasOwnProperty([event.target.name]) ||
      this.state[event.target.name] === 0
    ) {
      return false;
    } else {
      temp = this.state[event.target.name] - 1;
    }

    this.setState({
      [event.target.name]: temp
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
