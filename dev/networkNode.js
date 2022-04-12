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
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({
        note: `Transaction will be added in block ${blockIndex}`
    })
})

app.post("/transaction/broadcast", (req, res) => {
    //create a new transaction
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;

    const newTransaction = bitcoin.createNewTransaction(amount, sender, recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    //broadcast the transaction to the network
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        //broadcast
        const requestOptions = {
            url: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));

    });

    Promise.all(requestPromises)
    .then(data => {
        res.json({
            note: 'Transaction created and broadcasted successfully.'
        });
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

    const newBlock = bitcoin.createNewBlock(nonce, lastBlockHash, blockHash);

    const requestPromises = [];

    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            url: networkNodeUrl + '/receive-new-block',
            method: "POST",
            body: { newBlock: newBlock},
            json: true
        };
        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
    .then(data => {
        const requestOptions ={
            url: bitcoin.currentNodeUrl + '/transaction/broadcast',
            method: "POST",
            body: {
                amount: 12.5,
                sender: "00",
                recepient: nodeAddress
            },
            json: true
        };
        return rp(requestOptions);
    })
    .then(data => {
        res.json({
            note: "Node block mined successfully",
            block: newBlock
        });
    }); 
})

app.post('/receive-new-block', (req, res) => {
    const newBlock = req.body.newBlock;

    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

    if(correctHash && correctIndex){
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({
            note: "New block received and accepted!",
            newBlock: newBlock
        });
    }else{
        res.json({
            note: "New block rejected",
            newBlock: newBlock
        })
    }

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
