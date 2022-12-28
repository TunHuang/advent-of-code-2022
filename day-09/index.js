const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
// const input = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;
const inputArray = input
  .split('\n')
  .map((line) => line.split(' '))
  .map((motion) => [motion[0], +motion[1]]);
// [y-coordinate, x-coordinate]
const headPosition = [0, 0];
const tailPosition = [0, 0];
// console.log(inputArray);
function moveHeadThenTail(head, tail, motion, visited) {
  switch (motion[0]) {
    case 'U':
      for (let i = 0; i < motion[1]; i++) {
        head[0]--;
        moveNextKnot(head, tail);
        visited.add(createPositionString(tail));
      }
      break;
    case 'D':
      for (let i = 0; i < motion[1]; i++) {
        head[0]++;
        moveNextKnot(head, tail);
        visited.add(createPositionString(tail));
      }
      break;
    case 'L':
      for (let i = 0; i < motion[1]; i++) {
        head[1]--;
        moveNextKnot(head, tail);
        visited.add(createPositionString(tail));
      }
      break;
    case 'R':
      for (let i = 0; i < motion[1]; i++) {
        head[1]++;
        moveNextKnot(head, tail);
        visited.add(createPositionString(tail));
      }
      break;
    default:
      throw new Error('Unknown motion for Head: ' + motion);
  }
  // return visited;
}

function moveNextKnot(head, tail) {
  // overlap
  if (head[0] === tail[0] && head[1] === tail[1]) {
    return;
  }
  // diagonal exact by 1
  if (Math.abs(head[0] - tail[0]) === 1 && Math.abs(head[1] - tail[1]) === 1) {
    return;
  }
  // same row
  if (head[0] === tail[0]) {
    if (Math.abs(head[1] - tail[1]) === 1) {
      return;
    }
    if (head[1] > tail[1]) {
      tail[1]++;
    } else {
      tail[1]--;
    }
  }
  // same column
  if (head[1] === tail[1]) {
    if (Math.abs(head[0] - tail[0]) === 1) {
      return;
    }
    if (head[0] > tail[0]) {
      tail[0]++;
    } else {
      tail[0]--;
    }
  }
  // bottom right
  if (head[0] > tail[0] && head[1] > tail[1]) {
    tail[0]++;
    tail[1]++;
  }
  // bottom left
  if (head[0] > tail[0] && head[1] < tail[1]) {
    tail[0]++;
    tail[1]--;
  }
  // top left
  if (head[0] < tail[0] && head[1] < tail[1]) {
    tail[0]--;
    tail[1]--;
  }
  // top right
  if (head[0] < tail[0] && head[1] > tail[1]) {
    tail[0]--;
    tail[1]++;
  }
}

const createPositionString = (positionArray) =>
  positionArray[0] + '-' + positionArray[1];

function simulateMotions(head, tail, motions) {
  const positionsVisitedByTail = new Set();
  positionsVisitedByTail.add(createPositionString(tailPosition));

  motions.forEach((motion) => {
    moveHeadThenTail(head, tail, motion, positionsVisitedByTail);
  });

  return positionsVisitedByTail;
}

const positionsVisitedByTail = simulateMotions(
  headPosition,
  tailPosition,
  inputArray
);
console.log(positionsVisitedByTail.size);
