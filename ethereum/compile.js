const path = require('path');
const solCompiler = require('solc');
const fs = require('fs-extra');

// Delete any previously existing builds
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const sourceCode = fs.readFileSync(campaignPath, 'utf-8');

let input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: sourceCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

let compiledData = JSON.parse(solCompiler.compile(JSON.stringify(input)));
let contracts = compiledData.contracts['Campaign.sol'];

// Function checks for the provided path and creates one if it doesnt exist
fs.ensureDirSync(buildPath);

for(let contract in contracts) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract}.json`),
        contracts[contract]
    );
}
