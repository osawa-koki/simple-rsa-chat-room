import gcd from './fn.gcd';

/**
 * 2つの素数を受け取り、公開鍵を返します。
 * @param p - p (素数1)
 * @param q - q (素数2)
 * @returns 公開鍵 (n, e)
 */
function getPublicKey(p: number, q: number): [number, number] | null {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 65537; // The default value for the public exponent.

  if (p === q) {
    return null;
  }

  while (gcd(e, phi) !== 1) {
    e++;
  }

  return [n, e];
}

export default getPublicKey;
