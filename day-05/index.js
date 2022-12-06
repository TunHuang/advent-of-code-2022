/**
        [Q] [B]         [H]        
    [F] [W] [D] [Q]     [S]        
    [D] [C] [N] [S] [G] [F]        
    [R] [D] [L] [C] [N] [Q]     [R]
[V] [W] [L] [M] [P] [S] [M]     [M]
[J] [B] [F] [P] [B] [B] [P] [F] [F]
[B] [V] [G] [J] [N] [D] [B] [L] [V]
[D] [P] [R] [W] [H] [R] [Z] [W] [S]
 1   2   3   4   5   6   7   8   9 
 * 
 */
const crates = [
  [],
  ['D', 'B', 'J', 'V'],
  ['P', 'V', 'B', 'W', 'R', 'D', 'F'],
  ['R', 'G', 'F', 'L', 'D', 'C', 'W', 'Q'],
  ['W', 'J', 'P', 'M', 'L', 'N', 'D', 'B'],
  ['H', 'N', 'B', 'P', 'C', 'S', 'Q'],
  ['R', 'D', 'B', 'S', 'N', 'G'],
  ['Z', 'B', 'P', 'M', 'Q', 'F', 'S', 'H'],
  ['W', 'L', 'F'],
  ['S', 'V', 'F', 'M', 'R'],
];

const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const rearrangement = input
  .split('\n')
  .map((row) => row.split(' '))
  .map((row) => ({ [row[0]]: +row[1], [row[2]]: +row[3], [row[4]]: +row[5] }));

// Part 1
// rearrangement.forEach((procedure) => {
//   for (let i = 0; i < procedure.move; i++) {
//     crates[procedure.to].push(crates[procedure.from].pop());
//   }
// });
// // Solution Part 1
// crates.forEach((crate) => console.log(crate.at(-1)));

// Part 2
rearrangement.forEach((procedure) =>
  crates[procedure.to].push(...crates[procedure.from].splice(-procedure.move))
);
// Solution Part 2
crates.forEach((crate) => console.log(crate.at(-1)));
