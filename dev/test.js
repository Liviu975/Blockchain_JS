const Blockchain = require("./blockchain");
//const blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(32893, 'O3392UI32', '03984IIEBUEG');

bitcoin.createNewTransaction(100, "LIO039484", 'ANA039IRJ');

bitcoin.createNewBlock(1412, '09IOEB038IEN', '038EDBCUEBE');
console.log(bitcoin)