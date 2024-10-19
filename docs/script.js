function add(numbers) {
  if (numbers === "") return 0; // Handle empty string

  let delimiter = /,|\n/; // Default delimiters: comma or newline

  if (numbers.startsWith("//")) {
    // Check for custom delimiter format
    const parts = numbers.split("\n");
    delimiter = new RegExp(parts[0].slice(2));
    numbers = parts[1]; // Remaining part is the actual numbers
  }

  let numArray = numbers.split(delimiter).map(Number); // Split the numbers using the delimiter(s)

  const negatives = numArray.filter((num) => num < 0); //  Handle negative numbers by collecting them
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return numArray.reduce((sum, num) => sum + num, 0); // Calculate the sum
}

console.log(add("") === 0, "Test 1 Failed: Empty string should return 0");
console.log(add("1") === 1, 'Test 2 Failed: "1" should return 1');
console.log(add("1,5") === 6, 'Test 3 Failed: "1,5" should return 6');
console.log(add("1,2,3") === 6, 'Test 4 Failed: "1,2,3" should return 6');
console.log(add("1\n2,3") === 6, 'Test 5 Failed: "1\\n2,3" should return 6');
console.log(
  add("//;\n1;2") === 3,
  'Test 6 Failed: "//;\\n1;2" should return 3'
);

console.log(
  add("1,10,1,8") === 16,
  'Test 7 Failed: "1,10,1,8" should return 16'
);

try {
  add("-1,2,-3");
} catch (e) {
  console.log(
    e.message === "Negative numbers not allowed: -1, -3",
    "Test 8 Failed: Negative numbers should throw error"
  );
}

try {
  add("1,10,1,-8");
} catch (e) {
  console.log(
    e.message === "Negative numbers not allowed: -8",
    "Test 9 Failed: Negative numbers should throw error"
  );
}
