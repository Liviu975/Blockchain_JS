const Blockchain = require("./blockchain");
//const blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(32893, 'O3392UI32', '03984IIEBUEG');

bitcoin.createNewBlock(32342, 'dino2UI32', '23984IIEBUEG');
bitcoin.createNewBlock(23425, 'OEIWE2UI32', '33984IIEBUEG');
bitcoin.createNewBlock(24234, 'Oewofu2UI32', 'oieheu84IIEBUEG');


console.log(bitcoin);