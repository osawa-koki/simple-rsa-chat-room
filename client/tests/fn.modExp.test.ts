import modExp from '../util/fn.modExp';

describe('modExp', () => {
  const testCases = [
    { inputs: [2, 5, 13], expectedOutput: 6 },
    { inputs: [3, 7, 13], expectedOutput: 3 },
    { inputs: [5, 11, 13], expectedOutput: 8 },
    { inputs: [7, 13, 13], expectedOutput: 7 },
    { inputs: [11, 17, 13], expectedOutput: 7 },
    { inputs: [13, 19, 13], expectedOutput: 0 },
    { inputs: [17, 23, 13], expectedOutput: 10 },
    { inputs: [19, 29, 13], expectedOutput: 2 },
    { inputs: [23, 31, 13], expectedOutput: 10 },
    { inputs: [29, 37, 13], expectedOutput: 3 },
  ];

  testCases.forEach(({ inputs, expectedOutput }) => {
    const [a, b, m] = inputs;
    test(`modExp(${a}, ${b}, ${m}) returns ${expectedOutput}`, () => {
      expect(modExp(a, b, m)).toBe(expectedOutput);
    });
  });
});
