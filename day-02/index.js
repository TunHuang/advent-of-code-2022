const fs = require("fs");
const input = fs.readFileSync("input.txt").toString();

const nestedArray = input.split("\n").map((ele) => ele.split(" "));
console.log(nestedArray);

const shapeScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeScore = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const score = nestedArray.reduce(
  (sum, round) =>
    sum + +shapeScore[round[1]] + outcomeScore[round[0]][round[1]],
  0
);
// Part 1
console.log(score);

const outcomeScore_2 = {
  A: {
    X: 0 + 3,
    Y: 3 + 1,
    Z: 6 + 2,
  },
  B: {
    X: 0 + 1,
    Y: 3 + 2,
    Z: 6 + 3,
  },
  C: {
    X: 0 + 2,
    Y: 3 + 3,
    Z: 6 + 1,
  },
};

const score_2 = nestedArray.reduce(
  (sum, round) => sum + +outcomeScore_2[round[0]][round[1]],
  0
);
// Part 2
console.log(score_2);
