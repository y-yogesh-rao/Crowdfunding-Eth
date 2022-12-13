const Web3 = require('web3');
const fs = require('fs-extra');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const compiledCampaignFactory = require('../ethereum/build/CampaignFactory.json');

const goerliNetworkUrl = 'https://goerli.infura.io/v3/f2cd225a91fc4802a8e4567e67261a22';
const accountMnemonic = 'cancel december drive script slender spider public typical upon energy despair weather';
const provider = new HDWalletProvider(accountMnemonic,goerliNetworkUrl);
const web3 = new Web3(provider);

const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log('ATTEMPTING_TO_DEPLOY_WITH_ACCOUNT: ', accounts[0]);

    const deployedContract = await new web3.eth.Contract(compiledCampaignFactory.abi)
        .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
        .send({ gas: 2000000, from: accounts[0] });
    
    console.log('CONTRACT_DEPLOYED_TO_ADDRESS: ', deployedContract.options.address);
    provider.engine.stop();
}
deploy();