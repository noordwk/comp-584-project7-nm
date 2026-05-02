// Import file system module
const fs = require('fs');

// Read file as text
// IMPORTANT: replace \r\n (Windows) to \n for consistency
const raw = fs.readFileSync('input.txt', 'utf-8').replace(/\r/g, '').trim();

// Split into lines (used for some days)
const lines = raw.split('\n');

// Split groups by blank lines
const groups = raw.split('\n\n');

// --- PART 1 ---
let part1 = 0;

groups.forEach(group => {

  // Remove all newlines
  const answers = group.replace(/\n/g, '');

  // Use Set to count unique answers
  const unique = new Set(answers);

  part1 += unique.size;
});

console.log("Day 6 Part 1:", part1);

// --- PART 2 ---
let part2 = 0;

groups.forEach(group => {

  const people = group.split('\n');

  // Start with first person's answers
  let common = new Set(people[0]);

  // Intersect with others
  for (let i = 1; i < people.length; i++) {
    common = new Set(
      [...common].filter(char => people[i].includes(char))
    );
  }

  part2 += common.size;
});

console.log("Day 6 Part 2:", part2);