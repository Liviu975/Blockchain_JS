const Blockchain = require("./blockchain");
//const blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(32893, 'O3392UI32', '03984IIEBUEG');

bitcoin.createNewTransaction(100, "LIO039484", 'ANA039IRJ');

bitcoin.createNewBlock(1412, '09IOEB038IEN', '038EDBCUEBE');


bitcoin.createNewTransaction(85, 'AURAS303974', 'LIO03297h');
bitcoin.createNewTransaction(65, 'ANA993jdu7e', 'SABI08342');
bitcoin.createNewTransaction(65, 'LIO9jedju7e', 'SABI0eu82');

bitcoin.createNewBlock(8376, '08346829', '09474LIDUI');
console.table(bitcoin.chain[2].transactions);
console.log(bitcoin);