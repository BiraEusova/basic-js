const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }
  encrypt(text, key) {
    if (!text || !key || key === 'undefined' || text === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    text = text.toUpperCase();
    key = key.toUpperCase();

    let encryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (/[A-Z]/.test(char)) {
        let charCode = (char.charCodeAt(0) - 65 + key.charCodeAt(keyIndex % key.length) - 65) % 26 + 65;
        encryptedText += String.fromCharCode(charCode);
        keyIndex++;
      } else {
        encryptedText += char;
      }
    }

    return this.isDirect ? encryptedText : encryptedText.split('').reverse().join('');
  }
  decrypt(text, key) {
    if (!text || !key || key === 'undefined' || text === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    text = text.toUpperCase();
    key = key.toUpperCase();

    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (/[A-Z]/.test(char)) {
        let charCode = (char.charCodeAt(0) - 65 - (key.charCodeAt(keyIndex % key.length) - 65) + 26) % 26 + 65;
        decryptedText += String.fromCharCode(charCode);
        keyIndex++;
      } else {
        decryptedText += char;
      }
    }

    return this.isDirect ? decryptedText : decryptedText.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
