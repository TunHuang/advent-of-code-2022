const fs = require("fs");
const input = fs.readFileSync("input.txt").toString();

const nestedArray = input
  .split("\n")
  .map((ele) =>
    ele.split(",").map((ele) => ele.split("-").map((numStr) => +numStr))
  );

const countFullyContains = (array) => {
  let counter = 0;
  array.forEach((arrayPair) => {
    if (
      (arrayPair[0][0] >= arrayPair[1][0] &&
        arrayPair[0][1] <= arrayPair[1][1]) ||
      (arrayPair[1][0] >= arrayPair[0][0] && arrayPair[1][1] <= arrayPair[0][1])
    ) {
      counter++;
    }
  });
  return counter;
};
// Solution Part 1
const result_1 = countFullyContains(nestedArray);
console.log(result_1);

const countOverlap = (array) => {
  let reversedCounter = array.length;
  array.forEach((arrayPair) => {
    if (
      arrayPair[0][1] < arrayPair[1][0] ||
      arrayPair[0][0] > arrayPair[1][1]
    ) {
      reversedCounter--;
    }
  });
  return reversedCounter;
};
// Solution Part 2
const result_2 = countOverlap(nestedArray);
console.log(result_2);
