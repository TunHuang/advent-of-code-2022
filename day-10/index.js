const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input
  .split('\n')
  .map((line) => line.split(' '))
  .map((line) => (line[0] === 'addx' ? [line[0], +line[1]] : line));

const executeProgram = (instructions) => {
  const xValueHistory = [];
  let xCurrentValue = 1;
  instructions.forEach((instruction) => {
    xValueHistory.push(xCurrentValue);
    switch (instruction[0]) {
      case 'noop':
        break;
      case 'addx':
        xValueHistory.push(xCurrentValue);
        xCurrentValue += instruction[1];
        break;
      default:
        break;
    }
  });
  xValueHistory.push(xCurrentValue);
  return xValueHistory;
};
const xValues = executeProgram(inputArray);

// Part 1
const result_1 =
  xValues[19] * 20 +
  xValues[59] * 60 +
  xValues[99] * 100 +
  xValues[139] * 140 +
  xValues[179] * 180 +
  xValues[219] * 220;

console.log(result_1);

// Part 2
const renderCrt = (xRegister) => {
  const imageMatrix = [[], [], [], [], [], []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 40; j++) {
      if (Math.abs(j - xRegister[j + i * 40]) < 2) {
        imageMatrix[i].push('#');
      } else {
        imageMatrix[i].push('.');
      }
    }
  }
  return imageMatrix;
};

const paintToTerminal = (imageMatrix) =>
  imageMatrix
    .map((array) => array.join(''))
    .forEach((line) => console.log(line));

const imageMatrix = renderCrt(xValues);
paintToTerminal(imageMatrix);
