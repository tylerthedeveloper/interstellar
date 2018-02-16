// var Keypair = require("stellar-base").Keypair;

// var newAccount = Keypair.random();

// console.log("New key pair created!");
// console.log("  Account ID: " + newAccount.publicKey());
// console.log("  Seed: " + newAccount.secret());

// const request = require('request-promise');
// var StellarSdk = require('stellar-sdk');
// var pair = "GCVLMM6H4SRWUSXI6ZNV7WCYEQEOTXW6DPOPZDLWOAGJIV53UKOXBNJB";


const request = require('request-promise');
const StellarSdk = require('stellar-sdk');
const pair = StellarSdk.Keypair.random();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
console.log(pair.secret(), pair.publicKey());

request({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: pair.publicKey() },
    json: true
})
.then(function() {
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    server.loadAccount(pair.publicKey()).then(function(account) {
        console.log('Balances for account: ' + pair.publicKey());
        account.balances.forEach(function(balance) {
          console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        });
    }); 
});


//the JS SDK uses promises for most actions, such as retrieving an account
//let myKey = "GCVLMM6H4SRWUSXI6ZNV7WCYEQEOTXW6DPOPZDLWOAGJIV53UKOXBNJB";
// server.loadAccount(myKey).then(function(account) {
//   console.log('Balances for account: ' + myKey);
//   account.balances.forEach(function(balance) {
//     console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
//   });
/// }) // ;
