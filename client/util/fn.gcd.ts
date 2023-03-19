/**
 * ユークリッドの互除法を使って、2つの数の最大公約数を返します。
 * @param a - 1つ目の数。
 * @param b - 2つ目の数。
 * @returns aとbの最大公約数。
 */
function gcd(a: number, b: number): number {
  if (a < 0 || b < 0) {
    throw new Error('引数は正の整数である必要があります。');
  }
  if (a % 1 !== 0 || b % 1 !== 0) {
    throw new Error('引数は正の整数である必要があります。');
  }
  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

export default gcd;
