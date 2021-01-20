const BigNumber = require('bignumber.js');

console.log(0.3 - 0.2);
console.log((new BigNumber(0.3)).minus(0.2).toNumber());
