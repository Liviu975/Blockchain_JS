const sha256  = require('sha256');
const currentNodeUrl = process.argv[3];

//Create blockchain data structure
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock(100, '0', '0');
}

//Creates a new block and adds it to the chain and clear the new Transations
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {

    const newBlock = {
        index: this.chain.length + 1,//the block number
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce, //proof-of-work
        hash: hash, //all data - transaction
        previousBlockHash: previousBlockHash //data from the previous hash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

//Get the last element from the block
Blockchain.prototype.getLastBlock = function(){
    const last = this.chain.length - 1
    return this.chain[last];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock()['index']+1;
}

//Hasing method
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {

    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);

    return hash;
}

//Proof-of-Work method
/*
    This method take the previousHash and the current Block and tries to generate a hash that starts with 0000 - e.g. 0000EE93I4JFU8D84J3
*/
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
}

//Exports
module.exports = Blockchain;