/**
 * 受け取った数値が素数かどうかを判定します。
 * @param n - 判定する数値
 * @returns 素数ならtrue、そうでなければfalse
 */
function isPrime(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export default isPrime;
