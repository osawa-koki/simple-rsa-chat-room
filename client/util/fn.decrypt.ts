import modExp from './fn.modExp';

/**
 * 秘密鍵を用いて暗号化されたデータを復号します。
 * @param privateKey - 復号に使用する秘密鍵。
 * @param encrypted - 暗号化されたデータ。
 * @returns 復号されたデータ。
 */
function decrypt(privateKey: [number, number], encrypted: string): string {
  const [n, d] = privateKey;
  const blockSize = Math.floor(Math.log10(n) / Math.log10(2)) - 1;
  const encryptedBlocks =
    encrypted.match(new RegExp(`.{1,${blockSize + 1}}`, 'g')) || [];
  const decryptedChars = encryptedBlocks.map((block) =>
    modExp(parseInt(block, 10), d, n)
  );
  const decryptedString = String.fromCharCode(...decryptedChars);
  const decodedString = decodeURIComponent(decryptedString);
  return decodedString;
}

export default decrypt;
