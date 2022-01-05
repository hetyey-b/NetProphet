const { randomInt } = require("crypto");
const express = require("express");
const json = require("./src/data.json");

const app = express();
app.disable("x-powered-by");

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateSentence = () => {
  let str = "";
  // first we pick either commaCapital, or endingComplete for the start
  let chance = randomIntFromInterval(1, 100);
  if (chance <= 30) {
    return json.endingComplete[
      randomIntFromInterval(0, json.endingComplete.length - 1)
    ];
  }
  str +=
    json.commaCapital[randomIntFromInterval(0, json.commaCapital.length - 1)] +
    " ";

  // now we do some number of commaMiddle, then and endingIncomplete
  let commaMiddleCount = randomIntFromInterval(0, 3);
  for (let i = 0; i < commaMiddleCount; i++) {
    str +=
      json.commaMiddle[randomIntFromInterval(0, json.commaMiddle.length - 1)] +
      " ";
  }

  str +=
    json.endingIncomplete[
      randomIntFromInterval(0, json.endingIncomplete.length - 1)
    ];

  return str;
};

app.get("/", (req, res) => {
  let str = generateSentence();
  str += "<br/>" + generateSentence();
  str += "<br/>" + generateSentence();
  str += "<br/>" + generateSentence();
  res.send(str);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
