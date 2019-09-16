const express = require("express");
const app = express();
const port = 1337;

const unirest = require("unirest");

const fixturesURL =
  "https://sportdata.p.rapidapi.com/api/v1/free/soccer/matches/fixtures/premier-league";

app.get("/api/matches", (req, res) => {
  const fixtures = unirest("GET", fixturesURL);

  fixtures.headers({
    "x-rapidapi-host": "sportdata.p.rapidapi.com",
    "x-rapidapi-key": "0df4770dd9msh8ef7bba17c73268p104d3ajsn15854b41dc5e"
  });

  fixtures.end(function(data) {
    if (data.error) throw new Error(data.error);

    res.send(data.body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
