// Import built-in Node.js module to read files
const fs = require('fs');

// Read input file and split into lines
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let validCount = 0;

input.forEach(line => {
  // Split "1-3 a: abcde"
  const [range, letterPart, password] = line.split(' ');

  const [min, max] = range.split('-').map(Number);
  const letter = letterPart[0];

  // Count occurrences of the letter
  let count = 0;
  for (let char of password) {
    if (char === letter) count++;
  }

  // Check if count is within allowed range
  if (count >= min && count <= max) {
    validCount++;
  }
});

console.log("Part 1:", validCount);

let validCount2 = 0;

input.forEach(line => {
  const [range, letterPart, password] = line.split(' ');

  const [pos1, pos2] = range.split('-').map(Number);
  const letter = letterPart[0];

  // Check positions (convert to 0-based index)
  const firstMatch = password[pos1 - 1] === letter;
  const secondMatch = password[pos2 - 1] === letter;

  // XOR logic: exactly one must be true
  if ((firstMatch || secondMatch) && !(firstMatch && secondMatch)) {
    validCount2++;
  }
});

console.log("Part 2:", validCount2);