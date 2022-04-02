const express = require('express');
const bodyParser = require('body-parser');
const uuid = require("uuid").v1;

const app = express();
const Blockchain = require("./blockchain");
const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 9000;

//return entire blockchain
app.get('/blockchain', (req, res) => {
    res.send(bitcoin);
});

//create a new transaction
app.post('/transaction', (req, res) => {
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;

    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);

    res.json({
        note: `Transaction will be added in block ${blockIndex}`
    });
})

//create a new block
app.get('/mine', (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const lastBlockHash = lastBlock.hash;

    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock.index + 1
    }

    const nonce = bitcoin.proofOfWork(lastBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(lastBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, lastBlockHash, blockHash);
    res.json({
        note: "Node block mined successfully",
        block: newBlock
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});