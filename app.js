var StellarSdk = require('stellar-sdk')

//
// create key pair
//
// create a completely new and unique pair of keys
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
var pair = StellarSdk.Keypair.random();

pair.secret(); // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
pair.publicKey(); // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB


//
// create account
//
var request = require('request');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

request.get({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: pair.publicKey() },
  json: true
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);
    console.log();
    server.loadAccount(pair.publicKey()).then(function(account) {
        console.log('Balances for account: ' + pair.publicKey());
        console.log('Balances for account: ' + pair.secret());
        account.balances.forEach(function(balance) {
          console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        });
      });
      
  }
});


//
// create server
//
//console.log("hi");


// server.accounts()
//   .accountId(pair.publicKey())
//   .call()
//   .then(function (accountResult) {
//     console.log(accountResult);
//   })
//   .catch(function (err) {
//     console.error(err);
//   })