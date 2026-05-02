// Import file system module
const fs = require('fs');

// Read file as text
// IMPORTANT: replace \r\n (Windows) to \n for consistency
const raw = fs.readFileSync('input.txt', 'utf-8').replace(/\r/g, '').trim();

// Split into lines (used for some days)
const lines = raw.split('\n');


// Function to count trees for a given slope
function countTrees(right, down) {
  let trees = 0;
  let col = 0;

  // Loop through rows with step = down
  for (let row = 0; row < lines.length; row += down) {

    // Get current row string
    const currentRow = lines[row];

    // Wrap horizontally using modulo
    const position = col % currentRow.length;

    // Check if current position is a tree (#)
    if (currentRow[position] === '#') {
      trees++;
    }

    // Move right
    col += right;
  }

  return trees;
}

// Part 1: slope right 3, down 1
console.log("Day 3 Part 1:", countTrees(3, 1));

// Part 2: multiple slopes
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

// Multiply results
let result = 1;

slopes.forEach(([r, d]) => {
  result *= countTrees(r, d);
});

console.log("Day 3 Part 2:", result);