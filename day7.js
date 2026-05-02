// Import file system module
const fs = require('fs');

// Read file as text
// IMPORTANT: replace \r\n (Windows) to \n for consistency
const raw = fs.readFileSync('input.txt', 'utf-8').replace(/\r/g, '').trim();

// Split into lines (used for some days)
const lines = raw.split('\n');

// Build graph: parent -> children
const contains = {};

lines.forEach(line => {

  const [parent, rest] = line.split(' bags contain ');

  contains[parent] = [];

  // Skip "no other bags"
  if (rest.includes('no other')) return;

  // Extract children
  rest.split(',').forEach(part => {

    const match = part.match(/(\d+) (.+?) bag/);

    if (match) {
      contains[parent].push({
        count: Number(match[1]),
        color: match[2]
      });
    }
  });
});


// --- PART 1 ---
// Reverse graph: child -> parents
const reverse = {};

Object.keys(contains).forEach(parent => {
  contains[parent].forEach(child => {

    if (!reverse[child.color]) reverse[child.color] = [];
    reverse[child.color].push(parent);
  });
});

// BFS
const seen = new Set();
const stack = ['shiny gold'];

while (stack.length) {
  const current = stack.pop();

  (reverse[current] || []).forEach(parent => {
    if (!seen.has(parent)) {
      seen.add(parent);
      stack.push(parent);
    }
  });
}

console.log("Day 7 Part 1:", seen.size);


// --- PART 2 ---
// Recursive count
function countBags(color) {

  let total = 0;

  contains[color].forEach(child => {

    // Add child + nested children
    total += child.count + child.count * countBags(child.color);
  });

  return total;
}

console.log("Day 7 Part 2:", countBags('shiny gold'));