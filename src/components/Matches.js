import React, { Component } from "react";
import MatchDay from "./matchDay";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    let data = this.props.teams;

    // return Object.keys(data).map(match => {
    //   return data[match].map(team => {
    //     return this.setState({
    //       [`${team.homeTeam}-${team.day}`]: 0,
    //       [`${team.awayTeam}-${team.day}`]: 0
    //     });
    //   });
    // });
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
    const teams = this.props.teams;
    const fixtures = this.props.fixtures;
    console.log("Teams: ", teams);
    console.log("Fixtures: ", fixtures);

    return (
      this.state && (
        <form className="matchesList" onSubmit={this.handleSubmit}>
          <div className="matchesHeader">Gameweek</div>

          <div className="listAllMatches">
            {/* {Object.keys(listOfMatches).map((match, i) => (
              <div className="oneMatch" key={i}>
                <div id="day">{match}</div>
                <MatchDay
                  matchDayList={listOfMatches[match]}
                  handleInput={this.handleChange}
                  state={this.state}
                  increase={this.increase}
                  decrease={this.decrease}
                />
              </div>
            ))} */}
          </div>

          <button type="submit" value="Submit" id="button">
            Submit
          </button>
        </form>
      )
    );
  }
}

export default Matches;
