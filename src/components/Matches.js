import React, { Component } from "react";
import { predictions } from "../firebase";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameweek: 6
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    document.querySelector(".matchesList").reset();
  }

  submitData() {
    console.log(this.state);
    predictions.set({
      [this.state.gameweek]: this.state
    });
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
    console.log(this.state);
  }

  // setGameWeek(gameweek) {
  //   console.log(gameweek);
  // }

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
                gameweek === this.state.gameweek ? (
                  <div className="gameweekList" key={index - gameweek}>
                    <div className="gameweekHeader">Gameweek {gameweek}</div>
                    <MatchDay
                      state={this.state}
                      teams={teams}
                      fixtures={fixtures}
                      gameweek={this.state.gameweek}
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
