const sha256  = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require("uuid").v1;

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
        recipient: recipient,
        transactionId: uuid().split('-').join('')
    };

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
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

Blockchain.prototype.chainIsValid = function(blockchain){
    let i = 0;
    for (i = 1; i< blockchain.length; i++){
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i-1];
        let blockHash;

        if(!currentBlock.nonce){
            return false;
        }
            
        blockHash = this.hashBlock(prevBlock.hash, { transactions: currentBlock.transactions, index: currentBlock.index }, currentBlock['nonce']);
           
        if(blockHash.substring(0,4) !== "0000"){
            return false;
        }

        //return false if the hashes are not the same
        if(currentBlock.previousBlockHash !== prevBlock.hash){
            return false;
        }
    }

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock.nonce === 100;
    const correctPreviousBlockHash = genesisBlock.previousBlockHash === '0';
    const correctHash = genesisBlock.hash === '0';
    const correctTransactions = genesisBlock.transactions.length === 0;

    if(correctNonce && correctPreviousBlockHash && correctHash && correctTransactions){
        return true;
    }

    return false;

}

//Exports
module.exports = Blockchain;