import decrypt from '../util/fn.decrypt';
import encrypt from '../util/fn.encrypt';
import getPrivateKey from '../util/fn.getPrivateKey';
import getPublicKey from '../util/fn.getPublicKey';

const primes = [
  11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
  89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167,
  173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251,
  257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347,
  349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433,
  439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523,
  541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619,
  631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727,
  733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
  829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937,
  941, 947, 953, 967, 971, 977, 983, 991, 997,
];
const messages = [
  'dog',
  'cat',
  'bird',
  'fish',
  'rabbit',
  'hamster',
  'snake',
  'lizard',
  'frog',
  'turtle',
  'horse',
  'cow',
  'pig',
  'sheep',
  'goat',
  'chicken',
  'duck',
  'goose',
  'deer',
  'bear',
  'wolf',
  'fox',
  'squirrel',
  'mouse',
  'rat',
  '123',
  '%%%',
  '!!!',
  '###',
  '&&&',
  '***',
  '???',
  '...',
  '---',
  '___',
  '+++',
  '===',
  '^^^',
  '|||',
  '<<<',
  '>>>',
  'あいうえお',
  'かきくけこ',
  'さしすせそ',
  'たちつてと',
  'なにぬねの',
  'はひふへほ',
  'まみむめも',
  'やゆよ',
  'らりるれろ',
  'わをん',
  'アイウエオ',
  'カキクケコ',
  'サシスセソ',
  'タチツテト',
  'ナニヌネノ',
  'ハヒフヘホ',
  'マミムメモ',
  'ヤユヨ',
  'ラリルレロ',
  'ワヲン',
  '電子計算機',
  '電子計算機科学',
];

describe('Encrypt-Decrypt', () => {
  for (let i = 0; i < 500; i++) {
    const prime1 = primes[Math.floor(Math.random() * primes.length)];
    const prime2 = primes[Math.floor(Math.random() * primes.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    if (prime1 === prime2) {
      continue;
    }

    // 公開鍵を生成する
    const publicKey = getPublicKey(prime1, prime2);
    if (publicKey === null) {
      throw new Error(
        `publicKey is null: prime1: ${prime1}, prime2: ${prime2}`
      );
    }

    // 秘密鍵を生成する
    const privateKey = getPrivateKey(prime1, prime2, publicKey);
    if (privateKey === null) {
      throw new Error(
        `privateKey is null: prime1: ${prime1}, prime2: ${prime2}`
      );
    }

    // データを暗号化する
    const encrypted = encrypt(publicKey, message);

    // 暗号化されたデータを復号する
    const decrypted = decrypt(privateKey, encrypted);

    it(`Encrypt-Decrypt: ${message} | prime1: ${prime1}, prime2: ${prime2}, message: ${message}`, () => {
      expect(decrypted).toBe(message);
    });
  }
});
