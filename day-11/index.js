const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const splittedByMonkey = input.split('\n\n');
const eachSplittedByLinebreak = splittedByMonkey.map((monkey) =>
  monkey.split('\n')
);
const lineSplittedBySpace = eachSplittedByLinebreak.map((monkey) =>
  monkey.map((line) => line.trim().split(' '))
);
const inputArrayOfObjects = lineSplittedBySpace.map((monkey) => ({
  startingItems: monkey[1].slice(2).map((str) => parseInt(str)),
  operation: monkey[2].slice(-2),
  test: +monkey[3].slice(-1),
  indexTrue: +monkey[4].slice(-1),
  indexFalse: +monkey[5].slice(-1),
}));
// Needed for Part 2
const commonMultipleOfTestDivisor = inputArrayOfObjects.reduce(
  (product, monkey) => product * monkey.test,
  1
);

class Monkey {
  constructor(startingItems, operation, testDivisible, indexTrue, indexFalse) {
    this.items = startingItems;
    this.operation = operation;
    this.testDivisible = testDivisible;
    this.indexTrue = indexTrue;
    this.indexFalse = indexFalse;
    this.inspectedTimes = 0;
  }
  changeWorryLevel(oldWorryLevel) {
    if (this.operation[0] === '+') {
      if (this.operation[1] === 'old') {
        return oldWorryLevel + oldWorryLevel;
      }
      return oldWorryLevel + +this.operation[1];
    } else {
      if (this.operation[1] === 'old') {
        return oldWorryLevel * oldWorryLevel;
      }
      return oldWorryLevel * +this.operation[1];
    }
  }
  play() {
    this.inspectedTimes += this.items.length;
    while (this.items.length) {
      let item = this.items.shift();
      item = this.changeWorryLevel(item);
      // Part 1
      // item = Math.floor(item / 3);
      item = item % commonMultipleOfTestDivisor;
      if (item % this.testDivisible === 0) {
        monkeysArray[this.indexTrue].items.push(item);
      } else {
        monkeysArray[this.indexFalse].items.push(item);
      }
    }
  }
}

const monkeysArray = [];
inputArrayOfObjects.forEach((input) =>
  monkeysArray.push(
    new Monkey(
      input.startingItems,
      input.operation,
      input.test,
      input.indexTrue,
      input.indexFalse
    )
  )
);
// console.log(monkeysArray);

for (let i = 0; i < 10000; i++) {
  monkeysArray.forEach((monkey) => monkey.play());
}
// console.log('monkeys after playing:', monkeysArray);
const inspectedTimesSorted = monkeysArray
  .map((monkey) => monkey.inspectedTimes)
  .sort((a, b) => b - a);
const monkeyBusiness = inspectedTimesSorted[0] * inspectedTimesSorted[1];
console.log(monkeyBusiness);
