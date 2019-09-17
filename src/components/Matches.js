import React, { Component } from "react";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      homeTeam: "",
      homePrediction: "",
      awayTeam: "",
      awayPrediction: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      homeTeam: this.props.match.homeTeam,
      awayTeam: this.props.match.awayTeam
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `You predicted ${this.state.homeTeam} [${this.state.homePrediction}] and ${this.state.awayTeam} [${this.state.awayPrediction}]`
    );
  }

  render() {
    const matches = this.props.matches;

    return (
      <form className="matchesList" onSubmit={this.handleSubmit}>
        <h4 className="matchesHeader">Gameweek</h4>

        <div className="listAllMatches">
          {matches.map(match => (
            <div className="oneMatch" key={match.idd}>
              <div id="day">{match.day}</div>
              <div id="teamContainer">
                <label id="homeTeam">
                  <div className="teamName">{match.homeTeam}</div>
                  <input
                    type="number"
                    name="homePrediction"
                    className="teamPredictionInput"
                    value={this.state.homePrediction}
                    onChange={this.handleChange}
                  />
                </label>

                <label id="awayTeam">
                  <div className="teamName">{match.awayTeam}</div>
                  <input
                    type="number"
                    name="awayPrediction"
                    className="teamPredictionInput"
                    value={this.state.awayPrediction}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" value="Submit" id="button">
          Submit
        </button>
      </form>
    );
  }
}

export default Matches;
