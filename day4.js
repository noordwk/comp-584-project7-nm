// Import file system module
const fs = require('fs');

// Read file as text
// IMPORTANT: replace \r\n (Windows) to \n for consistency
const raw = fs.readFileSync('input.txt', 'utf-8').replace(/\r/g, '').trim();

// Split into lines (used for some days)
const lines = raw.split('\n');


// Split passports by blank lines
const passports = raw.split('\n\n');

const required = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

let part1 = 0;
let part2 = 0;

passports.forEach(passport => {

  // Convert passport into key-value object
  const fields = Object.fromEntries(
    passport
      .split(/\s+/) // split by spaces OR newlines
      .map(p => p.split(':'))
  );

  // --- PART 1 ---
  const hasAllFields = required.every(field => field in fields);

  if (hasAllFields) part1++;

  // --- PART 2 ---
  if (!hasAllFields) return;

  // Validate each field carefully

  const byr = Number(fields.byr) >= 1920 && Number(fields.byr) <= 2002;
  const iyr = Number(fields.iyr) >= 2010 && Number(fields.iyr) <= 2020;
  const eyr = Number(fields.eyr) >= 2020 && Number(fields.eyr) <= 2030;

  let hgt = false;
  if (fields.hgt) {
    const match = fields.hgt.match(/^(\d+)(cm|in)$/);
    if (match) {
      const value = Number(match[1]);
      const unit = match[2];

      if (unit === 'cm') hgt = value >= 150 && value <= 193;
      if (unit === 'in') hgt = value >= 59 && value <= 76;
    }
  }

  const hcl = /^#[0-9a-f]{6}$/.test(fields.hcl || '');
  const ecl = ['amb','blu','brn','gry','grn','hzl','oth'].includes(fields.ecl);
  const pid = /^[0-9]{9}$/.test(fields.pid || '');

  if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
    part2++;
  }
});

console.log("Day 4 Part 1:", part1);
console.log("Day 4 Part 2:", part2);