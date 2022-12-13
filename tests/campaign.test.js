const assert = require('assert');
const ganache = require('ganache');

const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaign = require('../ethereum/build/Campaign.json');
const compiledCampaignFactory = require('../ethereum/build/CampaignFactory.json');

let accounts;
let campaign;
let campaignfactory;
let campaignAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaignfactory = await new web3.eth.Contract(compiledCampaignFactory.abi)
        .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: 2000000 });
    
    await campaignfactory.methods.createCampaign('100').send({ from: accounts[0], gas: 2000000 });

    [campaignAddress] = await campaignfactory.methods.getCampaigns().call();

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
    it('deployes a campaign and the campaign factory', () => {
        assert.ok(campaign.options.address);
        assert.ok(campaignfactory.options.address);
    });

    it('the contract has been deployed by the manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it('once contributed, contributor has been set properly', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        const isContributor = await campaign.methods.contributors(accounts[1]).call();
        assert(isContributor);
    });

    it('for contribution, a minimum amount of wei must be paid', async () => {
        try {
            await campaign.methods.contribute().send({ from: accounts[1], value: '50' });
            assert(false);
        } catch(error) {
            assert(error);
        }
    });

    it('allows manager to create a request', async () => {
        await campaign.methods.createRequest('Buying car parts', '600', accounts[2]).send({ from: accounts[0], gas: 2000000 });

        const request = await campaign.methods.requests(0).call();
        assert.equal('Buying car parts', request.description);
    });

    it('process connot be complete since 50% percent of the contributors dont agree', async () => {
        await campaign.methods.contribute().send({ from: accounts[7], value: '500'});
        await campaign.methods.contribute().send({ from: accounts[8], value: '500'});
        await campaign.methods.contribute().send({ from: accounts[9], value: '500'});

        await campaign.methods.createRequest('Buying new bike', '1200', accounts[5]).send({ from: accounts[0], gas: 2000000 });

        await campaign.methods.approveRequest(0).send({ from: accounts[8], gas: 2000000 });
        try {
            await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: 20000000 });
            assert(false);
        } catch(error) {
            assert(error);
        }
    });

    it('complete campaign process', async () => {
        await campaign.methods.contribute().send({ from: accounts[7], value: '500'});
        await campaign.methods.contribute().send({ from: accounts[8], value: '500'});
        await campaign.methods.contribute().send({ from: accounts[9], value: '500'});

        await campaign.methods.createRequest('Buying new bike', '1200', accounts[5]).send({ from: accounts[0], gas: 2000000 });

        await campaign.methods.approveRequest(0).send({ from: accounts[7], gas: 2000000 });
        await campaign.methods.approveRequest(0).send({ from: accounts[8], gas: 2000000 });

        await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: 20000000 });

        const request = await campaign.methods.requests(0).call();

        let balance = await web3.eth.getBalance(accounts[5]);

        assert(request.isComplete);
        assert(balance > 100000000000000001000);
    });
});