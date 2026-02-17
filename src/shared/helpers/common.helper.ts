export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], count?: number):T[] {
  if (count === undefined) {
    const startPosition = generateRandomValue(0, items.length - 1);
    const endPosition = startPosition + generateRandomValue(startPosition, items.length);
    return items.slice(startPosition, endPosition);
  }

  const safeCount = Math.min(count, items.length);
  const startPosition = generateRandomValue(0, items.length - safeCount);
  return items.slice(startPosition, startPosition + safeCount);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}
