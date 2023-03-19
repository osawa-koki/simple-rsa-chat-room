import lcm from '../util/fn.lcm';

describe('lcm', () => {
  const testCases = [
    { inputs: [2, 3], expectedOutput: 6 },
    { inputs: [10, 25], expectedOutput: 50 },
    { inputs: [14, 21], expectedOutput: 42 },
    { inputs: [15, 18], expectedOutput: 90 },
    { inputs: [35, 49], expectedOutput: 245 },
    { inputs: [100, 125], expectedOutput: 500 },
    { inputs: [72, 96], expectedOutput: 288 },
    { inputs: [168, 216], expectedOutput: 1512 },
    { inputs: [111, 123], expectedOutput: 4551 },
    { inputs: [222, 123], expectedOutput: 9102 },
    { inputs: [0, 0], expectedOutput: 0 },
  ];

  testCases.forEach(({ inputs, expectedOutput }) => {
    test(`lcm(${inputs}) returns ${expectedOutput}`, () => {
      const [a, b] = inputs;
      expect(lcm(a, b)).toBe(expectedOutput);
      expect(lcm(b, a)).toBe(expectedOutput);
    });
  });

  const badTestCases = [
    { inputs: [2.5, 3] },
    { inputs: [2, 3.5] },
    { inputs: [-2, 3] },
    { inputs: [2, -3] },
  ];

  badTestCases.forEach(({ inputs }) => {
    test(`lcm(${inputs}) throws an error`, () => {
      const [a, b] = inputs;
      expect(() => lcm(a, b)).toThrowError();
      expect(() => lcm(b, a)).toThrowError();
    });
  });
});
