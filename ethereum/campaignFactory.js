const web3 = require('./web3');
const compiledCampaignFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(compiledCampaignFactory.abi, '0xf935542998D7c17B89835152ef5630B1be47575A');

module.exports = instance;