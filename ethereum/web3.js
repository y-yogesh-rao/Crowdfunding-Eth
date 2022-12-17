const Web3 = require('web3');

const web3 = typeof window !== 'undefined' && typeof window.web3 !== 'undefined' 
    ? new Web3(window.ethereum)
    : new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/f2cd225a91fc4802a8e4567e67261a22'))

module.exports = web3;