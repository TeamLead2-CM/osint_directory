
export function getRandomPairWithDifference4() {
  // First, choose a base number between 1 and 96 (so second number doesn't exceed 100)
  const min = 1;
  const max = 96; // Because 96 + 4 = 100
  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;

  // Randomly decide whether to add or subtract 4 (to get the second number)
  const addOrSubtract = Math.random() < 0.5 ? -4 : 4;
  const num2 = num1 + addOrSubtract;

  return [num1, num2];
}

