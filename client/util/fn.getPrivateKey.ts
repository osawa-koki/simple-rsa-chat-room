import lcm from './fn.lcm';

/** 公開鍵と素数二つから秘密鍵を計算する。
 * @param p - 素数1。
 * @param q - 素数2。
 * @param publicKey - 公開鍵[n, e]。
 * @returns 秘密鍵[n, d]。
 */
function getPrivateKey(
  p: number,
  q: number,
  publicKey: [number, number]
): [number, number] | null {
  const [n, e] = publicKey;
  const phi = lcm(p - 1, q - 1);
  let d = modInv(e, phi);

  if (p === q) {
    return null;
  }

  // dが正の数になるようにする
  while (d < 0) {
    d += phi;
  }
  return [n, d];
}

/** aのmod mにおける逆元を返す。存在しない場合はエラーを返す。
 * @param a - 逆元を求める数。
 * @param m - 剰余の値。
 * @returns aのmod mにおける逆元。
 * @throws 逆元が存在しない場合、エラーを返す。
 */
function modInv(a: number, m: number): number {
  const [gcdVal, x] = extEuclidean(a, m);
  if (gcdVal !== 1) {
    throw new Error(`a = ${a}(mod ${m})における逆元が存在しません。`);
  }
  return ((x % m) + m) % m;
}

/** 拡張ユークリッド互除法。ax + by = gcd(a, b)を満たす[gcd(a, b), x, y]を返す。
 * @param a - 整数1。
 * @param b - 整数2。
 * @returns [gcd(a, b), x, y]。ax + by = gcd(a, b)を満たす。
 */
function extEuclidean(a: number, b: number): [number, number, number] {
  let x = 0;
  let y = 1;
  let u = 1;
  let v = 0;
  while (a !== 0) {
    const q = Math.floor(b / a);
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }

  return [b, x, y];
}

export default getPrivateKey;
