//Create blockchain data structure
function Blockchain(){
    this.chain = [];
    this.newTransactions = [];
}


//Creates a new block and adds it to the chain and clear the new Transations
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {

    const newBlock = {
        index: this.chain.length + 1,//the block number
        timestamp: Date.now(),
        transactions: this.newTransactions,
        nonce: nonce, //proof-of-work
        hash: hash, //all data - transaction
        previousBlockHash: previousBlockHash //data from the previous hash
    };

    this.newTransactions = [];
    this.chain.push(newBlock);

    return newBlock;

}

module.exports = Blockchain;