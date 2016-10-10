var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');
var assert = require('assert');

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// 1 - initialize
var Web3 = require('web3');
var web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  if (config.environment == "live")
    web3 = new Web3(new Web3.providers.HttpProvider(config.rpc.live));
  else (config.environment == "dev")
    web3 = new Web3(new Web3.providers.HttpProvider(config.rpc.test));
}


// 2 - get accounts 
var user1;
var user2;
var arbiter;

web3.eth.getAccounts(function(err, accounts) {
     assert.equal(accounts.length>=3, true);

     user1 = accounts[0];
     user2 = accounts[1];
     arbiter = accounts[2];

     console.log('> User1: ' + user1);
     console.log('> User2: ' + user2);
     console.log('> Arbiter: ' + arbiter);
     console.log('');

     // 2 - compile and deploy smart contract
     var file = './contracts/MultiSig.sol';
     var contractName = 'MultiSignature';

     console.log('Reading MultiSig contract file');
     fs.readFile(file, function(err, result){
          assert.equal(err,null);

          console.log('Compiling MultiSig contract');

          var source = result.toString();
          assert.notEqual(source.length,0);

          var output = solc.compile(source, 1); // 1 activates the optimiser

          //console.log('OUTPUT: ');
          //console.log(output);

          var abi = JSON.parse(output.contracts[contractName].interface);
          var bytecode = output.contracts[contractName].bytecode;
          var tempContract = web3.eth.contract(abi);

          var users = [user1,user2,arbiter];
          var rescuers = [];
          var ethDepositMin = 1;
          var tokenDepositMin = 100;
          var tokenAddress = 0;         // TODO

          // date/time 
          var dt = new Date();
          dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000));
          var unlockAt = dt.getTime()/1000;

          var contractTerms = 'Sample text';
          var calledOnce = false;

          tempContract.new(
               users,
               rescuers,

               ethDepositMin,
               tokenDepositMin,
               tokenAddress,
               unlockAt,
               contractTerms,

               {
                    from: user1, 
                    gas: 3000000, 
                    data: bytecode
               }, 
               // callback is fired twice: usually, first with the transaction hash 
               // and the second with the deployed contract's address.
               function(err, c){
                    assert.equal(err, null);

                    if(calledOnce){
                         return;
                    }
                    calledOnce = true;

                    //console.log('Call...');
                    //console.log(c);
               
                    web3.eth.getTransactionReceipt(c.transactionHash, function(err, result){
                         assert.equal(err, null);

                         console.log('Contract address: ');
                         console.log(result.contractAddress);

                         var contract = web3.eth.contract(abi).at(result.contractAddress);

                         //console.log('Contract: ');
                         //console.log(contract);

                         // TODO:
                         console.log('Calling someTestMethod');
                         var out = contract.someTestMethod();
                         console.log(out);
                    });
               });
     });
});

