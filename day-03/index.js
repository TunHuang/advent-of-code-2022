const fs = require("fs");
const input = fs.readFileSync("input.txt").toString();

const inputArray = input.split("\n");
const nestedArray = inputArray.map((string) => [
  string.slice(0, string.length / 2),
  string.slice(string.length / 2),
]);

const wrongItemArray = nestedArray.map((comparments) => {
  for (const char of comparments[0]) {
    if (comparments[1].includes(char)) {
      return char;
    }
  }
});

const getPriority = (char) => {
  const codeValue = char.codePointAt(0);
  // uppercase
  if (codeValue < 91) {
    return codeValue - 38;
  }
  return codeValue - 96;
};
const sumPriority = wrongItemArray.reduce(
  (sum, char) => sum + getPriority(char),
  0
);
// Solution Part 1
console.log(sumPriority);

const threeElfGroups = [];

for (let i = 0; i < inputArray.length; i = i + 3) {
  const group = [inputArray[i], inputArray[i + 1], inputArray[i + 2]];
  threeElfGroups.push(group);
}

const badges = threeElfGroups.map((group) => {
  for (const char of group[0]) {
    if (group[1].includes(char) && group[2].includes(char)) {
      return char;
    }
  }
});
const sumBadgesPriority = badges.reduce(
  (sum, badge) => sum + getPriority(badge),
  0
);
// Solution Part 2
console.log(sumBadgesPriority);
