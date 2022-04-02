const express = require('express');
const bodyParser = require('body-parser');
const uuid = require("uuid").v1;
const rp = require("request-promise");

const app = express();
const Blockchain = require("./blockchain");
const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();
const PORT = process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



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

//Register a node and broadcast it the network
app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;

    //check if the node already exits
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl);
    }

    const regNodesPromises = [];

    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            url: networkNodeUrl + '/register-node',
            method: "POST",
            body: {newNodeUrl: newNodeUrl},
            json: true
        };

        regNodesPromises.push(rp(requestOptions));

    });

    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: "POST",
            body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        };

        return rp(bulkRegisterOptions);
    })
    .then(date => {
        res.json({ note: "New node registered with network successfully"});
    })
})

//Register a node with the network
app.post('/register-node', (req,res) => {
    const newNodeUrl = req.body.newNodeUrl;
    const notAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

    if(notAlreadyPresent && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    
    res.json({
        note: "New node registered successfully with node."
    })
})

//Register multiple nodes at once
app.post("/register-nodes-bulk", (req, res) => {
    const allNetworkNodes = req.body.allNetworkNodes;
    
    allNetworkNodes.forEach(networkNodeUrl => {
        const notAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;

        if(notAlreadyPresent && notCurrentNode){
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    });

    res.json({
        note: "Bulk registration successful!"
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});