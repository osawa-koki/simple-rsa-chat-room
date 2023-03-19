import isPrime from '../util/fn.isPrime';

describe('isPrime', () => {
  const testCases = [
    { input: 0, expectedOutput: false },
    { input: 1, expectedOutput: false },
    { input: 2, expectedOutput: true },
    { input: 3, expectedOutput: true },
    { input: 4, expectedOutput: false },
    { input: 5, expectedOutput: true },
    { input: 6, expectedOutput: false },
    { input: 7, expectedOutput: true },
    { input: 8, expectedOutput: false },
    { input: 9, expectedOutput: false },
    { input: 10, expectedOutput: false },
    { input: 11, expectedOutput: true },
    { input: 12, expectedOutput: false },
    { input: 13, expectedOutput: true },
    { input: 97, expectedOutput: true },
    { input: 100, expectedOutput: false },
    { input: 113, expectedOutput: true },
    { input: 123456789, expectedOutput: false },
    { input: 2147483647, expectedOutput: true },
  ];

  testCases.forEach(({ input, expectedOutput }) => {
    test(`isPrime(${input}) returns ${expectedOutput}`, () => {
      expect(isPrime(input)).toBe(expectedOutput);
    });
  });
});
