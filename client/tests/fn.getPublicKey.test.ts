import getPublicKey from '../util/fn.getPublicKey';

describe('getPublicKey', () => {
  const testCases: {
    inputs: [number, number];
    expectedOutput: [number, number];
  }[] = [
    {
      inputs: [3, 5],
      expectedOutput: [15, 65537],
    },
    {
      inputs: [11, 17],
      expectedOutput: [187, 65537],
    },
    {
      inputs: [101, 103],
      expectedOutput: [10403, 65537],
    },
    {
      inputs: [631, 641],
      expectedOutput: [404471, 65537],
    },
    {
      inputs: [10007, 10009],
      expectedOutput: [100160063, 65537],
    },
  ];

  testCases.forEach(({ inputs, expectedOutput }) => {
    const [p, q] = inputs;
    const [n, e] = expectedOutput;

    it(`getPublicKey(${p}, ${q}) returns [${n}, ${e}]`, () => {
      expect(getPublicKey(p, q)).toEqual([n, e]);
    });
  });
});
