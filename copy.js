const fs = require('fs');


fs.copyFileSync('./lib/index.js', '/Users/webjs/Documents/lambdaSite/wallet/node_modules/@jswebfans/rpcapijs/lib/index.js');

console.log('复制完毕')