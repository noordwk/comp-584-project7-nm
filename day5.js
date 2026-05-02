// Import file system module
const fs = require('fs');

// Read file as text
// IMPORTANT: replace \r\n (Windows) to \n for consistency
const raw = fs.readFileSync('input.txt', 'utf-8').replace(/\r/g, '').trim();

// Split into lines (used for some days)
const lines = raw.split('\n');

function getSeatId(code) {

  // Replace characters to binary string
  const binary = code
    .replace(/F/g, '0')
    .replace(/B/g, '1')
    .replace(/L/g, '0')
    .replace(/R/g, '1');

  // Extract row and column
  const row = parseInt(binary.slice(0, 7), 2);
  const col = parseInt(binary.slice(7), 2);

  return row * 8 + col;
}

// Compute all IDs
const seatIds = lines.map(getSeatId);

// Part 1
const maxId = Math.max(...seatIds);
console.log("Day 5 Part 1:", maxId);

// Part 2
seatIds.sort((a, b) => a - b);

for (let i = 1; i < seatIds.length; i++) {

  // Look for missing seat (gap of 2)
  if (seatIds[i] - seatIds[i - 1] === 2) {
    console.log("Day 5 Part 2:", seatIds[i] - 1);
  }
}