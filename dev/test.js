const Blockchain = require("./blockchain");
//const blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(32893, 'O3392UI32', '03984IIEBUEG');
// bitcoin.createNewBlock(32342, 'dino2UI32', '23984IIEBUEG');
// bitcoin.createNewBlock(23425, 'OEIWE2UI3', '33984IIEBUEG');
// bitcoin.createNewBlock(24234, 'Oewofu2UI', 'heu84IIEBUEG');

bitcoin.createNewTransaction(100, "LIO039484", 'ANA039IRJ')
console.log(bitcoin)