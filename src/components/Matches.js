import React, { Component, lazy, Suspense } from "react";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameweek: 7
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
    this.setState({
      [`${event.target.name}`]: this.state[`${event.target.name}`] + 1
    });
  }

  decrease(event) {
    this.setState({
      [`${event.target.name}`]: this.state[`${event.target.name}`] - 1
    });
  }

  render() {
    const teams = this.props.state.teams;
    const fixtures = this.props.state.fixtures;
    console.log(fixtures);

    return (
      <form className="matchesList" onSubmit={this.handleSubmit}>
        {typeof fixtures !== "undefined" && (
          <div className="listAllMatches">
            {/* grab only unique values for gameweeks then map array of unique values*/}
            {[...new Set(fixtures.map(fixture => fixture.event))].map(
              gameweek =>
                gameweek === this.state.gameweek && (
                  <div className="gameweekList">
                    <div className="gameweekHeader" key={fixtures.id}>
                      Gameweek {gameweek}
                    </div>
                    {fixtures.map(fixture => {
                      if (fixture.event === gameweek) {
                        return (
                          <MatchDay
                            className="oneMatch"
                            teams={teams}
                            fixtures={fixtures}
                          />
                        );
                      }
                    })}

                    <div className="button">
                      <button type="submit" value="Submit">
                        Submit
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </form>
    );
  }
}

export default Matches;
