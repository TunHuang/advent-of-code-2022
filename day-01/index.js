const fs = require("fs");
const input = fs.readFileSync("input.txt").toString();

const foodPerElf = input.split("\n\n").map((foods) => foods.split("\n"));
const caloriesPerElf = foodPerElf.map((foods) =>
  foods.length === 1 ? +foods[0] : foods.reduce((sum, cur) => +sum + +cur)
);
const maxCalories = Math.max(...caloriesPerElf);
// solution part 1
console.log(maxCalories);

caloriesPerElf.sort((a, b) => b - a);
const sumTop3 = caloriesPerElf.slice(0, 3).reduce((sum, cur) => sum + cur);
// solution part 2
console.log(sumTop3);
