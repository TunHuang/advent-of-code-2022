const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input
  .split('\n')
  .map((line) => line.split(' '))
  .map((motion) => [motion[0], +motion[1]]);
// [y-coordinate, x-coordinate]
// Part 1
// const rope = [[0, 0], [0, 0]];
// Part 2
const rope = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

function moveRope(rope, motion, visited) {
  switch (motion[0]) {
    case 'U':
      for (let i = 0; i < motion[1]; i++) {
        rope[0][0]--;
        for (let j = 0; j < rope.length - 1; j++) {
          moveNextKnot(rope[j], rope[j + 1]);
        }
        visited.add(createPositionString(rope.at(-1)));
      }
      break;
    case 'D':
      for (let i = 0; i < motion[1]; i++) {
        rope[0][0]++;
        for (let j = 0; j < rope.length - 1; j++) {
          moveNextKnot(rope[j], rope[j + 1]);
        }
        visited.add(createPositionString(rope.at(-1)));
      }
      break;
    case 'L':
      for (let i = 0; i < motion[1]; i++) {
        rope[0][1]--;
        for (let j = 0; j < rope.length - 1; j++) {
          moveNextKnot(rope[j], rope[j + 1]);
        }
        visited.add(createPositionString(rope.at(-1)));
      }
      break;
    case 'R':
      for (let i = 0; i < motion[1]; i++) {
        rope[0][1]++;
        for (let j = 0; j < rope.length - 1; j++) {
          moveNextKnot(rope[j], rope[j + 1]);
        }
        visited.add(createPositionString(rope.at(-1)));
      }
      break;
    default:
      throw new Error('Unknown motion for Head: ' + motion);
  }
}

function moveNextKnot(currKnot, nextKnot) {
  // overlap
  if (currKnot[0] === nextKnot[0] && currKnot[1] === nextKnot[1]) {
    return;
  }
  // diagonal exact by 1
  if (
    Math.abs(currKnot[0] - nextKnot[0]) === 1 &&
    Math.abs(currKnot[1] - nextKnot[1]) === 1
  ) {
    return;
  }
  // same row
  if (currKnot[0] === nextKnot[0]) {
    if (Math.abs(currKnot[1] - nextKnot[1]) === 1) {
      return;
    }
    if (currKnot[1] > nextKnot[1]) {
      nextKnot[1]++;
    } else {
      nextKnot[1]--;
    }
  }
  // same column
  if (currKnot[1] === nextKnot[1]) {
    if (Math.abs(currKnot[0] - nextKnot[0]) === 1) {
      return;
    }
    if (currKnot[0] > nextKnot[0]) {
      nextKnot[0]++;
    } else {
      nextKnot[0]--;
    }
  }
  // bottom right
  if (currKnot[0] > nextKnot[0] && currKnot[1] > nextKnot[1]) {
    nextKnot[0]++;
    nextKnot[1]++;
  }
  // bottom left
  if (currKnot[0] > nextKnot[0] && currKnot[1] < nextKnot[1]) {
    nextKnot[0]++;
    nextKnot[1]--;
  }
  // top left
  if (currKnot[0] < nextKnot[0] && currKnot[1] < nextKnot[1]) {
    nextKnot[0]--;
    nextKnot[1]--;
  }
  // top right
  if (currKnot[0] < nextKnot[0] && currKnot[1] > nextKnot[1]) {
    nextKnot[0]--;
    nextKnot[1]++;
  }
}

const createPositionString = (positionArray) =>
  positionArray[0] + '-' + positionArray[1];

function simulateMotions(rope, motions) {
  const positionsVisitedByTail = new Set();
  positionsVisitedByTail.add(createPositionString(rope.at(-1)));

  motions.forEach((motion) => {
    moveRope(rope, motion, positionsVisitedByTail);
  });

  return positionsVisitedByTail;
}

const positionsVisitedByTail = simulateMotions(rope, inputArray);
console.log(positionsVisitedByTail.size);
