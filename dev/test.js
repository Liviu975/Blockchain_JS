const Blockchain = require("./blockchain");
const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1649798186237,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1649798238835,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1649798373397,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "transactionId": "ef4a0ae0baa511ecb90039b85008491b"
    },
    {
    "amount": 455,
    "sender": "AnaCorbeni303823",
    "recipient": "SabiPitesti3028445",
    "transactionId": "11593840baa611ecb90039b85008491b"
    },
    {
    "amount": 45,
    "sender": "LioCorbeni303823",
    "recipient": "SellyPitesti3028445",
    "transactionId": "32905520baa611ecb90039b85008491b"
    }
    ],
    "nonce": 71671,
    "hash": "0000083202f64d52dc6d8bfae20f16c433d285d67b2a6e4de5fd019964c923f9",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1649798689344,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "transactionId": "3f7b85c0baa611ecb90039b85008491b"
    },
    {
    "amount": 415,
    "sender": "LioCorbeni303823",
    "recipient": "SellyPitesti3028445",
    "transactionId": "f096b9b0baa611ecb90039b85008491b"
    },
    {
    "amount": 55,
    "sender": "LioCorbeni303823",
    "recipient": "SellyPitesti3028445",
    "transactionId": "f29d5f20baa611ecb90039b85008491b"
    },
    {
    "amount": 65,
    "sender": "LioCorbeni303823",
    "recipient": "SellyPitesti3028445",
    "transactionId": "f4779d60baa611ecb90039b85008491b"
    },
    {
    "amount": 195,
    "sender": "LioCorbeni303823",
    "recipient": "SellyPitesti3028445",
    "transactionId": "f76e9640baa611ecb90039b85008491b"
    }
    ],
    "nonce": 28068,
    "hash": "00005a127e15b801a947cfedd85a18326fdf32c6e0ea19665bdf2905bc8ba25b",
    "previousBlockHash": "0000083202f64d52dc6d8bfae20f16c433d285d67b2a6e4de5fd019964c923f9"
    },
    {
    "index": 5,
    "timestamp": 1649798707662,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "transactionId": "fbcc7220baa611ecb90039b85008491b"
    }
    ],
    "nonce": 49611,
    "hash": "0000668c16f56cd8c85af10b2ea3ec308711caafad3781f40d185c14dd3702de",
    "previousBlockHash": "00005a127e15b801a947cfedd85a18326fdf32c6e0ea19665bdf2905bc8ba25b"
    },
    {
    "index": 6,
    "timestamp": 1649798713128,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "transactionId": "06b78d00baa711ecb90039b85008491b"
    }
    ],
    "nonce": 144690,
    "hash": "00008c88b10d65f13d2f0a31b2deee6d8b41d9e1f1da200831379368a40ac915",
    "previousBlockHash": "0000668c16f56cd8c85af10b2ea3ec308711caafad3781f40d185c14dd3702de"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "transactionId": "09f998a0baa711ecb90039b85008491b"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

console.log('Valid: ' , bitcoin.chainIsValid(bc1.chain));