const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n');

function checkVisible(grid, y, x) {
  const columnLength = grid.length;
  const rowLength = grid[0].length;
  const treeHeight = grid[y][x];
  if (y === 0 || y === columnLength - 1 || x === 0 || x === rowLength - 1) {
    return true;
  }
  let notVisibleDirections = 0;
  for (let i = 0; i < y; i++) {
    if (grid[i][x] >= treeHeight) {
      notVisibleDirections++;
      break;
    }
  }
  for (let i = y + 1; i < columnLength; i++) {
    if (grid[i][x] >= treeHeight) {
      notVisibleDirections++;
      break;
    }
  }
  for (let i = 0; i < x; i++) {
    if (grid[y][i] >= treeHeight) {
      notVisibleDirections++;
      break;
    }
  }
  for (let i = x + 1; i < rowLength; i++) {
    if (grid[y][i] >= treeHeight) {
      notVisibleDirections++;
      break;
    }
  }
  return notVisibleDirections === 4 ? false : true;
}

function countVisibleTrees(grid) {
  let counter = 0;
  const columnLength = grid.length;
  const rowLength = grid[0].length;
  for (let y = 0; y < columnLength; y++) {
    for (let x = 0; x < rowLength; x++) {
      if (checkVisible(grid, y, x)) {
        counter++;
      }
    }
  }
  return counter;
}
// Part 1
const visibleTrees = countVisibleTrees(inputArray);
console.log(visibleTrees);

// Part 2
function calcScenicScore(grid, y, x) {
  const columnLength = grid.length;
  const rowLength = grid[0].length;
  const treeHeight = grid[y][x];
  if (y === 0 || y === columnLength - 1 || x === 0 || x === rowLength - 1) {
    return 0;
  }
  let viewingDistanceNorth = 0;
  let viewingDistanceSouth = 0;
  let viewingDistanceWest = 0;
  let viewingDistanceEast = 0;
  for (let i = y - 1; i >= 0; i--) {
    viewingDistanceNorth++;
    if (grid[i][x] >= treeHeight) {
      break;
    }
  }
  for (let i = y + 1; i < columnLength; i++) {
    viewingDistanceSouth++;
    if (grid[i][x] >= treeHeight) {
      break;
    }
  }
  for (let i = x - 1; i >= 0; i--) {
    viewingDistanceWest++;
    if (grid[y][i] >= treeHeight) {
      break;
    }
  }
  for (let i = x + 1; i < rowLength; i++) {
    viewingDistanceEast++;
    if (grid[y][i] >= treeHeight) {
      break;
    }
  }
  return (
    viewingDistanceNorth *
    viewingDistanceSouth *
    viewingDistanceWest *
    viewingDistanceEast
  );
}

function getMaxScenicScore(grid) {
  let maxScenicScore = 0;
  const columnLength = grid.length;
  const rowLength = grid[0].length;
  for (let y = 0; y < columnLength; y++) {
    for (let x = 0; x < rowLength; x++) {
      const score = calcScenicScore(grid, y, x);
      if (score > maxScenicScore) {
        maxScenicScore = score;
      }
    }
  }
  return maxScenicScore;
}

const maxScenicScore = getMaxScenicScore(inputArray);
console.log(maxScenicScore);
