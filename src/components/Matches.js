import React, { Component } from "react";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameweek: 11
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    document.querySelector(".matchesList").reset();
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
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
      <form
        className="matchesList"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        {typeof fixtures !== "undefined" && (
          <div className="listAllMatches">
            {/* grab only unique values for gameweeks then map array of unique values*/}
            {[...new Set(fixtures.map(fixture => fixture.event))].map(
              (gameweek, index) =>
                gameweek === this.state.gameweek ? (
                  <div className="gameweekList" key={index - gameweek}>
                    <div className="gameweekHeader">Gameweek {gameweek}</div>
                    <MatchDay
                      className="oneMatch"
                      state={this.state}
                      teams={teams}
                      fixtures={fixtures}
                      gameweek={this.state.gameweek}
                      increase={this.increase}
                      decrease={this.decrease}
                      addTeam={this.addTeam}
                    />
                    <div className="button">
                      <button type="submit" value="Submit">
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
