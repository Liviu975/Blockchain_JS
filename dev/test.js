//Test hash function
const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

const previousBlockHash = 'QOIE9UR92OIRE8';
const currentBlockData = [
    {
        amount: 10,
        sender: '03923239IEOUFBCB',
        recepient: '29REO0F3KEDDIE3H',  
    },
    {
        amount: 20,
        sender: '09494HRJDUFBCB',
        recepient: '04OEEFDHUEI4E3H',  
    },
    {
        amount: 34,
        sender: '404948HBF3IEOUFBCB',
        recepient: 'R5H6HYO0F3KEDDIE3H',  
    }
];


