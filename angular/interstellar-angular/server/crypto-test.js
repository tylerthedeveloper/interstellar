var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

// Encrypt
var pubKey = 'my-pub-key';
var secretKey = 'my-secret-key';
var ciphertext = CryptoJS.SHA256.encrypt(secretKey, pubKey);
 
// Decrypt
var bytes  = CryptoJS.SHA256.decrypt(ciphertext.toString(), pubKey);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
// console.log(pubKey);
// console.log(secretKey);
console.log(ciphertext.toString());
console.log();
console.log(bytes);
console.log();
console.log(plaintext);
