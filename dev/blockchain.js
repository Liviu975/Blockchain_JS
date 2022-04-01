//Create blockchain data structure
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
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

//Exports
module.exports = Blockchain;