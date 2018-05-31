// FIXME:  MOVE AS SERVER OP / SERVICE

import * as CryptoJS from 'crypto-js';

const encryptKeyPair = (_secretKey, _pubKey): string => {
    const ciphertext = CryptoJS.AES.encrypt(_secretKey, _pubKey);
    // const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), _pubKey);
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return ciphertext.toString();
};

const decryptKeyPair = (ciphertext, keyUnlocker): string => {
    const bytes  = CryptoJS.AES.decrypt(ciphertext, keyUnlocker);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
};

export { encryptKeyPair, decryptKeyPair };
