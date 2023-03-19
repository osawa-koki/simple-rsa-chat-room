import modExp from './fn.modExp';

/**
 * RSA暗号に基づき、指定された公開鍵でデータを暗号化します。
 * @param publicKey - 公開鍵[n, e]。
 * @param message - 暗号化するデータ。
 * @returns 暗号化されたデータ。
 */
function encrypt(publicKey: [number, number], message: string): string {
  const _message = encodeURIComponent(message);
  const [n, e] = publicKey;
  const blockSize = Math.floor(Math.log10(n) / Math.log10(2)) - 1;
  const blocks = _message.split('').reduce((acc: string[], char: string) => {
    const code = char.charCodeAt(0);
    const padded = code.toString().padStart(blockSize, '0');
    acc.push(padded);
    return acc;
  }, []);
  const encryptedBlocks = blocks.map((block) => {
    const num = parseInt(block, 10);
    return modExp(num, e, n)
      .toString()
      .padStart(blockSize + 1, '0');
  });
  return encryptedBlocks.join('');
}

export default encrypt;
