/** 高速なmod演算を用いてa^b(mod m)を計算します。
 * @param a - 底数。
 * @param b - 指数。
 * @param m - 除数。
 * @returns a^b (mod m) の結果。
 */
function modExp(a: number, b: number, m: number): number {
  let result = 1;
  while (b > 0) {
    if (b % 2 === 1) {
      result = (result * a) % m;
    }
    a = (a * a) % m;
    b = Math.floor(b / 2);
  }
  return result;
}

export default modExp;
