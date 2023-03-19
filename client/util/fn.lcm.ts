import gcd from './fn.gcd';

/**
 * 2つの数の最小公倍数を返します。
 * @param a - 1つ目の数。
 * @param b - 2つ目の数。
 * @returns aとbの最小公倍数。
 */
function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }
  if (a % 1 !== 0 || b % 1 !== 0) {
    throw new Error('引数は整数である必要があります。');
  }
  if (a < 0 || b < 0) {
    throw new Error('引数は正の整数である必要があります。');
  }
  return (a * b) / gcd(a, b);
}

export default lcm;
