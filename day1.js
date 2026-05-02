// Import built-in Node.js module to read files
const fs = require('fs');

// Read input file and split into lines
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

// Convert all input strings into numbers
const numbers = input.map(Number);

// Loop through each number
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {

    // Check if two numbers add up to 2020
    if (numbers[i] + numbers[j] === 2020) {
      
      // Multiply and print result
      console.log("Part 1:", numbers[i] * numbers[j]);
    }
  }
}

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    for (let k = j + 1; k < numbers.length; k++) {

      // Check if three numbers sum to 2020
      if (numbers[i] + numbers[j] + numbers[k] === 2020) {
        console.log("Part 2:", numbers[i] * numbers[j] * numbers[k]);
      }
    }
  }
}