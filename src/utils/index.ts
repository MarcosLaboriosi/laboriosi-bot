import emoji from "@constants/emojis";

export function generateRandomNumber(limit: number): number {
  const randomNumber = Math.random() * limit;
  const roundedRandomNumber = Math.floor(randomNumber);
  return roundedRandomNumber;
}

export function getRandomEmoji() {
  const randomIndex = generateRandomNumber(emoji.length);
  return emoji[randomIndex];
}

export function sanitizeToTextPattern(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}
