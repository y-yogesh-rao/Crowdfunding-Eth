const web3 = require('./web3');
const compiledCampaignFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(compiledCampaignFactory.abi, '0xEb1a10985dA161cbB371E723009d62B3B46a8D0b');

module.exports = instance;