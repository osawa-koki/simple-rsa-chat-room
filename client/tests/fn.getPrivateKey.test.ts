import getPrivateKey from '../util/fn.getPrivateKey';

describe('getPrivateKey', () => {
  const testCases: {
    p: number;
    q: number;
    publicKey: [number, number];
    expectedPrivateKey: [number, number];
  }[] = [
    {
      p: 3,
      q: 5,
      publicKey: [15, 65537],
      expectedPrivateKey: [15, 1],
    },
    {
      p: 61,
      q: 53,
      publicKey: [3233, 17],
      expectedPrivateKey: [3233, 413],
    },
    {
      p: 71,
      q: 61,
      publicKey: [4979, 19],
      expectedPrivateKey: [4979, 199],
    },
  ];

  testCases.forEach(({ p, q, publicKey, expectedPrivateKey }) => {
    const [n, d] = expectedPrivateKey;
    it(`getPrivateKey(${p}, ${q}, [${publicKey[0]}, ${publicKey[1]}]) returns [${n}, ${d}]`, () => {
      expect(getPrivateKey(p, q, publicKey)).toEqual(expectedPrivateKey);
    });
  });
});
